// FarmerScene.jsx shows the farmer inside the barn with a speech bubble beside him.
// The farmer's introduction, the About you questions and the story cover use it.
import Graphic from './Graphic'
import { FARMER } from './assets/farmerArt'
import BarnInterior from './BarnInterior'
import './FarmerIntro.css'

// { bubbleKey } changes when the farmer says something new, which restarts the
// bubble's pop-in animation. { centred } puts the bubble in the middle of the screen.
// { children } is what goes inside the bubble. With { bubble } set to false, the
// children show without a bubble, as something the farmer is holding up.
function FarmerScene({ bubbleKey, centred, bubble = true, children }) {
    return (
        <BarnInterior centred={centred}>
            <div className={centred ? "farmer farmer-centred" : "farmer"}>
                <div className="farmer-figure">
                    {FARMER.image
                        ? <img src={FARMER.image} alt={FARMER.name}/>
                        : <span role="img" aria-label={FARMER.name}><Graphic symbol={FARMER.emoji}/></span>}
                </div>

                {bubble
                    ? (
                        <div key={bubbleKey} className="farmer-bubble" aria-live="polite">
                            <p className="farmer-name">{FARMER.name}</p>
                            {children}
                        </div>
                    )
                    : <div key={bubbleKey} className="farmer-held">{children}</div>}
            </div>
        </BarnInterior>
    )
}

export default FarmerScene
