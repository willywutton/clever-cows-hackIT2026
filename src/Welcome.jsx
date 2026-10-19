// Welcome.jsx is the first screen: the app's name, what it's for in a sentence or two,
// and a Next button that leads to the farmer's introduction.
import BarnFront from './BarnFront'
import welcomeFarm from './assets/welcome-farm.png'
import './Welcome.css'

// { onNext } moves on to the farmer's introduction.
function Welcome({ onNext }) {
    // The card sits inside the barn front, where the big barn door would be.
    return (
        <BarnFront>
            <div className="welcome card">
                <div className="welcome-scene">
                    <img className="welcome-picture" src={welcomeFarm} alt="Clover Cowdini sitting on a grassy hill under a blue sky"/>
                </div>

                <div className="welcome-body">
                    <h1>Welcome to Clever Cows</h1>
                    <p className="welcome-intro">
                        Lots of young people want to help their community, but it's hard to know
                        where to start, and harder to keep going.
                    </p>
                    <p className="welcome-intro">
                        Clever Cows matches you with causes that suit you, and makes it easy to keep
                        showing up: with friends, around your week, and without guilt.
                    </p>
                    <button className="button-primary welcome-start" onClick={onNext}>Next</button>
                </div>
            </div>
        </BarnFront>
    )
}

export default Welcome
