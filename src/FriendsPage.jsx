// FriendsPage.jsx is the Friends tab: add friends, see the friend list, and the
// friends-only hours leaderboard.
import { useState } from 'react'
import PageTitle from './PageTitle'
import AddFriendPanel from './AddFriendPanel'
import FriendList from './FriendList'
import FriendsLeaderboard from './FriendsLeaderboard'
import './FriendsPage.css'

// { app } is everything from useCleverCows.
function FriendsPage({ app }) {
    const [adding, setAdding] = useState(false)

    return (
        <div className="friends-page">
            <PageTitle title="Friends" subtitle="Volunteering is better together.">
                {!adding && <button className="friends-add-button" onClick={() => setAdding(true)}>+ Add a friend</button>}
            </PageTitle>

            {adding && <AddFriendPanel friendIds={app.friendIds} onAdd={app.addFriend} onClose={() => setAdding(false)}/>}

            <div className="friends-columns">
                <FriendList
                    friendIds={app.friendIds}
                    onView={app.openFriend}
                    onChat={app.openChat}
                    onRemove={app.removeFriend}
                />
                <FriendsLeaderboard
                    friendIds={app.friendIds}
                    me={{ name: app.profile.name, hours: app.hoursWorked, accessories: app.cow.equipped }}
                    showMe={app.settings.showOnLeaderboard}
                />
            </div>
        </div>
    )
}

export default FriendsPage
