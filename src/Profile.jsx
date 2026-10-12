// Profile.jsx shows the student's character, upcoming sessions and About you answers.
import { results } from './data/chapters'
import NextUp from './NextUp'
import './Profile.css'

const ABOUT_LABELS = [
    { id: "goal", label: "Goal" },
    { id: "area", label: "Preferred area" },
    { id: "ageGroup", label: "Age group" },
    { id: "region", label: "Part of Singapore" },
]

// { quizResult } is the student's top trait, e.g. "Heart".
// { profile } holds their optional About you answers. { signedUp } is their list of sign-ups.
function Profile({ quizResult, profile, signedUp }) {
    const character = results[quizResult]

    return (
        <div className="profile">
            <div className="profile-header card">
                <span className="profile-emoji" aria-hidden="true">🐮</span>
                <h2>{character.name}</h2>
            </div>

            <NextUp signedUp={signedUp} userRegion={profile.region}/>

            <section className="card profile-section">
                <h3>About me</h3>
                <dl className="profile-about">
                    {ABOUT_LABELS.map((item) => (
                        <div key={item.id}>
                            <dt>{item.label}</dt>
                            <dd>{profile[item.id] || "Not answered"}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        </div>
    )
}

export default Profile
