// Profile.jsx shows the student's profile, in this order: header, Next up,
// My collection, History, About me and Privacy.
import { results } from './data/chapters'
import { earnedTitles } from './titles'
import { goalById } from './goalProgress'
import ProfileHeader from './ProfileHeader'
import NextUp from './NextUp'
import MyCollection from './MyCollection'
import HistorySection from './HistorySection'
import PrivacySettings from './PrivacySettings'
import './Profile.css'

const ABOUT_LABELS = [
    { id: "goal", label: "Goal" },
    { id: "area", label: "Preferred area" },
    { id: "ageGroup", label: "Age group" },
    { id: "region", label: "Part of Singapore" },
]

// { quizResult } is the student's top trait, e.g. "Heart".
// { profile } holds their nickname and optional About you answers.
// { onNicknameChange } updates the nickname. { onReflect } opens the reflection screen.
// { signedUp }, { history } and { diary } come from App.
// { settings } holds the privacy choices and { onSettingsChange } updates them.
function Profile({ quizResult, profile, onNicknameChange, onReflect, signedUp, history, diary, settings, onSettingsChange }) {
    const character = results[quizResult]
    const titles = earnedTitles(history, profile.goalHistory)

    // The goal is stored as an id, e.g. "try-new", so show its name instead.
    function aboutAnswer(id) {
        if (id === "goal") {
            return goalById(profile.goal)?.name || "Not sure yet"
        }
        return profile[id] || "Not answered"
    }

    return (
        <div className="profile">
            <ProfileHeader
                nickname={profile.nickname}
                onNicknameChange={onNicknameChange}
                character={character}
                latestTitle={titles[titles.length - 1]}
            />

            <NextUp signedUp={signedUp} userRegion={profile.region} onReflect={onReflect}/>

            <MyCollection diary={diary} shared={settings.shareDiary} signedUp={signedUp} onWrite={onReflect}/>

            <HistorySection history={history} titles={titles} titlesVisible={settings.showTitles}/>

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

            <PrivacySettings settings={settings} onChange={onSettingsChange}/>
        </div>
    )
}

export default Profile
