// Welcome.jsx is the first screen: the app's name, what it's for in a sentence or two,
// and a Next button that leads to the farmer's introduction.
import BarnFront from './BarnFront'
import './Welcome.css'

// The picture of Clover Cowdini in the farm scene. While this is null, an emoji is shown.
// To use artwork, put the image in src/assets, import it at the top of this file
// (e.g. import cowPicture from './assets/clover-cowdini.png') and set COW_PICTURE to it.
const COW_PICTURE = null

// { onNext } moves on to the farmer's introduction.
function Welcome({ onNext }) {
    // The card sits inside the barn front, where the big barn door would be.
    return (
        <BarnFront>
            <div className="welcome card">
                {/* A small farm scene drawn with CSS: sky, sun, hills and a fence. */}
                <div className="welcome-scene">
                    <span className="welcome-sun" aria-hidden="true"/>
                    <span className="welcome-hill welcome-hill-back" aria-hidden="true"/>
                    <span className="welcome-hill welcome-hill-front" aria-hidden="true"/>
                    <span className="welcome-fence" aria-hidden="true"/>
                    {COW_PICTURE ? (
                        <img className="welcome-cow welcome-cow-image" src={COW_PICTURE} alt="Clover Cowdini"/>
                    ) : (
                        <span className="welcome-cow" role="img" aria-label="Clover Cowdini">🐮</span>
                    )}
                </div>

                <div className="welcome-body">
                    <h2>Welcome to Clever Cows</h2>
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
