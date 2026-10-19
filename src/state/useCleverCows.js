// useCleverCows.js holds everything the app remembers, and the actions that change it.
// App.jsx calls it once and passes the pieces each screen needs.
// Most values are saved in localStorage (see usePersistentState), so a refresh
// keeps the demo where it was. "Reset demo" in Profile clears it all.
import { useState } from 'react'
import { usePersistentState } from './usePersistentState'
import { clearAll } from './storage'
import { causes } from '../data/causes'
import { startingFriendIds } from '../data/friends'
import { GRASS } from '../assets/cowStages'
import { goalById, goalProgress } from '../goalProgress'

const EMPTY_PROFILE = { name: '', about: '', goal: '', area: '', ageGroup: '', region: '', goalHistory: [] }

export function useCleverCows() {
    // The student's top trait from the story, e.g. "Heart", or null before the story.
    const [quizResult, setQuizResult] = usePersistentState('quizResult', null)

    // Which screen is showing. A returning student goes straight to Home.
    const [screen, setScreen] = useState(() => (quizResult ? 'home' : 'welcome'))

    // The cause whose page is open, e.g. "cause_02", and whether it came from Surprise me.
    const [openCauseId, setOpenCauseId] = useState(null)
    const [openedBySurprise, setOpenedBySurprise] = useState(false)

    // Name, About me text, About you answers and finished goals.
    const [profile, setProfile] = usePersistentState('profile', EMPTY_PROFILE)

    // Every session the student has signed up for, one entry per cause (see people.js).
    const [signedUp, setSignedUp] = usePersistentState('signedUp', [])

    // Event proposals the student has sent from Host your own event.
    const [proposals, setProposals] = usePersistentState('proposals', [])

    // The ids of the student's friends (sample students from friends.js).
    const [friendIds, setFriendIds] = usePersistentState('friendIds', startingFriendIds)

    // Every action the student takes, in order, e.g. { type: 'signup', causeId, at }.
    // Goal progress and titles are worked out from this list.
    const [history, setHistory] = usePersistentState('history', [])

    // The student's diary entries, oldest first.
    const [diary, setDiary] = usePersistentState('diary', [])

    // The sample timetable for "Fits my week".
    const [calendarConnected, setCalendarConnected] = usePersistentState('calendarConnected', false)
    const [fitsMyWeek, setFitsMyWeek] = usePersistentState('fitsMyWeek', false)

    // Privacy choices. All off unless the student turns them on.
    const [settings, setSettings] = usePersistentState('settings', {
        showTitles: false, publicDiary: false, showOnLeaderboard: false,
    })

    // 'student' or 'organisation'.
    const [view, setView] = usePersistentState('view', 'student')

    // Actions that have given the cow grass, e.g. "cause_02:signup". Each counts once.
    const [fedActions, setFedActions] = usePersistentState('fedActions', [])
    const grass = fedActions.reduce((total, id) => total + (GRASS[id.split(':')[1]] || 0), 0)

    // Moolah: every amount earned (positive) or spent (negative), with a reason.
    // The balance is worked out from this list. Moolah can only be earned by helping.
    const [moolahLedger, setMoolahLedger] = usePersistentState('moolah', [])
    const moolah = moolahLedger.reduce((total, entry) => total + entry.amount, 0)

    // Grass gained since the cow last reacted on Home: { type, causeName, amount }.
    const [recentFeeds, setRecentFeeds] = useState([])

    // A goal just finished, thanked on the next visit to Home, or null.
    const [justFinishedGoal, setJustFinishedGoal] = useState(null)
    const finishedGoalIds = profile.goalHistory.map((finished) => finished.goalId)

    function navigate(nextScreen) {
        setScreen(nextScreen)
        window.scrollTo(0, 0)
    }

    // ---- Goals ----

    function changeGoal(goalId) {
        setProfile({ ...profile, goal: goalId })
        finishGoalIfComplete(goalId, history)
    }

    // If the goal is met by the history (and wasn't finished before), record it,
    // which earns its title, feeds the cow and queues the thank-you screen.
    function finishGoalIfComplete(goalId, historyToCheck) {
        const goal = goalById(goalId)
        if (!goal || finishedGoalIds.includes(goalId) || !goalProgress(goal, historyToCheck).complete) {
            return
        }
        setProfile((prev) => ({
            ...prev,
            goalHistory: [...prev.goalHistory, { goalId, finishedAt: new Date().toISOString() }],
        }))
        giveGrass(`${goalId}:goal`, 'goal', goal.name)
        setJustFinishedGoal(goalId)
    }

    function chooseNextGoal(goalId) {
        setJustFinishedGoal(null)
        changeGoal(goalId)
    }

    // ---- Moolah ----

    // prev => [...] uses the latest list, even if two updates happen together.
    function earnMoolah(amount, reason) {
        if (amount > 0) {
            setMoolahLedger((prev) => [...prev, { amount, reason, at: new Date().toISOString() }])
        }
    }

    // Returns false (and spends nothing) if the student doesn't have enough.
    function spendMoolah(amount, reason) {
        if (amount > moolah) {
            return false
        }
        setMoolahLedger((prev) => [...prev, { amount: -amount, reason, at: new Date().toISOString() }])
        return true
    }

    // ---- Actions and grass ----

    // Adds grass for an action, once per id. Actions without a grass amount give none.
    function giveGrass(id, type, name) {
        if (!GRASS[type]) {
            return
        }
        setFedActions((prev) => (prev.includes(id) ? prev : [...prev, id]))
        if (!fedActions.includes(id)) {
            setRecentFeeds((prev) => [...prev, { type, causeName: name, amount: GRASS[type] }])
        }
    }

    // Records an action in the history, checks the active goal, and feeds the cow.
    // { details } adds extra facts, e.g. { weekly: true, mode: 'relay' } for a sign-up.
    function recordAction(causeId, type, details = {}) {
        const item = { type, causeId, at: new Date().toISOString(), ...details }
        setHistory((prev) => [...prev, item])
        finishGoalIfComplete(profile.goal, [...history, item])
        const cause = causes.find((c) => c.id === causeId)
        giveGrass(`${causeId}:${type}`, type, cause ? cause.name : '')
    }

    // ---- Flow ----

    function finishWelcome(name) {
        setProfile({ ...profile, name })
        navigate('about')
    }

    function finishAboutYou(answers) {
        setProfile(answers)
        finishGoalIfComplete(answers.goal, history)
        navigate('cover')
    }

    function finishStory(topTrait) {
        setQuizResult(topTrait)
        navigate('home')
    }

    function retakeStory() {
        navigate('cover')
    }

    function openCause(causeId, fromSurprise = false) {
        setOpenCauseId(causeId)
        setOpenedBySurprise(fromSurprise)
        navigate('cause')
    }

    // Opens a random cause that isn't one of the student's usual matches.
    function surpriseMe() {
        const others = causes.filter((c) => !c.identity.includes(quizResult) && c.id !== openCauseId)
        const pick = others[Math.floor(Math.random() * others.length)]
        openCause(pick.id, true)
    }

    // ---- Sign-ups and diary ----

    function confirmSignup(entry) {
        const others = signedUp.filter((item) => item.causeId !== entry.causeId)
        setSignedUp([...others, entry])
        recordAction(entry.causeId, 'signup', { weekly: entry.weekly, mode: entry.mode })
        navigate('signup-done')
    }

    function answerCalendarPrompt(causeId) {
        setSignedUp(signedUp.map((item) =>
            item.causeId === causeId ? { ...item, calendarAnswered: true } : item
        ))
    }

    function startReflection(causeId) {
        setOpenCauseId(causeId)
        navigate('reflection')
    }

    function saveReflection(reflection) {
        const entry = { id: `diary_${Date.now()}`, causeId: openCauseId, at: new Date().toISOString(), ...reflection }
        setDiary([...diary, entry])
        recordAction(openCauseId, 'reflection')
        navigate('profile')
    }

    // ---- Friends, proposals, calendar ----

    function addFriend(id) {
        setFriendIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }

    function removeFriend(id) {
        setFriendIds(friendIds.filter((friendId) => friendId !== id))
    }

    function sendProposal(proposal) {
        setProposals([...proposals, { id: `proposal_${Date.now()}`, sentAt: new Date().toISOString(), ...proposal }])
    }

    function disconnectCalendar() {
        setCalendarConnected(false)
        setFitsMyWeek(false)
    }

    // Clears everything saved and starts the demo again from the Welcome screen.
    function resetDemo() {
        clearAll()
        window.location.reload()
    }

    return {
        // values
        quizResult, screen, openCauseId, openedBySurprise, profile, signedUp, proposals,
        friendIds, history, diary, calendarConnected, fitsMyWeek, settings, view,
        grass, recentFeeds, justFinishedGoal, finishedGoalIds, moolah, moolahLedger,
        // actions
        navigate, setView, setProfile, setSettings, setCalendarConnected, setFitsMyWeek,
        changeGoal, chooseNextGoal, recordAction, finishWelcome, finishAboutYou, finishStory,
        retakeStory, openCause, surpriseMe, confirmSignup, answerCalendarPrompt,
        startReflection, saveReflection, addFriend, removeFriend, sendProposal,
        disconnectCalendar, resetDemo, earnMoolah, spendMoolah,
        clearRecentFeeds: () => setRecentFeeds([]),
    }
}
