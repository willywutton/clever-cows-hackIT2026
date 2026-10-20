// AddFriend.jsx adds a friend by typing their friend code.
// In this demo the codes belong to sample students; a real app would look them up on a server.
import { useState } from 'react'
import { myFriendCode, normaliseCode, sampleStudents } from './data/friends'
import './AddFriend.css'

// { friendIds } is the student's current friends. { onAdd } receives a new friend's id.
function AddFriend({ friendIds, onAdd }) {
    const [code, setCode] = useState("")
    // The result of the last try: { ok: true/false, text }, or null before any try.
    const [result, setResult] = useState(null)

    const notYetFriends = sampleStudents.filter((student) => !friendIds.includes(student.id))

    // A form's onSubmit runs on the Add button and on pressing Enter.
    // preventDefault stops the browser from reloading the page, which forms do by default.
    function handleSubmit(event) {
        event.preventDefault()
        const typed = normaliseCode(code)
        const student = sampleStudents.find((s) => normaliseCode(s.code) === typed)

        if (typed === normaliseCode(myFriendCode)) {
            setResult({ ok: false, text: "That's your own code. Ask a friend for theirs!" })
        }
        else if (!student) {
            setResult({ ok: false, text: "No one has that code. Check it and try again." })
        }
        else if (friendIds.includes(student.id)) {
            setResult({ ok: false, text: `${student.name} is already your friend.` })
        }
        else {
            onAdd(student.id)
            setResult({ ok: true, text: `${student.name} is now your friend.` })
            setCode("")
        }
    }

    return (
        <form className="add-friend" onSubmit={handleSubmit}>
            <label className="add-friend-field">
                <span>Friend code</span>
                <input
                    type="text"
                    value={code}
                    placeholder="e.g. MOO-1234"
                    maxLength={12}
                    autoComplete="off"
                    onChange={(event) => setCode(event.target.value)}
                />
            </label>
            <button className="add-friend-button" type="submit" disabled={code.trim() === ""}>Add</button>

            {result && (
                <p className={result.ok ? "add-friend-result add-friend-ok" : "add-friend-result"} role="status">
                    {result.text}
                </p>
            )}

            {notYetFriends.length > 0 && (
                <p className="add-friend-demo">
                    <span className="add-friend-demo-label">Try these codes:</span>{" "}
                    {notYetFriends.map((student) => `${student.code} (${student.name})`).join(", ")}
                </p>
            )}
        </form>
    )
}

export default AddFriend
