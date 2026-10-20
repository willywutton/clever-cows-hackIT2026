// CowPage.jsx is the Cow tab: Clover Cowdini's barn with a keepsake from every cause the
// student has helped, her mailbag of news and thank-yous from organisations, her stats,
// free basic grass from helping, and the store.
import Graphic from './Graphic'
import { useState } from 'react'
import { cowStages } from './assets/cowStages'
import { ART } from './assets/cowArt'
import PageTitle from './PageTitle'
import CowRoom from './CowRoom'
import { CHARACTERS } from './assets/characters'
import CowStats from './CowStats'
import CowStore from './CowStore'
import { STAT_MAX } from './data/store'
import { keepsakesFor } from './data/keepsakes'
import { mailbagItems } from './cowNotes'
import CowMailbag from './CowMailbag'
import KeepsakeCelebration from './KeepsakeCelebration'
import './CowPage.css'

// { app } is everything from useCleverCows: the cow, Moolah, grass and care actions.
function CowPage({ app }) {
    const [message, setMessage] = useState("")
    // Changes on every feed or purchase, so the hop animation plays each time.
    const [hopKey, setHopKey] = useState(0)
    // The keepsake earned since the last visit to the barn drops onto the shelf.
    // It stops being new once the student leaves the barn (see navigate in useCleverCows).
    const newCauseId = app.newKeepsake ? app.newKeepsake.causeId : null
    const keepsakes = keepsakesFor(app.attendance, app.diary)
    // A new keepsake is celebrated once, when the barn opens.
    const [celebrating, setCelebrating] = useState(newCauseId)
    const celebrated = keepsakes.find((item) => item.cause.id === celebrating)

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
            <PageTitle
                title="Clover Cowdini"
                subtitle="Clover keeps a memory from everywhere you help, and brings you news from the people you helped."
            />

            <div className="cow-page-columns">
                <div className="cow-page-main">
                    <CowRoom
                        key={hopKey}
                        art={CHARACTERS[app.quizResult]}
                        keepsakes={keepsakes}
                        newCauseId={newCauseId}
                        equipped={app.cow.equipped}
                        happy={hopKey > 0}
                        onWrite={app.startReflection}
                        onOpenCause={(id) => app.openCause(id)}
                    />
                    <p className="cow-page-keepsakes">
                        <strong>{keepsakes.length}</strong> {keepsakes.length === 1 ? "keepsake" : "keepsakes"}
                        {" · "}<strong>{keepsakes.filter((k) => k.level === "treasured").length}</strong> treasured
                        {" · "}{stage.name} stage
                    </p>
                    {message && <p className="cow-page-message" role="status">{message}</p>}

                    <section className="card cow-page-grass">
                        <span className="cow-page-grass-art" aria-hidden="true"><Graphic symbol={ART["basic-grass"].emoji}/></span>
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

                <div className="cow-page-side">
                    <section className="card cow-page-stats">
                        <h3>How she's doing</h3>
                        <CowStats stats={app.cow.stats}/>
                        <p className="cow-page-stats-note">These dip a little each week. New keepsakes from your sessions lift her Comfort and Happiness.</p>
                    </section>
                    <CowMailbag
                        items={mailbagItems(app)}
                        readIds={app.readMail}
                        name={app.profile.name}
                        onRead={app.markMailRead}
                        onOpenOrg={app.openOrganisation}
                        onOpenCause={(id) => app.openCause(id)}
                    />
                </div>
            </div>

            {celebrated && (
                <KeepsakeCelebration item={celebrated} onClose={() => setCelebrating(null)} onWrite={app.startReflection}/>
            )}

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
