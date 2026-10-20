// ChatPanel.jsx is a simple chat with one friend. The friends are sample people, so each
// reply is a canned message, clearly labelled. Nothing is sent anywhere.
import Graphic from './Graphic'
import { useEffect, useRef, useState } from 'react'
import { sampleStudentById } from './data/friends'
import CowAvatar from './CowAvatar'
import './ChatPanel.css'

// { activeId } is the friend whose chat is open (or null). { chats } holds the messages,
// { onSend } sends one and { onViewProfile } opens the friend's profile.
function ChatPanel({ activeId, chats, onSend, onViewProfile }) {
    const [text, setText] = useState("")
    const messagesEnd = useRef(null)
    const messages = activeId ? chats[activeId] || [] : []
    const friend = activeId ? sampleStudentById(activeId) : null

    // Keep the newest message in view.
    useEffect(() => {
        messagesEnd.current?.scrollIntoView({ block: 'nearest' })
    }, [messages.length])

    function handleSubmit(event) {
        event.preventDefault()
        if (text.trim() !== "" && activeId) {
            onSend(activeId, text.trim())
            setText("")
        }
    }

    if (!friend) {
        return (
            <section className="card chat-window chat-window-empty">
                <span aria-hidden="true"><Graphic symbol="message"/></span>
                <p>Pick a friend to chat, or plan a session together.</p>
            </section>
        )
    }

    return (
        <section className="card chat-window" key={friend.id}>
            <header className="chat-header">
                <CowAvatar accessories={friend.accessories} size="small" label={`${friend.name}'s cow`}/>
                <div>
                    <strong>{friend.name}</strong>
                    <p>{friend.about}</p>
                </div>
                <button className="chat-profile" onClick={() => onViewProfile(friend.id)}>Profile</button>
            </header>
            <ol className="chat-messages">
                {messages.length === 0 && (
                    <li className="chat-empty">Say hi! You could invite {friend.name} to a session.</li>
                )}
                {messages.map((message, index) => (
                    <li key={index} className={message.from === "me" ? "chat-me" : "chat-them"}>
                        <span>{message.text}</span>
                    </li>
                ))}
                <li ref={messagesEnd} aria-hidden="true"/>
            </ol>
            <form className="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    maxLength={200}
                    aria-label={`Message ${friend.name}`}
                    placeholder={`Message ${friend.name}`}
                    onChange={(event) => setText(event.target.value)}
                />
                <button type="submit" disabled={text.trim() === ""}>Send</button>
            </form>
        </section>
    )
}

export default ChatPanel
