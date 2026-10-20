// SocialPage.jsx is the Herd tab: friends and social in one place.
// Feed shows public diary pages beside herd stats and people to add,
// Friends & chat holds the friend list, search and chat, and Invites holds plans to help together.
import { useState } from 'react'
import { publicPosts } from './herd'
import PageTitle from './PageTitle'
import FeedCard from './FeedCard'
import HerdAside from './HerdAside'
import FriendsColumn from './FriendsColumn'
import ChatPanel from './ChatPanel'
import InvitesList from './InvitesList'
import './SocialPage.css'

const TABS = [
    { id: "feed", label: "Feed", emoji: "📰" },
    { id: "friends", label: "Friends & chat", emoji: "💬" },
    { id: "invites", label: "Invites", emoji: "💌" },
]

// { app } is everything from useCleverCows. { initialTab } picks the tab to open on.
function SocialPage({ app, initialTab }) {
    // Opening a chat from elsewhere starts on Friends & chat.
    const [tab, setTab] = useState(app.chatFriendId ? "friends" : initialTab || "feed")
    const feed = publicPosts({ diary: app.diary, name: app.profile.name, accessories: app.cow.equipped })

    return (
        <div className="social">
            <PageTitle title="Your herd" subtitle="Friends, diary pages and plans to help together.">
                <div className="social-tabs" role="tablist" aria-label="Herd sections">
                    {TABS.map((t) => (
                        <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
                            <span aria-hidden="true">{t.emoji}</span> {t.label}
                        </button>
                    ))}
                </div>
            </PageTitle>

            {tab === "feed" && (
                <div className="social-columns screen-enter">
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
                    <HerdAside app={app} onOpenInvites={() => setTab("invites")}/>
                </div>
            )}

            {tab === "friends" && (
                <div className="social-chat screen-enter">
                    <FriendsColumn
                        friendIds={app.friendIds}
                        activeId={app.chatFriendId}
                        onPick={app.setChatFriendId}
                        onRemove={app.removeFriend}
                        onAdd={app.addFriend}
                    />
                    <ChatPanel
                        activeId={app.chatFriendId}
                        chats={app.chats}
                        onSend={app.sendChat}
                        onViewProfile={app.openFriend}
                    />
                </div>
            )}

            {tab === "invites" && (
                <div className="screen-enter">
                    <InvitesList joined={app.joinedInvites} onJoin={app.joinInvite} sent={app.sentInvites}/>
                </div>
            )}
        </div>
    )
}

export default SocialPage
