// App.jsx is the top of the app. It remembers the quiz result and the
// group's grass count, and decides which screen to show: the Quiz or the matched causes.
import { useState, useEffect } from 'react'
import Quiz from './Quiz'
import MatchFeed from './MatchFeed'
import CloverCowdini from './CloverCowdini'

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

  // Quiz calls this when the player clicks "See my causes",
  // passing in their top trait (e.g. "Heart").
  function handleQuizFinish(topTrait) {
    setQuizResult(topTrait)
  }

  // MatchFeed calls this when "Play again" is clicked.
  // Setting the result back to null brings the quiz back. The quiz starts
  // fresh (scores at 0, Scene 1) because React throws away a component's
  // remembered values when it stops being shown, and starts new ones next time.
  // The grass is kept, because it lives here in App, which is always shown.
  function handlePlayAgain() {
    setQuizResult(null)
  }

  // MatchFeed calls this when an action button is clicked.
  // Each action feeds the cow once per cause, so clicking the same button
  // again doesn't add more grass. Grass is only ever added, never removed.
  function handleAction(causeId, actionType) {
    const actionId = `${causeId}:${actionType}`
    if (fedActions.includes(actionId)) {
      return
    }
    setFedActions([...fedActions, actionId])
  }

  // No result yet -> show the quiz. Otherwise -> show the cow and the matching causes.
  let content
  if (quizResult === null) {
    // whenDone is a "prop": a value handed down to the Quiz component.
    // Here we hand it our function so Quiz can report back when it's finished.
    content =<Quiz whenDone={handleQuizFinish}/>
  }
  else {
    // <> and </> group two components together without adding an extra box around them.
    content = (
      <>
        <CloverCowdini grass={grass}/>
        <MatchFeed result ={quizResult} onPlayAgain={handlePlayAgain} onAction={handleAction}/>
      </>
    )
  }
  return(
    <div>
      {content}
    </div>
  )

}

export default App
