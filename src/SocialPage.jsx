// SocialPage.jsx is the Social tab: a feed of public diary pages (sample friends' and the
// student's own public ones), chats with friends, and invites to volunteer together.
import { useState } from 'react'
import { samplePublicEntries } from './data/sampleSocial'
import { sampleStudentById } from './data/friends'
import PageTitle from './PageTitle'
import FeedCard from './FeedCard'
import ChatPanel from './ChatPanel'
import InvitesList from './InvitesList'
import './SocialPage.css'

const TABS = [
    { id: "feed", label: "Feed" },
    { id: "chat", label: "Chat" },
    { id: "invites", label: "Invites" },
]

// { app } is everything from useCleverCows.
function SocialPage({ app }) {
    // Opening a chat from the Friends tab starts on the Chat tab.
    const [tab, setTab] = useState(app.chatFriendId ? "chat" : "feed")

    const myEntries = app.diary
        .filter((entry) => entry.isPublic)
        .map((entry) => ({ entry, author: { name: `${app.profile.name} (you)`, accessories: app.cow.equipped, sample: false }, baseLikes: 0 }))
    const sampleEntries = samplePublicEntries.map((entry) => {
        const student = sampleStudentById(entry.authorId)
        return { entry, author: { name: student.name, accessories: student.accessories, sample: true }, baseLikes: entry.likes }
    })
    const feed = [...myEntries, ...sampleEntries].sort((a, b) => (a.entry.at < b.entry.at ? 1 : -1))

    return (
        <div className="social">
            <PageTitle title="Social" subtitle="See what friends have been up to, and plan sessions together.">
                <div className="social-tabs" role="group" aria-label="Social sections">
                    {TABS.map((t) => (
                        <button key={t.id} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>{t.label}</button>
                    ))}
                </div>
            </PageTitle>

            {tab === "feed" && (
                <div className="social-feed">
                    {feed.map(({ entry, author, baseLikes }) => (
                        <FeedCard
                            key={entry.id}
                            entry={entry}
                            author={author}
                            baseLikes={baseLikes}
                            liked={Boolean(app.likes[entry.id])}
                            reacted={app.reactions[entry.id] || []}
                            onToggleLike={() => app.toggleLike(entry.id)}
                            onToggleReaction={(stickerId) => app.toggleReaction(entry.id, stickerId)}
                        />
                    ))}
                </div>
            )}

            {tab === "chat" && (
                <ChatPanel
                    friendIds={app.friendIds}
                    activeId={app.chatFriendId}
                    onPick={app.setChatFriendId}
                    chats={app.chats}
                    onSend={app.sendChat}
                />
            )}

            {tab === "invites" && (
                <InvitesList joined={app.joinedInvites} onJoin={app.joinInvite} sent={app.sentInvites}/>
            )}
        </div>
    )
}

export default SocialPage
