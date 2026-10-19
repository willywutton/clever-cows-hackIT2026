// ChatPanel.jsx is a simple chat with friends. The friends are sample people, so each
// reply is a canned message, clearly labelled. Nothing is sent anywhere.
import { useEffect, useRef, useState } from 'react'
import { sampleStudentById } from './data/friends'
import CowAvatar from './CowAvatar'
import SampleTag from './SampleTag'
import './ChatPanel.css'

// { friendIds } is the student's friends. { activeId } is the open chat (or null),
// changed with { onPick }. { chats } holds the messages and { onSend } sends one.
function ChatPanel({ friendIds, activeId, onPick, chats, onSend }) {
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

    return (
        <div className="chat">
            <ul className="chat-friends">
                {friendIds.map((id) => {
                    const f = sampleStudentById(id)
                    return (
                        <li key={id}>
                            <button aria-pressed={id === activeId} onClick={() => onPick(id)}>
                                <CowAvatar accessories={f.accessories} size="small" label=""/>
                                {f.name}
                            </button>
                        </li>
                    )
                })}
                {friendIds.length === 0 && <li className="chat-empty">Add friends to start chatting.</li>}
            </ul>

            <section className="card chat-window">
                {!friend && <p className="chat-empty">Pick a friend to chat with.</p>}
                {friend && (
                    <>
                        <header className="chat-header">
                            <strong>{friend.name}</strong> <SampleTag/>
                        </header>
                        <ol className="chat-messages">
                            {messages.length === 0 && (
                                <li className="chat-empty">Say hi! You could invite {friend.name} to a session.</li>
                            )}
                            {messages.map((message, index) => (
                                <li key={index} className={message.from === "me" ? "chat-me" : "chat-them"}>
                                    <span>{message.text}</span>
                                    {message.from === "them" && <SampleTag text="Sample reply"/>}
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
                    </>
                )}
            </section>
        </div>
    )
}

export default ChatPanel
