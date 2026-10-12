// App.jsx is the top of the app. It remembers the quiz result and the
// group's grass count, and decides which screen to show.
// It also switches between the student view and the mock organisation view.
import { useState, useEffect } from 'react'
import Welcome from './Welcome'
import AboutYou from './AboutYou'
import Quiz from './Quiz'
import MatchFeed from './MatchFeed'
import CausePage from './CausePage'
import CloverCowdini from './CloverCowdini'
import OrgDashboard from './OrgDashboard'
import NavBar from './NavBar'
import Profile from './Profile'
import { causes } from './data/causes'

// The name the grass is saved under in the browser's storage (localStorage).
// localStorage keeps small bits of text on this device, even after a refresh.
const FED_ACTIONS_KEY = 'clever-cows-fed-actions'

// Read the saved list of actions that have fed the cow.
// If nothing is saved yet, or the browser blocks storage, start with an empty list.
function loadFedActions() {
  try {
    const saved = localStorage.getItem(FED_ACTIONS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function App() {
  // useState gives the component a value it can remember between screens.
  // quizResult is the value, setQuizResult is the only way to change it.
  // It starts as null, meaning "the quiz hasn't been finished yet".
  const [quizResult, setQuizResult] = useState(null)

  // Which screen the student is on: 'welcome', 'about', 'quiz', 'home', 'cause' or 'profile'.
  const [screen, setScreen] = useState('welcome')

  // The id of the cause whose page is open, e.g. "cause_02".
  const [openCauseId, setOpenCauseId] = useState(null)

  // The student's optional About you answers. An empty string means not answered.
  const [profile, setProfile] = useState({ goal: '', area: '', ageGroup: '' })

  // Which view is showing: 'student' (quiz and causes) or 'organisation' (mock dashboard).
  const [view, setView] = useState('student')

  // Every action that has fed the cow, e.g. ["cause_02:share", "cause_02:time"].
  // Passing the function loadFedActions (without brackets) means React only
  // reads the saved list once, when the app first opens.
  const [fedActions, setFedActions] = useState(loadFedActions)

  // One grass per action in the list, so the grass count is just its length.
  const grass = fedActions.length

  // useEffect runs code after the screen updates. The [fedActions] at the end
  // means "only run this when fedActions changes", so every new grass gets saved.
  useEffect(() => {
    try {
      localStorage.setItem(FED_ACTIONS_KEY, JSON.stringify(fedActions))
    } catch {
      // Storage is blocked (e.g. some private windows). The cow still works until a refresh.
    }
  }, [fedActions])

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

  // CausePage calls this when an action is taken.
  // Each action feeds the cow once per cause, so clicking the same button
  // again doesn't add more grass. Grass is only ever added, never removed.
  function handleAction(causeId, actionType) {
    if (hasFed(causeId, actionType)) {
      return
    }
    setFedActions([...fedActions, `${causeId}:${actionType}`])
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
        <CloverCowdini grass={grass}/>
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
        hasFed={hasFed}
      />
    )
  }
  else if (screen === 'profile') {
    content = <Profile quizResult={quizResult} profile={profile}/>
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
