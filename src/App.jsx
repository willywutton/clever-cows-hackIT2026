// App.jsx is the top of the app. It remembers the quiz result
// and decides which screen to show: the Quiz or the matched causes.
import { useState } from 'react'
import Quiz from './Quiz'
import MatchFeed from './MatchFeed'


function App() {
  // useState gives the component a value it can remember between screens.
  // quizResult is the value, setQuizResult is the only way to change it.
  // It starts as null, meaning "the quiz hasn't been finished yet".
  const [quizResult, setQuizResult] = useState(null)

  // Quiz calls this when the player clicks "See my causes",
  // passing in their top trait (e.g. "Heart").
  function handleQuizFinish(topTrait) {
    setQuizResult(topTrait)
  }

  // MatchFeed calls this when "Play again" is clicked.
  // Setting the result back to null brings the quiz back. The quiz starts
  // fresh (scores at 0, Scene 1) because React throws away a component's
  // remembered values when it stops being shown, and starts new ones next time.
  function handlePlayAgain() {
    setQuizResult(null)
  }

  // No result yet -> show the quiz. Otherwise -> show the matching causes.
  let content
  if (quizResult === null) {
    // whenDone is a "prop": a value handed down to the Quiz component.
    // Here we hand it our function so Quiz can report back when it's finished.
    content =<Quiz whenDone={handleQuizFinish}/>
  }
  else {
    content = <MatchFeed result ={quizResult} onPlayAgain={handlePlayAgain}/>
  }
  return(
    <div>
      {content}
    </div>
  )

}

export default App
