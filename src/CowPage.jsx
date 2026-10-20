// CowPage.jsx is the Cow tab: Clover Cowdini's room, her stats, free basic grass
// from helping, and the store. Caring for her only ever makes things better.
import { useState } from 'react'
import { cowStages } from './assets/cowStages'
import { ART } from './assets/cowArt'
import PageTitle from './PageTitle'
import CowRoom from './CowRoom'
import { CHARACTERS } from './assets/characters'
import CowStats from './CowStats'
import CowStore from './CowStore'
import { STAT_MAX } from './data/store'
import './CowPage.css'

// { app } is everything from useCleverCows: the cow, Moolah, grass and care actions.
function CowPage({ app }) {
    const [message, setMessage] = useState("")
    // Changes on every feed or purchase, so the hop animation plays each time.
    const [hopKey, setHopKey] = useState(0)

    const reached = cowStages.filter((stage) => app.grass >= stage.minGrass)
    const stage = reached[reached.length - 1]

    function cheer(text) {
        setMessage(text)
        setHopKey(hopKey + 1)
    }

    const full = app.cow.stats.hunger >= STAT_MAX

    function handleFeed() {
        app.feedBasicGrass()
        cheer("Munch munch! Clover loved that grass.")
    }

    return (
        <div className="cow-page">
            <PageTitle title="Clover Cowdini" subtitle={`${stage.name} stage · ${stage.message}`}/>

            <div className="cow-page-columns">
                <div className="cow-page-main">
                    <CowRoom key={hopKey} art={CHARACTERS[app.quizResult]} owned={app.cow.owned} equipped={app.cow.equipped} happy={hopKey > 0}/>
                    {message && <p className="cow-page-message" role="status">{message}</p>}

                    <section className="card cow-page-grass">
                        <span className="cow-page-grass-art" aria-hidden="true">{ART["basic-grass"].emoji}</span>
                        <div>
                            <h3>Basic grass</h3>
                            <p>
                                {app.basicGrassLeft} {app.basicGrassLeft === 1 ? "handful" : "handfuls"} saved up.
                                You earn grass by signing up, writing in your diary and finishing goals.
                            </p>
                        </div>
                        <button className="button-primary" onClick={handleFeed} disabled={app.basicGrassLeft === 0 || full}>
                            {full ? "She's full!" : "Feed Clover"}
                        </button>
                    </section>
                </div>

                <section className="card cow-page-stats">
                    <h3>How she's doing</h3>
                    <CowStats stats={app.cow.stats}/>
                    <p className="cow-page-stats-note">These only go up. Clover never gets sad if you're busy.</p>
                </section>
            </div>

            <CowStore
                moolah={app.moolah}
                owned={app.cow.owned}
                equipped={app.cow.equipped}
                stats={app.cow.stats}
                headwear={CHARACTERS[app.quizResult].headwear}
                onBuy={app.buyItem}
                onToggleAccessory={app.toggleAccessory}
                onBought={(item) => cheer(`Clover loves her new ${item.name.toLowerCase()}!`)}
            />
        </div>
    )
}

export default CowPage
