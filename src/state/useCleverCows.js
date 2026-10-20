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
import { sampleChatReplies } from '../data/sampleSocial'
import { REFLECTION_MOOLAH, sessionHours, visitMoolah } from '../data/economy'
import { GRASS } from '../assets/cowStages'
import { goalById, goalProgress } from '../goalProgress'
import { BASIC_GRASS_BOOST, STARTING_STATS, STAT_MAX } from '../data/store'

const EMPTY_PROFILE = { name: '', about: '', goal: '', area: '', ageGroup: '', region: '', goalHistory: [] }

export function useCleverCows() {
    // The student's top trait from the story, e.g. "Heart", or null before the story.
    const [quizResult, setQuizResult] = usePersistentState('quizResult', null)

    // Which screen is showing. A returning student goes straight to Home.
    const [screen, setScreen] = useState(() => (quizResult ? 'home' : 'welcome'))

    // The organisation whose page is open, e.g. "org_paws".
    const [openOrgId, setOpenOrgId] = useState(null)
    const [orgReturnTo, setOrgReturnTo] = useState('organisations')
    const [causeReturnTo, setCauseReturnTo] = useState('home')

    // Organisations the student follows, to hear how they're doing.
    const [followedOrgIds, setFollowedOrgIds] = usePersistentState('followedOrgIds', [])

    // The cause whose page is open, e.g. "cause_02", and whether it came from Surprise me.
    const [openCauseId, setOpenCauseId] = useState(null)
    const [openedBySurprise, setOpenedBySurprise] = useState(false)

    // Name, About me text, About you answers and finished goals.
    const [profile, setProfile] = usePersistentState('profile', EMPTY_PROFILE)

    // Every session the student has signed up for, one entry per cause (see people.js).
    // A one-off sign-up is marked done once the student has been (weekly ones carry on).
    // signedUp holds only the ones still coming up; allSignups keeps the finished ones too.
    const [allSignups, setSignedUp] = usePersistentState('signedUp', [])
    const signedUp = allSignups.filter((entry) => !entry.done)

    // Events shown on cause pages: sample ones, ones the organisation adds,
    // and ones the student proposes (pending until the organisation approves).
    const [storedEvents, setEvents] = usePersistentState('events', sampleEvents)
    const events = [
        ...sampleEvents.filter((sample) => !storedEvents.some((event) => event.id === sample.id)),
        ...storedEvents,
    ]

    // Causes and events the student has saved, e.g. { kind: 'event', id: 'event_sample_1' }.
    const [favourites, setFavourites] = usePersistentState('favourites', startingFavourites)

    // Invites the student has sent to friends: { id, causeId, friendIds, at }.
    const [sentInvites, setSentInvites] = usePersistentState('sentInvites', [])

    // Updates the organisation has posted: { id, causeId, text, at }.
    const [orgUpdates, setOrgUpdates] = usePersistentState('orgUpdates', [])

    // Thank-you notes the organisation sent after a visit: { id, causeId, personId, at }.
    // personId is a sample sign-up id, or 'student' for the demo student.
    const [thanks, setThanks] = usePersistentState('thanks', [])

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

    // The student's diary entries, oldest first:
    // { id, causeId, message, photoUrl, stickers, isPublic, at }.
    const [diary, setDiary] = usePersistentState('diary', [])

    // Diary entry ids the student added to their portfolio.
    const [portfolio, setPortfolio] = usePersistentState('portfolio', [])

    // The session just recorded by "I went to this session", shown on the diary page.
    const [lastVisit, setLastVisit] = useState(null)

    // The sample timetable that unlocks "Fits my week" on Home.
    const [calendarConnected, setCalendarConnected] = usePersistentState('calendarConnected', false)

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

    // Clover Cowdini's care: her stats (which only ever go up), the items she owns,
    // the accessories she's wearing, and how much free basic grass has been fed.
    const [cow, setCow] = usePersistentState('cow', {
        stats: STARTING_STATS, owned: [], equipped: [], grassFed: 0,
    })
    const basicGrassLeft = Math.max(0, grass - cow.grassFed)

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
    // which earns its title, its Moolah and any accessory, feeds the cow,
    // and queues the thank-you screen.
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
        earnMoolah(goal.reward.moolah, `Goal: ${goal.name}`)
        if (goal.reward.accessory) {
            giftItem(goal.reward.accessory)
        }
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

    // ---- Caring for Clover Cowdini ----

    // Raises one stat, never above the maximum. Stats never go down.
    function raiseStat(stats, stat, amount) {
        return { ...stats, [stat]: Math.min(STAT_MAX, stats[stat] + amount) }
    }

    // Feeds one handful of the free basic grass earned by helping.
    function feedBasicGrass() {
        if (basicGrassLeft <= 0 || cow.stats.hunger >= STAT_MAX) {
            return
        }
        setCow((prev) => ({
            ...prev, grassFed: prev.grassFed + 1, stats: raiseStat(prev.stats, 'hunger', BASIC_GRASS_BOOST),
        }))
    }

    // Buys a store item with Moolah. Grass and care items are used straight away;
    // furniture, fun things and accessories stay in her room (accessories are put on).
    // Returns false if there isn't enough Moolah.
    // Grass and care items can't be used once that stat is already full.
    function buyItem(item) {
        if (!item.consumable && cow.owned.includes(item.id)) {
            return false
        }
        if (item.consumable && cow.stats[item.stat] >= STAT_MAX) {
            return false
        }
        if (!spendMoolah(item.price, `Bought ${item.name}`)) {
            return false
        }
        setCow((prev) => ({
            ...prev,
            stats: raiseStat(prev.stats, item.stat, item.boost),
            owned: item.consumable ? prev.owned : [...prev.owned, item.id],
            equipped: item.category === 'accessory' ? [...prev.equipped, item.id] : prev.equipped,
        }))
        return true
    }

    // Gives an item for free, e.g. an accessory earned by finishing a goal.
    function giftItem(itemId) {
        setCow((prev) => (prev.owned.includes(itemId) ? prev : { ...prev, owned: [...prev.owned, itemId] }))
    }

    function toggleAccessory(itemId) {
        setCow((prev) => ({
            ...prev,
            equipped: prev.equipped.includes(itemId)
                ? prev.equipped.filter((id) => id !== itemId)
                : [...prev.equipped, itemId],
        }))
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

    function openOrganisation(orgId) {
        if (screen !== 'organisation') {
            setOrgReturnTo(screen)
        }
        setOpenOrgId(orgId)
        navigate('organisation')
    }

    function toggleFollow(orgId) {
        setFollowedOrgIds((prev) => (prev.includes(orgId) ? prev.filter((id) => id !== orgId) : [...prev, orgId]))
    }

    // Back on a cause page returns to where it was opened from (sign-up screens excepted).
    function openCause(causeId, fromSurprise = false) {
        if (!['cause', 'signup', 'signup-done'].includes(screen)) {
            setCauseReturnTo(screen)
        }
        setOpenCauseId(causeId)
        setOpenedBySurprise(fromSurprise)
        navigate('cause')
    }

    // Goes straight to the sign-up screen for a cause, e.g. from a saved event.
    function signUpFor(causeId) {
        setOpenCauseId(causeId)
        setOpenedBySurprise(false)
        navigate('signup')
    }

    // Opens a random cause that isn't one of the student's usual matches.
    function surpriseMe() {
        const others = causes.filter((c) => !c.identity.includes(quizResult) && c.id !== openCauseId)
        const pick = others[Math.floor(Math.random() * others.length)]
        openCause(pick.id, true)
    }

    // ---- Sign-ups and diary ----

    function confirmSignup(entry) {
        setSignedUp((prev) => [...prev.filter((item) => item.causeId !== entry.causeId), entry])
        recordAction(entry.causeId, 'signup', { weekly: entry.weekly, mode: entry.mode })
        navigate('signup-done')
    }

    function answerCalendarPrompt(causeId) {
        setSignedUp((prev) => prev.map((item) =>
            item.causeId === causeId ? { ...item, calendarAnswered: true } : item
        ))
    }

    // "I went to this session": records the visit (hours and Moolah), then opens the diary page.
    function wentToSession(causeId) {
        setLastVisit(recordVisit(causeId, 'self'))
        setOpenCauseId(causeId)
        navigate('reflection')
    }

    // "Write a diary entry" from the Diary tab, without recording another visit.
    function startReflection(causeId) {
        setLastVisit(null)
        setOpenCauseId(causeId)
        navigate('reflection')
    }

    function saveReflection(reflection) {
        const entry = { id: `diary_${Date.now()}`, causeId: openCauseId, at: new Date().toISOString(), ...reflection }
        setDiary([...diary, entry])
        earnMoolah(REFLECTION_MOOLAH, 'Diary entry')
        recordAction(openCauseId, 'reflection')
        navigate('diary')
    }

    function setEntryPublic(entryId, isPublic) {
        setDiary(diary.map((entry) => (entry.id === entryId ? { ...entry, isPublic } : entry)))
    }

    function togglePortfolio(entryId) {
        setPortfolio((prev) => (prev.includes(entryId) ? prev.filter((id) => id !== entryId) : [...prev, entryId]))
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
        setSignedUp((prev) => prev.map((item) =>
            item.causeId === causeId && !item.weekly ? { ...item, done: true } : item
        ))
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

    function thankVolunteer(causeId, personId) {
        setThanks((prev) => [...prev, { id: `thanks_${Date.now()}`, causeId, personId, at: new Date().toISOString() }])
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

    // ---- Social ----

    // Entries the student liked, and stickers they reacted with, by entry id.
    const [likes, setLikes] = usePersistentState('likes', {})
    const [reactions, setReactions] = usePersistentState('reactions', {})
    // Chat messages with each friend: { from: 'me' | 'them', text, at }.
    const [chats, setChats] = usePersistentState('chats', {})
    // Ids of incoming invites the student has joined.
    const [joinedInvites, setJoinedInvites] = usePersistentState('joinedInvites', [])
    // The friend whose profile is open, and the friend whose chat is open on Social.
    const [viewingFriendId, setViewingFriendId] = useState(null)
    const [chatFriendId, setChatFriendId] = useState(null)

    function toggleLike(entryId) {
        setLikes((prev) => ({ ...prev, [entryId]: !prev[entryId] }))
    }

    function toggleReaction(entryId, stickerId) {
        setReactions((prev) => {
            const current = prev[entryId] || []
            const next = current.includes(stickerId) ? current.filter((id) => id !== stickerId) : [...current, stickerId]
            return { ...prev, [entryId]: next }
        })
    }

    // Sends a chat message. The sample friend answers with a canned reply a moment later.
    function sendChat(friendId, text) {
        const sentCount = (chats[friendId] || []).filter((message) => message.from === 'me').length
        const reply = sampleChatReplies[sentCount % sampleChatReplies.length]
        setChats((prev) => ({
            ...prev, [friendId]: [...(prev[friendId] || []), { from: 'me', text, at: new Date().toISOString() }],
        }))
        setTimeout(() => {
            setChats((prev) => ({
                ...prev, [friendId]: [...(prev[friendId] || []), { from: 'them', text: reply, at: new Date().toISOString() }],
            }))
        }, 900)
    }

    // Joining an invite signs the student up for that cause, together with the friend who invited them.
    function joinInvite(invite) {
        setJoinedInvites((prev) => [...prev, invite.id])
        setOpenCauseId(invite.causeId)
        confirmSignup({
            causeId: invite.causeId, weekly: false, mode: 'friends', friendIds: [invite.fromId],
            goingIds: [], calendarAnswered: false,
        })
    }

    function openChat(friendId) {
        setChatFriendId(friendId)
        navigate('social')
    }

    function openFriend(friendId) {
        setViewingFriendId(friendId)
        navigate('friend')
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
    }

    // Clears everything saved and starts the demo again from the Welcome screen.
    function resetDemo() {
        clearAll()
        window.location.reload()
    }

    return {
        // values
        quizResult, screen, openCauseId, openedBySurprise, openOrgId, orgReturnTo, causeReturnTo, followedOrgIds, profile, signedUp, allSignups,
        events, favourites, sentInvites, orgUpdates, thanks, sampleAttendance, attendance, hoursWorked,
        portfolio, lastVisit, cow, basicGrassLeft, likes, reactions, chats, joinedInvites, viewingFriendId, chatFriendId,
        friendIds, history, diary, calendarConnected, settings, view,
        grass, recentFeeds, justFinishedGoal, finishedGoalIds, moolah, moolahLedger,
        // actions
        navigate, setView, setProfile, setSettings, setCalendarConnected,
        changeGoal, chooseNextGoal, recordAction, finishWelcome, finishAboutYou, finishStory,
        retakeStory, openCause, openOrganisation, toggleFollow, signUpFor, surpriseMe, confirmSignup, answerCalendarPrompt,
        startReflection, wentToSession, saveReflection, setEntryPublic, togglePortfolio,
        addFriend, removeFriend,
        recordVisit, markSampleAttended, hostEvent, addOrgEvent, approveEvent, postUpdate, thankVolunteer,
        isFavourite, toggleFavourite, inviteFriends,
        feedBasicGrass, buyItem, giftItem, toggleAccessory,
        toggleLike, toggleReaction, sendChat, joinInvite, openFriend, openChat, setChatFriendId,
        disconnectCalendar, resetDemo, earnMoolah, spendMoolah,
        clearRecentFeeds: () => setRecentFeeds([]),
    }
}
