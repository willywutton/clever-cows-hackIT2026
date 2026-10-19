import { useState } from 'react'
import { causes } from './data/causes'
import { sampleStudentById } from './data/friends'
import { samplePublicEntries } from './data/sampleSocial'
import { traitLabels } from './data/traits'
import {
    TOPICS, causesFriendsAreGoingTo, causesNear, causesOnTopic, causesOutsideMatch, friendsGoingTo, matchedCards,
} from './causeRows'
import HomeRow from './HomeRow'
import CauseTile from './CauseTile'
import EventTile from './EventTile'
import PostTile from './PostTile'
import './HomeFeed.css'

function causeById(id) {
    return causes.find((cause) => cause.id === id)
}

function HomeFeed({ app }) {
    const [topic, setTopic] = useState("all")
    const { profile, quizResult } = app

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

    const chips = (
        <div className="home-topics" role="group" aria-label="Browse causes by topic">
            <button aria-pressed={topic === "all"} onClick={() => setTopic("all")}>
                <span aria-hidden="true">✨</span> For you
            </button>
            {TOPICS.map((t) => (
                <button key={t.id} aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}>
                    <span aria-hidden="true">{t.emoji}</span> {t.label}
                </button>
            ))}
        </div>
    )

    if (topic !== "all") {
        const chosen = TOPICS.find((t) => t.id === topic)
        const list = causesOnTopic(topic)
        return (
            <div className="home-feed">
                {chips}
                <section className="home-topic-results" key={topic}>
                    <p className="eyebrow">Browse by topic</p>
                    <h3>{chosen.emoji} {chosen.label}</h3>
                    <div className="home-topic-grid">{list.map((cause) => tile(cause))}</div>
                </section>
            </div>
        )
    }

    const matched = matchedCards(quizResult, app.signedUp, app.fitsMyWeek)
    const interest = TOPICS.find((t) => t.id === profile.area)
    const interestCauses = interest ? causesOnTopic(interest.id) : []
    const friendsCauses = causesFriendsAreGoingTo(app.friendIds)
    const nearby = causesNear(profile.region)
    const events = app.events
        .filter((event) => event.status === "approved")
        .sort((a, b) => (a.startsAt < b.startsAt ? -1 : 1))
    const myPosts = app.diary
        .filter((entry) => entry.isPublic)
        .map((entry) => ({ entry, author: { name: `${profile.name} (you)`, accessories: app.cow.equipped, sample: false } }))
    const samplePosts = samplePublicEntries.map((entry) => {
        const student = sampleStudentById(entry.authorId)
        return { entry, author: { name: student.name, accessories: student.accessories, sample: true } }
    })
    const posts = [...myPosts, ...samplePosts].sort((a, b) => (a.entry.at < b.entry.at ? 1 : -1)).slice(0, 8)

    return (
        <div className="home-feed">
            {chips}

            {matched.length > 0 ? (
                <HomeRow
                    eyebrow={`Matched to your strength: ${traitLabels[quizResult].label}`}
                    title="Causes for you"
                    actionLabel={app.fitsMyWeek ? "Show all" : null}
                    onAction={() => app.setFitsMyWeek(false)}
                >
                    {matched.map(({ cause, note }) => tile(cause, note))}
                </HomeRow>
            ) : (
                <section className="home-feed-empty">
                    <h3>Causes for you</h3>
                    <p>None of these sessions fit your sample week right now.</p>
                    <button onClick={() => app.setFitsMyWeek(false)}>Show all causes</button>
                </section>
            )}

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

            <HomeRow eyebrow="Social" title="From the herd" actionLabel="Open Social" onAction={() => app.navigate('social')}>
                {posts.map(({ entry, author }) => (
                    <PostTile key={entry.id} entry={entry} author={author} cause={causeById(entry.causeId)} onOpen={() => app.navigate('social')}/>
                ))}
            </HomeRow>

            <HomeRow eyebrow="Outside your usual match" title="Try something different" actionLabel="🎲 Surprise me" onAction={app.surpriseMe}>
                {causesOutsideMatch(quizResult).map((cause) => tile(cause))}
            </HomeRow>

            <p className="home-feed-note">
                Causes, sessions, places and people shown here are sample data for the demo.
            </p>
        </div>
    )
}

export default HomeFeed
