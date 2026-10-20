import { causes } from './data/causes'
import { organisationById } from './data/organisations'
import { results } from './data/chapters'
import { CHARACTERS } from './assets/characters'
import CowAvatar from './CowAvatar'
import { traitLabels } from './data/traits'
import { upcomingSessions } from './upcoming'
import HomeLayout from './HomeLayout'
import HomeNextUp from './HomeNextUp'
import HomeFeed from './HomeFeed'
import CowPeek from './CowPeek'
import GoalCard from './GoalCard'
import SavedReminder from './SavedReminder'
import './HomePage.css'

function HomePage({ app }) {
    const character = results[app.quizResult]
    const followed = [
        ...app.allSignups.map((entry) => entry.causeId),
        ...app.favourites.filter((item) => item.kind === 'cause').map((item) => item.id),
        ...app.followedOrgIds.flatMap((id) => organisationById(id).causeIds),
    ]
    const causeName = (id) => causes.find((c) => c.id === id).name
    const latestNews = app.orgUpdates.filter((update) => followed.includes(update.causeId)).at(-1)
    const latestThanks = app.thanks.filter((item) => item.personId === 'student').at(-1)
    const needsDiary = app.attendance
        .filter((visit) => visit.source === 'org' && !app.diary.some((entry) => entry.causeId === visit.causeId && entry.at > visit.at))
        .at(-1)
    const notes = [
        latestNews && { at: latestNews.at, text: `Moo! News from ${causeName(latestNews.causeId)}: "${latestNews.text}"` },
        latestThanks && {
            at: latestThanks.at,
            text: `Moo! ${causeName(latestThanks.causeId)} says thank you for coming, ${app.profile.name}! They'd love to see you again.`,
            action: { label: "See their next session", onClick: () => app.openCause(latestThanks.causeId) },
        },
        needsDiary && {
            at: needsDiary.at,
            text: `${causeName(needsDiary.causeId)} marked you as attended: +${needsDiary.hours} h and ${needsDiary.moolah} Moolah! How did it go?`,
            action: { label: "Write in my diary", onClick: () => app.startReflection(needsDiary.causeId) },
        },
    ].filter(Boolean).sort((a, b) => (a.at < b.at ? 1 : -1))
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
                        <HomeNextUp signedUp={app.signedUp} onSeeAll={() => app.navigate('profile')}/>
                    </div>
                    <CowPeek
                        name={app.profile.name}
                        art={CHARACTERS[app.quizResult]}
                        cow={app.cow}
                        grass={app.grass}
                        grassLeft={app.basicGrassLeft}
                        recentFeeds={app.recentFeeds}
                        onReactionDone={app.clearRecentFeeds}
                        note={notes[0]}
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
                </>
            }
        />
    )
}

export default HomePage
