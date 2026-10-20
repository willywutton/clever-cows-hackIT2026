import { useState } from 'react'
import { causes } from './data/causes'
import { traitLabels } from './data/traits'
import {
    TOPICS, causesFittingWeek, causesFriendsAreGoingTo, causesNear, causesOnTopic, causesOutsideMatch,
    friendsGoingTo, matchedCauses,
} from './causeRows'
import { publicPosts } from './herd'
import { organisations } from './data/organisations'
import OrgTile from './OrgTile'
import HomeRow from './HomeRow'
import TopicBar from './TopicBar'
import CauseTile from './CauseTile'
import SurpriseTile from './SurpriseTile'
import EventTile from './EventTile'
import PostTile from './PostTile'
import Modal from './Modal'
import './HomeFeed.css'

function causeById(id) {
    return causes.find((cause) => cause.id === id)
}

function HomeFeed({ app }) {
    const [chosenTopic, setTopic] = useState("all")
    const [askCalendar, setAskCalendar] = useState(false)
    const { profile, quizResult } = app
    const topic = chosenTopic === "calendar" && !app.calendarConnected ? "all" : chosenTopic

    function tile(cause, note) {
        return (
            <CauseTile
                key={cause.id}
                cause={cause}
                entry={app.signedUp.find((entry) => entry.causeId === cause.id)}
                friends={friendsGoingTo(cause.id, app.friendIds)}
                userRegion={profile.region}
                note={note}
                onOpen={(causeId) => app.openCause(causeId)}
            />
        )
    }

    function connectCalendar() {
        app.setCalendarConnected(true)
        setAskCalendar(false)
        setTopic("calendar")
    }

    const chips = (
        <TopicBar
            topic={topic}
            onChange={setTopic}
            calendarConnected={app.calendarConnected}
            onLockedCalendar={() => setAskCalendar(true)}
        />
    )

    const calendarModal = askCalendar && (
        <Modal title="Connect your calendar first" icon="📅" onClose={() => setAskCalendar(false)}>
            <p>
                "Fits my week" checks each session against your timetable, so you only see ones you can
                actually make.
            </p>
            <p>This demo uses a sample timetable. Nothing is read from a real calendar.</p>
            <div className="modal-buttons">
                <button className="modal-secondary" onClick={() => setAskCalendar(false)}>Not now</button>
                <button className="button-primary" onClick={connectCalendar}>Connect calendar (demo)</button>
            </div>
        </Modal>
    )

    if (topic !== "all") {
        const fitting = topic === "calendar"
        const chosen = TOPICS.find((t) => t.id === topic)
        const list = fitting ? causesFittingWeek(app.signedUp) : causesOnTopic(topic).map((cause) => ({ cause }))
        return (
            <div className="home-feed">
                {chips}
                <section className="home-topic-results" key={topic}>
                    <p className="eyebrow">{fitting ? "From your sample timetable" : "Browse by topic"}</p>
                    <h3>{fitting ? "📅 Fits my week" : `${chosen.emoji} ${chosen.label}`}</h3>
                    {fitting && (
                        <p className="home-topic-note">
                            Sessions that fit your free time and don't clash with what you've signed up for.
                            Manage your calendar in{" "}
                            <button onClick={() => app.navigate('profile')}>Profile</button>.
                        </p>
                    )}
                    {list.length === 0 && <p className="home-topic-note">Nothing fits right now. Try another topic.</p>}
                    <div className="home-topic-grid">{list.map(({ cause, note }) => tile(cause, note))}</div>
                </section>
                {calendarModal}
            </div>
        )
    }

    const interest = TOPICS.find((t) => t.id === profile.area)
    const interestCauses = interest ? causesOnTopic(interest.id) : []
    const friendsCauses = causesFriendsAreGoingTo(app.friendIds)
    const nearby = causesNear(profile.region)
    const events = app.events
        .filter((event) => event.status === "approved")
        .sort((a, b) => (a.startsAt < b.startsAt ? -1 : 1))
    const orgRank = (org) => (app.followedOrgIds.includes(org.id) ? 2 : 0) + (org.suits.includes(quizResult) ? 1 : 0)
    const posts = publicPosts({ diary: app.diary, name: profile.name, accessories: app.cow.equipped, trait: quizResult }).slice(0, 8)

    return (
        <div className="home-feed">
            {chips}

            <HomeRow eyebrow={`Matched to your strength: ${traitLabels[quizResult].label}`} title="Causes for you">
                <SurpriseTile onSurprise={app.surpriseMe}/>
                {matchedCauses(quizResult).map((cause) => tile(cause))}
            </HomeRow>

            {friendsCauses.length > 0 && (
                <HomeRow eyebrow="Friends" title="Your friends are going" actionLabel="See friends" onAction={() => app.navigate('friends')}>
                    {friendsCauses.map((cause) => tile(cause))}
                </HomeRow>
            )}

            {interestCauses.length > 1 && (
                <HomeRow eyebrow="Because you picked" title={`${interest.emoji} ${interest.label}`}>
                    {interestCauses.map((cause) => tile(cause))}
                </HomeRow>
            )}

            {nearby.length > 0 && (
                <HomeRow eyebrow={`Around the ${profile.region}`} title="Near you">
                    {nearby.map((cause) => tile(cause))}
                </HomeRow>
            )}

            {events.length > 0 && (
                <HomeRow eyebrow="Events" title="Coming up">
                    {events.map((event) => (
                        <EventTile key={event.id} event={event} cause={causeById(event.causeId)} onOpen={(causeId) => app.openCause(causeId)}/>
                    ))}
                </HomeRow>
            )}

            <HomeRow eyebrow="Social" title="From your friends" actionLabel="Open Social" onAction={() => app.navigate('social')}>
                {posts.map(({ entry, author }) => (
                    <PostTile key={entry.id} entry={entry} author={author} cause={causeById(entry.causeId)} onOpen={() => app.navigate('social')}/>
                ))}
            </HomeRow>

            <HomeRow eyebrow="Outside your usual match" title="Try something different">
                {causesOutsideMatch(quizResult).map((cause) => tile(cause))}
            </HomeRow>

            <HomeRow eyebrow="Who runs your causes" title="Organisations" actionLabel="See all" onAction={() => app.navigate('organisations')}>
                {[...organisations]
                    .sort((a, b) => orgRank(b) - orgRank(a))
                    .map((org) => (
                        <OrgTile
                            key={org.id}
                            org={org}
                            following={app.followedOrgIds.includes(org.id)}
                            onToggleFollow={() => app.toggleFollow(org.id)}
                            onOpen={app.openOrganisation}
                            note={org.suits.includes(quizResult) ? "Suits you" : null}
                        />
                    ))}
            </HomeRow>

            <p className="home-feed-note">
                Causes, sessions, places and people shown here are sample data for the demo.
            </p>
            {calendarModal}
        </div>
    )
}

export default HomeFeed
