// useCleverCows.js holds everything the app remembers, and the actions that change it.
// App.jsx calls it once and passes the pieces each screen needs.
// Most values are saved in localStorage (see usePersistentState), so a refresh
// keeps the demo where it was. "Reset demo" in Profile clears it all.
import { useState } from 'react'
import { usePersistentState } from './usePersistentState'
import { clearAll } from './storage'
import { causes } from '../data/causes'
import { startingFriendIds } from '../data/friends'
import { sampleEvents, startingFavourites } from '../data/events'
import { sessionHours, visitMoolah } from '../data/economy'
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

    // Events shown on cause pages: sample ones, ones the organisation adds,
    // and ones the student proposes (pending until the organisation approves).
    const [events, setEvents] = usePersistentState('events', sampleEvents)

    // Causes and events the student has saved, e.g. { kind: 'event', id: 'event_sample_1' }.
    const [favourites, setFavourites] = usePersistentState('favourites', startingFavourites)

    // Invites the student has sent to friends: { id, causeId, friendIds, at }.
    const [sentInvites, setSentInvites] = usePersistentState('sentInvites', [])

    // Updates the organisation has posted: { id, causeId, text, at }.
    const [orgUpdates, setOrgUpdates] = usePersistentState('orgUpdates', [])

    // Attendance the organisation has confirmed for sample students, by sign-up id.
    const [sampleAttendance, setSampleAttendance] = usePersistentState('sampleAttendance', {})

    // Every session the student went to: { id, causeId, hours, moolah, source, at }.
    // source is 'self' ("I went to this session") or 'org' (marked by the organisation).
    const [attendance, setAttendance] = usePersistentState('attendance', [])
    const hoursWorked = attendance.reduce((total, visit) => total + visit.hours, 0)

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

    // ---- Sessions, events and the organisation ----

    // Records one session the student went to. Hours come from the session's length,
    // and Moolah grows with each return visit to the same cause (see economy.js).
    function recordVisit(causeId, source) {
        const cause = causes.find((c) => c.id === causeId)
        const session = cause.actions.find((action) => action.type === "signup")
        const earlier = attendance.filter((visit) => visit.causeId === causeId).length
        const amount = visitMoolah(earlier)
        const visit = {
            id: `visit_${Date.now()}`, causeId, hours: sessionHours(session), moolah: amount,
            source, at: new Date().toISOString(),
        }
        setAttendance((prev) => [...prev, visit])
        earnMoolah(amount, `Session at ${cause.name}`)
        return visit
    }

    // Adds one confirmed visit for a sample student in the Organisation view.
    function markSampleAttended(signupId) {
        setSampleAttendance((prev) => ({ ...prev, [signupId]: (prev[signupId] || 0) + 1 }))
    }

    // A student's own event proposal. It waits as "pending" for the organisation.
    function hostEvent(details) {
        setEvents((prev) => [...prev, {
            id: `event_${Date.now()}`, ...details, source: 'student', status: 'pending',
            host: profile.name, sample: false,
        }])
    }

    // An event added by the organisation, shown straight away on the cause page.
    function addOrgEvent(details) {
        setEvents((prev) => [...prev, {
            id: `event_${Date.now()}`, ...details, source: 'org', status: 'approved', sample: false,
        }])
    }

    function approveEvent(eventId) {
        setEvents((prev) => prev.map((event) =>
            event.id === eventId ? { ...event, status: 'approved' } : event
        ))
    }

    function postUpdate(causeId, text) {
        setOrgUpdates((prev) => [...prev, { id: `update_${Date.now()}`, causeId, text, at: new Date().toISOString() }])
    }

    // ---- Favourites and invites ----

    function isFavourite(kind, id) {
        return favourites.some((item) => item.kind === kind && item.id === id)
    }

    function toggleFavourite(kind, id) {
        setFavourites((prev) => (
            prev.some((item) => item.kind === kind && item.id === id)
                ? prev.filter((item) => !(item.kind === kind && item.id === id))
                : [...prev, { kind, id }]
        ))
    }

    // Invites friends to a cause. Nothing is really sent; it's kept for the Social tab.
    function inviteFriends(causeId, invitedIds) {
        setSentInvites((prev) => [...prev, { id: `invite_${Date.now()}`, causeId, friendIds: invitedIds, at: new Date().toISOString() }])
    }

    // ---- Friends, calendar ----

    function addFriend(id) {
        setFriendIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    }

    function removeFriend(id) {
        setFriendIds(friendIds.filter((friendId) => friendId !== id))
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
        quizResult, screen, openCauseId, openedBySurprise, profile, signedUp,
        events, favourites, sentInvites, orgUpdates, sampleAttendance, attendance, hoursWorked,
        friendIds, history, diary, calendarConnected, fitsMyWeek, settings, view,
        grass, recentFeeds, justFinishedGoal, finishedGoalIds, moolah, moolahLedger,
        // actions
        navigate, setView, setProfile, setSettings, setCalendarConnected, setFitsMyWeek,
        changeGoal, chooseNextGoal, recordAction, finishWelcome, finishAboutYou, finishStory,
        retakeStory, openCause, surpriseMe, confirmSignup, answerCalendarPrompt,
        startReflection, saveReflection, addFriend, removeFriend,
        recordVisit, markSampleAttended, hostEvent, addOrgEvent, approveEvent, postUpdate,
        isFavourite, toggleFavourite, inviteFriends,
        disconnectCalendar, resetDemo, earnMoolah, spendMoolah,
        clearRecentFeeds: () => setRecentFeeds([]),
    }
}
