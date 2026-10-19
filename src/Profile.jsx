// Profile.jsx shows the student's profile: the header across the top, then two columns.
// Left: Next up, Friends and About me. Right: Portfolio, History, Privacy and demo tools.
// On phones the columns stack, left first.
import { results } from './data/chapters'
import { earnedTitles } from './titles'
import { goalById } from './goalProgress'
import ProfileHeader from './ProfileHeader'
import NextUp from './NextUp'
import FriendsSection from './FriendsSection'
import PortfolioSection from './PortfolioSection'
import HistorySection from './HistorySection'
import PrivacySettings from './PrivacySettings'
import DemoTools from './DemoTools'
import './Profile.css'

const ABOUT_LABELS = [
    { id: "goal", label: "Goal" },
    { id: "area", label: "Preferred area" },
    { id: "ageGroup", label: "Age group" },
    { id: "region", label: "Part of Singapore" },
]

// { quizResult } is the student's top trait, e.g. "Heart".
// { profile } holds their name and optional About you answers.
// { onNameChange } updates the name. { onReflect } opens the reflection screen.
// { signedUp }, { history } and { diary } come from App.
// { settings } holds the privacy choices and { onSettingsChange } updates them.
// { friendIds } is the friends list, changed with { onAddFriend } and { onRemoveFriend }.
// { onRetakeStory } and { onResetDemo } are the demo tools at the bottom.
// { portfolio }, { hoursWorked } and { onOpenPortfolio } are for the Portfolio section.
function Profile({ quizResult, profile, onNameChange, onReflect, signedUp, history, diary, settings, onSettingsChange, friendIds, onAddFriend, onRemoveFriend, onRetakeStory, onResetDemo, portfolio, hoursWorked, onOpenPortfolio }) {
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
                character={character}
                latestTitle={titles[titles.length - 1]}
            />

            <div className="profile-columns">
                <div className="profile-column">
                    <NextUp signedUp={signedUp} userRegion={profile.region} onReflect={onReflect}/>

                    <FriendsSection friendIds={friendIds} onAdd={onAddFriend} onRemove={onRemoveFriend}/>

                    <section className="card profile-section">
                        <h3>About me</h3>
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

                    <PrivacySettings settings={settings} onChange={onSettingsChange}/>

                    <DemoTools onRetakeStory={onRetakeStory} onResetDemo={onResetDemo}/>
                </div>
            </div>
        </div>
    )
}

export default Profile
