import { causes } from './data/causes'
import { results } from './data/chapters'
import { traitLabels } from './data/traits'
import { upcomingSessions } from './upcoming'
import HomeLayout from './HomeLayout'
import HomeNextUp from './HomeNextUp'
import HomeFeed from './HomeFeed'
import CowPeek from './CowPeek'
import GoalCard from './GoalCard'
import SavedReminder from './SavedReminder'
import CalendarConnect from './CalendarConnect'
import './HomePage.css'

function HomePage({ app }) {
    const character = results[app.quizResult]
    const followed = [
        ...app.signedUp.map((entry) => entry.causeId),
        ...app.favourites.filter((item) => item.kind === 'cause').map((item) => item.id),
    ]
    const latest = app.orgUpdates.filter((update) => followed.includes(update.causeId)).at(-1)
    const news = latest ? { causeName: causes.find((c) => c.id === latest.causeId).name, text: latest.text } : null
    const hours = app.hoursWorked

    return (
        <HomeLayout
            hero={
                <>
                    <div className="home-greeting">
                        <p className="eyebrow">
                            <span aria-hidden="true">{character.emoji}</span> {character.name} · {traitLabels[app.quizResult].label}
                        </p>
                        <h1>Welcome, {app.profile.name || "friend"}</h1>
                        <p className="home-greeting-sub">
                            {hours > 0
                                ? `You've given ${hours} ${hours === 1 ? "hour" : "hours"} so far. Here's what's around you next.`
                                : "Here are causes picked for how you like to help. Start small, there's no rush."}
                        </p>
                        <HomeNextUp signedUp={app.signedUp} onSeeAll={() => app.navigate('profile')}/>
                    </div>
                    <CowPeek
                        name={app.profile.name}
                        cow={app.cow}
                        grass={app.grass}
                        grassLeft={app.basicGrassLeft}
                        recentFeeds={app.recentFeeds}
                        onReactionDone={app.clearRecentFeeds}
                        news={news}
                        next={upcomingSessions(app.signedUp)[0]}
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
                    <CalendarConnect
                        connected={app.calendarConnected}
                        fitsMyWeek={app.fitsMyWeek}
                        onConnect={() => app.setCalendarConnected(true)}
                        onDisconnect={app.disconnectCalendar}
                        onFitsChange={app.setFitsMyWeek}
                    />
                </>
            }
        />
    )
}

export default HomePage
