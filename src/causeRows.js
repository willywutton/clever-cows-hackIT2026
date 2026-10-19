import { causes } from './data/causes'
import { sampleStudents } from './data/friends'
import { sampleSignupsFor } from './data/signups'
import { clashesWith, describeSlot, findFreeSlot } from './freeTime'
import { goingIds } from './people'
import { travelLabel } from './travel'

export const TOPICS = [
    { id: "Animals", label: "Animals", emoji: "🐾" },
    { id: "Older people", label: "Older people", emoji: "🧓" },
    { id: "Environment", label: "Environment", emoji: "🌿" },
    { id: "Young people and learning", label: "Young people", emoji: "📚" },
    { id: "Making and fixing", label: "Making & fixing", emoji: "🔧" },
    { id: "Neighbourhood", label: "Neighbourhood", emoji: "🏘️" },
]

export function sessionOf(cause) {
    return cause.actions.find((action) => action.type === "signup")
}

export function spotsFor(cause, entry) {
    const session = sessionOf(cause)
    const yours = entry ? goingIds(entry).length : 0
    return {
        going: Math.min(session.spots, sampleSignupsFor(cause.id).length + yours),
        total: session.spots,
    }
}

export function friendsGoingTo(causeId, friendIds) {
    return sampleStudents.filter((student) => friendIds.includes(student.id) && student.goingTo.includes(causeId))
}

export function matchedCards(trait, signedUp, fitsMyWeek) {
    const cards = causes
        .filter((cause) => cause.identity.includes(trait))
        .map((cause) => {
            const isSignedUp = signedUp.some((entry) => entry.causeId === cause.id)
            const freeSlot = findFreeSlot(sessionOf(cause))
            const clashes = signedUp.some((entry) => {
                if (entry.causeId === cause.id) {
                    return false
                }
                const other = sessionOf(causes.find((c) => c.id === entry.causeId))
                return clashesWith(sessionOf(cause), other, entry.weekly)
            })
            return { cause, isSignedUp, freeSlot, clashes }
        })

    if (!fitsMyWeek) {
        return cards.map(({ cause }) => ({ cause }))
    }
    return cards
        .filter((card) => card.isSignedUp || (card.freeSlot && !card.clashes))
        .map((card) => ({
            cause: card.cause,
            note: card.isSignedUp ? null : `Fits your week: free ${describeSlot(card.freeSlot)}`,
        }))
}

export function causesFriendsAreGoingTo(friendIds) {
    return causes.filter((cause) => friendsGoingTo(cause.id, friendIds).length > 0)
}

const NEARNESS = { "very-near": 0, "not-far": 1 }

export function causesNear(region) {
    return causes
        .map((cause) => ({ cause, travel: travelLabel(region, sessionOf(cause).region) }))
        .filter(({ travel }) => travel && travel.level in NEARNESS)
        .sort((a, b) => NEARNESS[a.travel.level] - NEARNESS[b.travel.level])
        .map(({ cause }) => cause)
}

export function causesOnTopic(topic) {
    return causes.filter((cause) => cause.topic === topic)
}

export function causesOutsideMatch(trait) {
    return causes.filter((cause) => !cause.identity.includes(trait))
}
