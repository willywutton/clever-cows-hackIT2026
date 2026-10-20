// Profile.jsx shows the student's profile: the banner across the top, then two columns.
// Left: Next up, Goals and My answers. Right: Portfolio, History, Privacy and demo tools.
// On phones the columns stack, left first.
import { results } from './data/chapters'
import { CHARACTERS } from './assets/characters'
import { earnedTitles } from './titles'
import { goalById } from './goalProgress'
import ProfileHeader from './ProfileHeader'
import NextUp from './NextUp'
import ProfileGoals from './ProfileGoals'
import PortfolioSection from './PortfolioSection'
import HistorySection from './HistorySection'
import ProfileSettings from './ProfileSettings'
import './Profile.css'

const ABOUT_LABELS = [
    { id: "goal", label: "Goal" },
    { id: "area", label: "Preferred area" },
    { id: "ageGroup", label: "Age group" },
    { id: "region", label: "Part of Singapore" },
]

// { quizResult } is the student's top trait, e.g. "Heart".
// { profile } holds their name and optional About you answers.
// { onNameChange } and { onAboutChange } update the name and About me line.
// { onReflect } records "I went to this session". { onGoalChange } picks a goal.
// { moolah } is shown in the banner.
// { signedUp }, { history } and { diary } come from App.
// { settings } holds the privacy choices and { onSettingsChange } updates them.
// { calendarConnected } and its handlers drive the Calendar card.
// { onRetakeStory } and { onResetDemo } are the demo tools at the bottom.
// { portfolio }, { hoursWorked } and { onOpenPortfolio } are for the Portfolio section.
function Profile({ events, onLogOut, calendarConnected, onConnectCalendar, onDisconnectCalendar, quizResult, profile, onNameChange, onAboutChange, onGoalChange, moolah, onReflect, signedUp, history, diary, settings, onSettingsChange, onRetakeStory, onResetDemo, portfolio, hoursWorked, onOpenPortfolio }) {
    const character = results[quizResult]
    const titles = earnedTitles(history, profile.goalHistory)

    // The goal is stored as an id, e.g. "try-new", so show its name instead.
    function aboutAnswer(id) {
        if (id === "goal") {
            return goalById(profile.goal)?.name || "Not answered"
        }
        return profile[id] || "Not answered"
    }

    return (
        <div className="profile">
            <ProfileHeader
                name={profile.name}
                onNameChange={onNameChange}
                about={profile.about || ""}
                onAboutChange={onAboutChange}
                character={character}
                art={CHARACTERS[quizResult]}
                titles={titles}
                hours={hoursWorked}
                moolah={moolah}
            />

            <div className="profile-columns">
                <div className="profile-column">
                    <NextUp signedUp={signedUp} events={events} userRegion={profile.region} onReflect={onReflect}/>

                    <ProfileGoals
                        goalId={profile.goal}
                        history={history}
                        goalHistory={profile.goalHistory}
                        onGoalChange={onGoalChange}
                    />

                    <section className="card profile-section">
                        <h3>My answers</h3>
                        <dl className="profile-about">
                            {ABOUT_LABELS.map((item) => (
                                <div key={item.id}>
                                    <dt>{item.label}</dt>
                                    <dd>{aboutAnswer(item.id)}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>
                </div>

                <div className="profile-column">
                    <PortfolioSection diary={diary} portfolio={portfolio} hoursWorked={hoursWorked} onOpenPrint={onOpenPortfolio}/>

                    <HistorySection history={history} titles={titles} titlesVisible={settings.showTitles}/>

                    <ProfileSettings
                        calendarConnected={calendarConnected}
                        onConnectCalendar={onConnectCalendar}
                        onDisconnectCalendar={onDisconnectCalendar}
                        settings={settings}
                        onSettingsChange={onSettingsChange}
                        onRetakeStory={onRetakeStory}
                        onResetDemo={onResetDemo}
                        onLogOut={onLogOut}
                    />
                </div>
            </div>
        </div>
    )
}

export default Profile
