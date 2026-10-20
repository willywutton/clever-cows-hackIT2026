// SocialPage.jsx is the Social tab: friends and social in one place.
// Feed mixes friends' public diary pages with posts from organisations, beside your people
// and suggestions to follow,
// Friends & chat holds the friend list, search and chat, and Invites holds plans to help together.
import Graphic from './Graphic'
import { useState } from 'react'
import { organisationPosts, publicPosts } from './herd'
import OrgPostCard from './OrgPostCard'
import PageTitle from './PageTitle'
import FeedCard from './FeedCard'
import HerdAside from './HerdAside'
import FriendsColumn from './FriendsColumn'
import ChatPanel from './ChatPanel'
import InvitesList from './InvitesList'
import './SocialPage.css'

const FEED_FILTERS = [
    { id: "all", label: "All" },
    { id: "friends", label: "Friends" },
    { id: "orgs", label: "Organisations" },
]

const TABS = [
    { id: "feed", label: "Feed", emoji: "📰" },
    { id: "friends", label: "Friends & chat", emoji: "💬" },
    { id: "invites", label: "Invites", emoji: "💌" },
]

// { app } is everything from useCleverCows. { initialTab } picks the tab to open on.
function SocialPage({ app, initialTab }) {
    // Opening a chat from elsewhere starts on Friends & chat.
    const [tab, setTab] = useState(app.chatFriendId ? "friends" : initialTab || "feed")
    const [filter, setFilter] = useState("all")
    const diaryItems = publicPosts({ diary: app.diary, name: app.profile.name, accessories: app.cow.equipped, trait: app.quizResult })
        .map((item) => ({ kind: "diary", at: item.entry.at, item }))
    const orgItems = organisationPosts(app.orgUpdates)
        .map((post) => ({ kind: "org", at: post.at, post }))
    const feed = [
        ...(filter === "orgs" ? [] : diaryItems),
        ...(filter === "friends" ? [] : orgItems),
    ].sort((a, b) => (a.at < b.at ? 1 : -1))

    return (
        <div className="social">
            <PageTitle title="Social" subtitle="Friends, organisations you follow and plans to help together.">
                <div className="social-tabs" role="tablist" aria-label="Social sections">
                    {TABS.map((t) => (
                        <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
                            <span aria-hidden="true"><Graphic symbol={t.emoji}/></span> {t.label}
                        </button>
                    ))}
                </div>
            </PageTitle>

            {tab === "feed" && (
                <div className="social-columns screen-enter">
                    <div className="social-feed">
                        <div className="social-filter" role="group" aria-label="Show posts from">
                            {FEED_FILTERS.map((f) => (
                                <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>
                            ))}
                        </div>
                        {feed.map((item) => (item.kind === "org" ? (
                            <OrgPostCard
                                key={item.post.id}
                                post={item.post}
                                following={app.followedOrgIds.includes(item.post.org.id)}
                                onToggleFollow={() => app.toggleFollow(item.post.org.id)}
                                onOpenOrg={app.openOrganisation}
                                liked={Boolean(app.likes[item.post.id])}
                                onToggleLike={() => app.toggleLike(item.post.id)}
                            />
                        ) : (
                            <FeedCard
                                key={item.item.entry.id}
                                entry={item.item.entry}
                                author={item.item.author}
                                baseLikes={item.item.baseLikes}
                                liked={Boolean(app.likes[item.item.entry.id])}
                                reacted={app.reactions[item.item.entry.id] || []}
                                onToggleLike={() => app.toggleLike(item.item.entry.id)}
                                onToggleReaction={(stickerId) => app.toggleReaction(item.item.entry.id, stickerId)}
                            />
                        )))}
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
