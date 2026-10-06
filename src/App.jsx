// App.jsx decides which screen you will see and holds information
import { useState } from 'react'
import Quiz from './Quiz'
import MatchFeed from './MatchFeed'


function App() {
  const [quizResult, setQuizResult] = useState('null')

  function handleQuizFinish(topTrait) {
    setQuizResult(topTrait)
  }
  let content
  if (quizResult === null) {
    content =<Quiz whenDone={handleQuizFinish}/>
  }
  else {
    content = <MatchFeed result ={quizResult}/>
  }
  return(
    <div>
      {content}
    </div>
  )
  
}

export default App