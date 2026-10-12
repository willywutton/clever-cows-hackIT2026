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
import NavBar from './NavBar'
import Profile from './Profile'
import HomeNextUp from './HomeNextUp'
import Reflection from './Reflection'
import { causes } from './data/causes'
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
  const [profile, setProfile] = useState({ nickname: '', goal: '', area: '', ageGroup: '', region: '' })

  // Every session the student has signed up for, one entry per cause.
  // See people.js for what an entry looks like.
  const [signedUp, setSignedUp] = useState([])

  // Every action the student takes, in order, e.g. { type: 'share', causeId: 'cause_02', at: '...' }.
  // Used for the History counts and to work out titles (see titles.js).
  const [history, setHistory] = useState([])

  // The student's diary entries from the reflection screen, oldest first.
  const [diary, setDiary] = useState([])

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

  // AboutYou calls this with the answers when the student continues or skips.
  function handleAboutDone(answers) {
    setProfile(answers)
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
    // prev => [...] uses the latest list, even if two updates happen together.
    setHistory((prev) => [...prev, { type: actionType, causeId, at: new Date().toISOString(), ...details }])
    if (hasFed(causeId, actionType)) {
      return
    }
    setFedActions([...fedActions, `${causeId}:${actionType}`])
    const causeName = causes.find((cause) => cause.id === causeId).name
    setRecentFeeds((prev) => [...prev, { type: actionType, causeName, amount: GRASS[actionType] }])
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
  else if (screen === 'home') {
    // <> and </> group two components together without adding an extra box around them.
    content = (
      <>
        <HomeNextUp signedUp={signedUp} onSeeAll={() => setScreen('profile')}/>
        <CloverCowdini grass={grass} recentFeeds={recentFeeds} onReactionDone={clearRecentFeeds}/>
        <MatchFeed result ={quizResult} onOpenCause={handleOpenCause} onPlayAgain={handlePlayAgain}/>
      </>
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
      />
    )
  }

  // The menu only appears once there is a quiz result to build on.
  const showNavBar = quizResult !== null

  return(
    <div>
      {/* Switch between the student app and the mock organisation view.
          aria-pressed tells screen readers which button is currently selected. */}
      <div className="view-toggle">
        <button
          aria-pressed={view === 'student'}
          onClick={() => setView('student')}
        >
          Student
        </button>
        <button
          aria-pressed={view === 'organisation'}
          onClick={() => setView('organisation')}
        >
          Organisation
        </button>
      </div>

      {/* Both views stay on the page and the other one is just hidden.
          This way switching back and forth doesn't lose quiz progress
          or the attendance the organisation has marked. */}
      <div hidden={view !== 'student'}>
        {showNavBar && <NavBar screen={screen} onNavigate={setScreen}/>}
        {content}
      </div>
      <div hidden={view !== 'organisation'}>
        <OrgDashboard fedActions={fedActions}/>
      </div>
    </div>
  )

}

export default App
