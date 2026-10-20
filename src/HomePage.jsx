import { results } from './data/chapters'
import { CHARACTERS } from './assets/characters'
import CowAvatar from './CowAvatar'
import { traitLabels } from './data/traits'
import { cowNotes, urgentCount } from './cowNotes'
import HomeLayout from './HomeLayout'
import HomeNextUp from './HomeNextUp'
import HomeFeed from './HomeFeed'
import CowPeek from './CowPeek'
import GoalCard from './GoalCard'
import SavedReminder from './SavedReminder'
import './HomePage.css'

function HomePage({ app }) {
    const character = results[app.quizResult]
    const hours = app.hoursWorked

    return (
        <HomeLayout
            hero={
                <>
                    <div className="home-greeting">
                        <p className="eyebrow home-greeting-type">
                            <CowAvatar face={CHARACTERS[app.quizResult].head} size="tiny" label=""/> {character.name} · {traitLabels[app.quizResult].label}
                        </p>
                        <h1>Welcome, {app.profile.name || "friend"}</h1>
                        <p className="home-greeting-sub">
                            {hours > 0
                                ? `You've given ${hours} ${hours === 1 ? "hour" : "hours"} so far. Here's what's around you next.`
                                : "Here are causes picked for how you like to help. Start small, there's no rush."}
                        </p>
                        <HomeNextUp signedUp={app.signedUp} events={app.events} onSeeAll={() => app.navigate('profile')}/>
                    </div>
                    <CowPeek
                        art={CHARACTERS[app.quizResult]}
                        cow={app.cow}
                        grass={app.grass}
                        recentFeeds={app.recentFeeds}
                        onReactionDone={app.clearRecentFeeds}
                        notes={cowNotes(app)}
                        urgent={urgentCount(app)}
                        visit={app.homeVisits}
                        onVisit={() => app.navigate('cow')}
                    />
                </>
            }
            main={<HomeFeed app={app}/>}
            side={
                <>
                    <GoalCard
                        goalId={app.profile.goal}
                        history={app.history}
                        finishedIds={app.finishedGoalIds}
                        onGoalChange={app.changeGoal}
                    />
                    <SavedReminder
                        events={app.events}
                        favourites={app.favourites}
                        signedUp={app.signedUp}
                        onSignUp={app.signUpFor}
                        onOpenFavourites={() => app.navigate('favourites')}
                    />
                </>
            }
        />
    )
}

export default HomePage
