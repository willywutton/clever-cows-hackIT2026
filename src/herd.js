import { causes } from './data/causes'
import { sampleStudentById, sampleStudents } from './data/friends'
import { sampleOrgPosts, samplePublicEntries } from './data/sampleSocial'
import { organisationById, organisationOfCause } from './data/organisations'
import { CHARACTERS } from './assets/characters'

export function publicPosts({ diary, name, accessories, trait }) {
    const face = CHARACTERS[trait]?.head
    const mine = diary
        .filter((entry) => entry.isPublic)
        .map((entry) => ({ entry, author: { name: `${name} (you)`, accessories: face ? [] : accessories, face, sample: false }, baseLikes: 0 }))
    const samples = samplePublicEntries.map((entry) => {
        const student = sampleStudentById(entry.authorId)
        return { entry, author: { name: student.name, accessories: student.accessories, sample: true }, baseLikes: entry.likes }
    })
    return [...mine, ...samples].sort((a, b) => (a.entry.at < b.entry.at ? 1 : -1))
}

export function suggestedFriends({ friendIds, signedUp, trait }) {
    const myCauses = signedUp.map((entry) => entry.causeId)
    return sampleStudents
        .filter((student) => !friendIds.includes(student.id))
        .map((student) => {
            const shared = student.goingTo.find((id) => myCauses.includes(id))
            const matching = student.goingTo.find((id) => causes.find((c) => c.id === id).identity.includes(trait))
            const causeId = shared || matching || student.goingTo[0]
            const causeName = causes.find((c) => c.id === causeId).name
            const reason = shared
                ? `Also going to ${causeName}`
                : matching ? `Goes to ${causeName}, one of your matches` : `Goes to ${causeName}`
            const mutual = sampleStudents.filter((s) => friendIds.includes(s.id) && s.goingTo.some((id) => student.goingTo.includes(id)))
            return { student, reason, score: (shared ? 3 : 0) + (matching ? 2 : 0) + mutual.length, mutual }
        })
        .sort((a, b) => b.score - a.score)
}

export function organisationPosts(orgUpdates) {
    const real = orgUpdates.map((update) => ({
        id: update.id, org: organisationOfCause(update.causeId), causeId: update.causeId,
        text: update.text, at: update.at, likes: 0, sample: false,
    }))
    const samples = sampleOrgPosts.map((post) => ({ ...post, org: organisationById(post.orgId), sample: true }))
    return [...real, ...samples].sort((a, b) => (a.at < b.at ? 1 : -1))
}
