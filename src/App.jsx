// App.jsx is the top of the app. It remembers the quiz result and the
// group's grass count, and decides which screen to show.
// It also switches between the student view and the mock organisation view.
import { useState } from 'react'
import Welcome from './Welcome'
import AboutYou from './AboutYou'
import Quiz from './Quiz'
import MatchFeed from './MatchFeed'
import CausePage from './CausePage'
import SignUp from './SignUp'
import SignupDone from './SignupDone'
import CloverCowdini from './CloverCowdini'
import OrgDashboard from './OrgDashboard'
import SiteHeader from './SiteHeader'
import HomeLayout from './HomeLayout'
import Profile from './Profile'
import HomeNextUp from './HomeNextUp'
import Reflection from './Reflection'
import CalendarConnect from './CalendarConnect'
import GoalCard from './GoalCard'
import GoalComplete from './GoalComplete'
import { goalById, goalProgress } from './goalProgress'
import { causes } from './data/causes'
import { startingFriendIds } from './data/friends'
import { GRASS } from './assets/cowStages'

function App() {
  // useState gives the component a value it can remember between screens.
  // quizResult is the value, setQuizResult is the only way to change it.
  // It starts as null, meaning "the quiz hasn't been finished yet".
  const [quizResult, setQuizResult] = useState(null)

  // Which screen the student is on: 'welcome', 'about', 'quiz', 'home', 'cause',
  // 'signup', 'signup-done', 'reflection' or 'profile'.
  const [screen, setScreen] = useState('welcome')

  // The id of the cause whose page is open, e.g. "cause_02".
  const [openCauseId, setOpenCauseId] = useState(null)

  // The student's nickname and optional About you answers. An empty string means not answered.
  const [profile, setProfile] = useState({ nickname: '', goal: '', area: '', ageGroup: '', region: '', goalHistory: [] })

  // Every session the student has signed up for, one entry per cause.
  // See people.js for what an entry looks like.
  const [signedUp, setSignedUp] = useState([])

  // Event proposals the student has sent from Host your own event (demo, nothing is sent).
  const [proposals, setProposals] = useState([])

  // The ids of the student's friends (sample students from friends.js).
  const [friendIds, setFriendIds] = useState(startingFriendIds)

  // Every action the student takes, in order, e.g. { type: 'share', causeId: 'cause_02', at: '...' }.
  // Used for the History counts and to work out titles (see titles.js).
  const [history, setHistory] = useState([])

  // The student's diary entries from the reflection screen, oldest first.
  const [diary, setDiary] = useState([])

  // The "Connect calendar (demo)" card: whether the sample timetable is connected,
  // and whether Home only shows sessions that fit it.
  const [calendarConnected, setCalendarConnected] = useState(false)
  const [fitsMyWeek, setFitsMyWeek] = useState(false)

  // The student's privacy choices. Both are off unless the student turns them on.
  const [settings, setSettings] = useState({ showTitles: false, shareDiary: false })

  // Which view is showing: 'student' (quiz and causes) or 'organisation' (mock dashboard).
  const [view, setView] = useState('student')

  // Every action that has fed the cow, e.g. ["cause_02:share", "cause_02:signup"].
  // Kept in React state only, so a page refresh starts a fresh demo.
  const [fedActions, setFedActions] = useState([])

  // Add up the grass for each action in the list, using the amounts in cowStages.js.
  // The part after ":" is the action type, e.g. "signup" is worth 3.
  const grass = fedActions.reduce((total, id) => total + GRASS[id.split(':')[1]], 0)

  // Actions that fed the cow since she last reacted on Home: { type, causeName, amount }.
  const [recentFeeds, setRecentFeeds] = useState([])

  // The id of a goal the student has just finished, shown on their next visit to Home, or null.
  const [justFinishedGoal, setJustFinishedGoal] = useState(null)

  // The ids of every goal the student has finished.
  const finishedGoalIds = profile.goalHistory.map((finished) => finished.goalId)

  // GoalCard calls this when the student picks, changes or drops a goal ('' means no goal).
  // A goal the history already meets is finished straight away.
  function handleGoalChange(goalId) {
    setProfile({ ...profile, goal: goalId })
    finishGoalIfComplete(goalId, history)
  }

  // Checks whether a goal is met by the given history. If it is (and wasn't finished before),
  // it is added to goalHistory, which earns its title, feeds the cow, and queues the thank-you.
  // prev => {...} uses the latest profile, even if another update happens at the same time.
  function finishGoalIfComplete(goalId, historyToCheck) {
    const goal = goalById(goalId)
    if (!goal || finishedGoalIds.includes(goalId) || !goalProgress(goal, historyToCheck).complete) {
      return
    }
    setProfile((prev) => ({
      ...prev,
      goalHistory: [...prev.goalHistory, { goalId, finishedAt: new Date().toISOString() }],
    }))
    setFedActions((prev) => [...prev, `${goalId}:goal`])
    setRecentFeeds((prev) => [...prev, { type: 'goal', causeName: goal.name, amount: GRASS.goal }])
    setJustFinishedGoal(goalId)
  }

  // GoalComplete calls this with the next goal the student chose, or '' to take a break.
  function handleNextGoal(goalId) {
    setJustFinishedGoal(null)
    handleGoalChange(goalId)
  }

  // AboutYou calls this with the answers when the student continues or skips.
  function handleAboutDone(answers) {
    setProfile(answers)
    finishGoalIfComplete(answers.goal, history)
    setScreen('quiz')
  }

  // Quiz calls this when the player clicks "See my causes",
  // passing in their top trait (e.g. "Heart").
  function handleQuizFinish(topTrait) {
    setQuizResult(topTrait)
    setScreen('home')
  }

  // MatchFeed calls this when "Play again" is clicked, and goes back to Welcome.
  // The quiz will start fresh (scores at 0, Scene 1) because React throws away
  // a component's remembered values when it stops being shown, and starts
  // new ones next time. The grass and About you answers are kept, because they live here in App.
  function handlePlayAgain() {
    setQuizResult(null)
    setScreen('welcome')
  }

  // MatchFeed calls this when a cause card is tapped.
  function handleOpenCause(causeId) {
    setOpenCauseId(causeId)
    setScreen('cause')
  }

  // SignUp calls this with the new entry. Signing up again for the same cause
  // replaces the old entry, so each cause appears once.
  function handleConfirmSignup(entry) {
    const others = signedUp.filter((item) => item.causeId !== entry.causeId)
    setSignedUp([...others, entry])
    handleAction(entry.causeId, 'signup', { weekly: entry.weekly, mode: entry.mode })
    setScreen('signup-done')
  }

  // Next up calls this from "I went to this session".
  function handleReflect(causeId) {
    setOpenCauseId(causeId)
    setScreen('reflection')
  }

  // Reflection calls this with { message, photoUrl } when the student saves.
  function handleSaveReflection(reflection) {
    const entry = { id: `diary_${diary.length + 1}`, causeId: openCauseId, at: new Date().toISOString(), ...reflection }
    setDiary([...diary, entry])
    handleAction(openCauseId, 'reflection')
    setScreen('profile')
  }

  // Marks a sign-up's calendar prompt as answered, so it is never asked again.
  function handleCalendarAnswered(causeId) {
    setSignedUp(signedUp.map((item) =>
      item.causeId === causeId ? { ...item, calendarAnswered: true } : item
    ))
  }

  // Called whenever the student takes an action. { details } adds extra facts
  // to the history item, e.g. { weekly: true, mode: 'relay' } for a sign-up.
  // Every action goes into the history. Each action feeds the cow once per cause,
  // so clicking the same button again doesn't add more grass.
  // Grass is only ever added, never removed.
  function handleAction(causeId, actionType, details = {}) {
    const item = { type: actionType, causeId, at: new Date().toISOString(), ...details }
    // prev => [...] uses the latest list, even if two updates happen together.
    setHistory((prev) => [...prev, item])
    finishGoalIfComplete(profile.goal, [...history, item])
    if (hasFed(causeId, actionType)) {
      return
    }
    setFedActions([...fedActions, `${causeId}:${actionType}`])
    const causeName = causes.find((cause) => cause.id === causeId).name
    setRecentFeeds((prev) => [...prev, { type: actionType, causeName, amount: GRASS[actionType] }])
  }

  // HostEvent calls this with a new proposal; it is shown on the Profile.
  function handleSendProposal(proposal) {
    setProposals([...proposals, { id: `proposal_${proposals.length + 1}`, sentAt: new Date().toISOString(), ...proposal }])
  }

  // Adds a friend by id (from a friend code), or removes one. Removing a friend
  // leaves any sign-ups they're already part of unchanged.
  function handleAddFriend(id) {
    setFriendIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  function handleRemoveFriend(id) {
    setFriendIds(friendIds.filter((friendId) => friendId !== id))
  }

  // Disconnecting the sample timetable also turns off the "Fits my week" filter.
  function handleDisconnectCalendar() {
    setCalendarConnected(false)
    setFitsMyWeek(false)
  }

  // CloverCowdini calls this once the happy reaction has been shown.
  function clearRecentFeeds() {
    setRecentFeeds([])
  }

  // True if this action for this cause has already fed the cow.
  function hasFed(causeId, actionType) {
    return fedActions.includes(`${causeId}:${actionType}`)
  }

  // Pick what to draw for the current screen.
  let content
  if (screen === 'welcome') {
    content = <Welcome onStart={() => setScreen('about')}/>
  }
  else if (screen === 'about') {
    content = <AboutYou profile={profile} onDone={handleAboutDone}/>
  }
  else if (screen === 'quiz') {
    // whenDone is a "prop": a value handed down to the Quiz component.
    // Here we hand it our function so Quiz can report back when it's finished.
    content = <Quiz whenDone={handleQuizFinish}/>
  }
  else if (screen === 'home' && justFinishedGoal) {
    // A goal was just finished, so thank the student before showing Home.
    content = (
      <GoalComplete
        key={justFinishedGoal}
        goalId={justFinishedGoal}
        history={history}
        finishedIds={finishedGoalIds}
        onChoose={handleNextGoal}
        onTakeBreak={() => handleNextGoal('')}
      />
    )
  }
  else if (screen === 'home') {
    // <> and </> group several components together without adding an extra box around them.
    content = (
      <HomeLayout
        side={
          <>
            <HomeNextUp signedUp={signedUp} onSeeAll={() => setScreen('profile')}/>
            <GoalCard goalId={profile.goal} history={history} finishedIds={finishedGoalIds} onGoalChange={handleGoalChange}/>
            <CloverCowdini grass={grass} recentFeeds={recentFeeds} onReactionDone={clearRecentFeeds}/>
            <CalendarConnect
              connected={calendarConnected}
              fitsMyWeek={fitsMyWeek}
              onConnect={() => setCalendarConnected(true)}
              onDisconnect={handleDisconnectCalendar}
              onFitsChange={setFitsMyWeek}
            />
          </>
        }
        main={
          <MatchFeed
            result ={quizResult}
            onOpenCause={handleOpenCause}
            onPlayAgain={handlePlayAgain}
            fitsMyWeek={fitsMyWeek}
            onShowAll={() => setFitsMyWeek(false)}
            signedUp={signedUp}
            onSendProposal={handleSendProposal}
            userRegion={profile.region}
          />
        }
      />
    )
  }
  else if (screen === 'cause') {
    const openCause = causes.find((cause) => cause.id === openCauseId)
    // key makes React start a fresh page (with no old messages) for each cause.
    content = (
      <CausePage
        key={openCause.id}
        cause={openCause}
        onBack={() => setScreen('home')}
        onAction={handleAction}
        onSignUp={() => setScreen('signup')}
        isSignedUp={signedUp.some((item) => item.causeId === openCause.id)}
      />
    )
  }
  else if (screen === 'signup') {
    const openCause = causes.find((cause) => cause.id === openCauseId)
    content = (
      <SignUp
        cause={openCause}
        existing={signedUp.find((item) => item.causeId === openCause.id) || null}
        userRegion={profile.region}
        myFriendIds={friendIds}
        onAddFriend={handleAddFriend}
        onConfirm={handleConfirmSignup}
        onBack={() => setScreen('cause')}
      />
    )
  }
  else if (screen === 'signup-done') {
    const openCause = causes.find((cause) => cause.id === openCauseId)
    content = (
      <SignupDone
        cause={openCause}
        entry={signedUp.find((item) => item.causeId === openCause.id)}
        userRegion={profile.region}
        onCalendarAnswered={() => handleCalendarAnswered(openCause.id)}
        onHome={() => setScreen('home')}
        onBackToCause={() => setScreen('cause')}
      />
    )
  }
  else if (screen === 'reflection') {
    const openCause = causes.find((cause) => cause.id === openCauseId)
    content = (
      <Reflection
        cause={openCause}
        shared={settings.shareDiary}
        onSave={handleSaveReflection}
        onCancel={() => setScreen('profile')}
      />
    )
  }
  else if (screen === 'profile') {
    content = (
      <Profile
        quizResult={quizResult}
        profile={profile}
        onNicknameChange={(nickname) => setProfile({ ...profile, nickname })}
        onReflect={handleReflect}
        signedUp={signedUp}
        history={history}
        diary={diary}
        settings={settings}
        onSettingsChange={setSettings}
        friendIds={friendIds}
        onAddFriend={handleAddFriend}
        onRemoveFriend={handleRemoveFriend}
        proposals={proposals}
      />
    )
  }

  // The menu only appears once there is a quiz result to build on.
  const showNavBar = quizResult !== null

  // Home, Profile and the story use the full width; the other screens are mostly
  // reading or forms, so they stay a comfortable width in the middle.
  const fullWidthScreens = ['home', 'profile', 'quiz', 'welcome']

  return(
    <>
      <SiteHeader
        view={view}
        onViewChange={setView}
        showNav={showNavBar && view === 'student'}
        screen={screen}
        onNavigate={setScreen}
      />

      {/* Both views stay on the page and the other one is just hidden.
          This way switching back and forth doesn't lose quiz progress
          or the attendance the organisation has marked. */}
      {/* On the Welcome screen the space around the page becomes a barn wall (see Welcome.css). */}
      <main className={view === 'student' && screen === 'welcome' ? 'barn-wall' : undefined}>
        <div className="page">
          <div hidden={view !== 'student'} className={fullWidthScreens.includes(screen) ? undefined : 'page-narrow'}>
            {content}
          </div>
          <div hidden={view !== 'organisation'} className="page-narrow">
            <OrgDashboard fedActions={fedActions}/>
          </div>
        </div>
      </main>
    </>
  )

}

export default App
