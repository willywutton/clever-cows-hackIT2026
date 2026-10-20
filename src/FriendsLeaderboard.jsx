// FriendsLeaderboard.jsx ranks the student's friends by hours volunteered.
// It only includes friends, and the student only appears if they turn on
// "Show me on my friends' leaderboard" in Profile. All friends here are sample people.
import { sampleStudentById } from './data/friends'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import './FriendsLeaderboard.css'

// { friendIds } is the student's friends. { me } is { name, hours, accessories }.
// { showMe } is the privacy setting.
function FriendsLeaderboard({ friendIds, me, showMe }) {
    const rows = friendIds.map((id) => {
        const friend = sampleStudentById(id)
        return { id, name: friend.name, hours: friend.hoursWorked, accessories: friend.accessories, sample: true }
    })
    if (showMe) {
        rows.push({ id: "me", name: `${me.name} (you)`, hours: me.hours, accessories: me.accessories, face: me.face, sample: false })
    }
    rows.sort((a, b) => b.hours - a.hours)

    return (
        <section className="card leaderboard">
            <h3>Hours with friends</h3>
            <p className="leaderboard-note">Just your friends. Every hour helps, whatever the number.</p>
            <ol>
                {rows.map((row, index) => (
                    <li key={row.id} className={row.sample ? undefined : "leaderboard-me"}>
                        <span className="leaderboard-place">{index + 1}</span>
                        <CowAvatar accessories={row.accessories} face={row.face} size="small" label={`${row.name}'s cow`}/>
                        <span className="leaderboard-name">{row.name} {row.sample && <SampleTag/>}</span>
                        <strong>{row.hours} h</strong>
                    </li>
                ))}
            </ol>
            {!showMe && (
                <p className="leaderboard-note">
                    You're not on this list. Turn on "Show me on my friends' leaderboard" in Profile if you'd like to be.
                </p>
            )}
        </section>
    )
}

export default FriendsLeaderboard
