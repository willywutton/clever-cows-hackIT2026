// Welcome.jsx is the first screen: the app's name, what it's for in a sentence or two,
// and the ways in: start as a new student, continue as a returning one, or log in as
// an organisation.
import { useState } from 'react'
import BarnFront from './BarnFront'
import welcomeFarm from './assets/welcome-farm.png'
import './Welcome.css'

// { returningName } is the saved student's first name, or '' for a new visitor.
// { onStart } begins the farmer's introduction. { onContinue } logs the saved student back in.
// { onStartFresh } clears the saved student. { onOrganisation } opens the organisation log-in.
function Welcome({ returningName, onStart, onContinue, onStartFresh, onOrganisation }) {
    // Starting fresh clears the saved student, so it asks once more first.
    const [confirming, setConfirming] = useState(false)

    // The card sits inside the barn front, where the big barn door would be.
    return (
        <BarnFront>
            <div className="welcome card">
                <div className="welcome-scene">
                    <img className="welcome-picture" src={welcomeFarm} alt="Clover Cowdini sitting on a grassy hill under a blue sky"/>
                </div>

                <div className="welcome-body">
                    <h1>{returningName ? `Welcome back, ${returningName}` : "Welcome to Clever Cows"}</h1>
                    {returningName ? (
                        <p className="welcome-intro">
                            Clover's been keeping your barn warm. Pick up where you left off.
                        </p>
                    ) : (
                        <>
                            <p className="welcome-intro">
                                Lots of young people want to help their community, but it's hard to know
                                where to start, and harder to keep going.
                            </p>
                            <p className="welcome-intro">
                                Clever Cows matches you with causes that suit you, and makes it easy to keep
                                showing up: with friends, around your week, and without guilt.
                            </p>
                        </>
                    )}

                    {returningName ? (
                        <div className="welcome-actions">
                            <button className="button-primary welcome-start" onClick={onContinue}>Continue as {returningName}</button>
                            {!confirming && (
                                <button className="welcome-link" onClick={() => setConfirming(true)}>Not {returningName}? Start as someone new</button>
                            )}
                            {confirming && (
                                <p className="welcome-confirm" role="alert">
                                    This clears {returningName}'s progress on this device.{" "}
                                    <button className="welcome-link" onClick={() => setConfirming(false)}>Keep it</button>
                                    {" · "}
                                    <button className="welcome-link" onClick={onStartFresh}>Start fresh</button>
                                </p>
                            )}
                        </div>
                    ) : (
                        <button className="button-primary welcome-start" onClick={onStart}>Get started</button>
                    )}

                    <p className="welcome-org">
                        Run volunteering for an organisation?{" "}
                        <button className="welcome-link" onClick={onOrganisation}>Organisation log in →</button>
                    </p>
                </div>
            </div>
        </BarnFront>
    )
}

export default Welcome
