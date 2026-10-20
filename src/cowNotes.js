import { causes } from './data/causes'
import { KEEPSAKES, TREASURED_VISITS, keepsakesFor } from './data/keepsakes'
import { organisationById, organisationOfCause } from './data/organisations'
import { sampleStudentById } from './data/friends'
import { sampleIncomingInvites, samplePublicEntries } from './data/sampleSocial'
import { STATS } from './data/store'
import { friendsGoingTo, matchedCauses } from './causeRows'
import { goalById, goalProgress } from './goalProgress'
import { joinNames } from './people'
import { upcomingSessions } from './upcoming'

const LOW_STAT = 40

function causeName(id) {
    return causes.find((c) => c.id === id).name
}

function shortDay(startsAt) {
    return new Date(startsAt).toLocaleDateString('en-SG', {
        weekday: 'long', day: 'numeric', month: 'short', timeZone: 'Asia/Singapore',
    })
}

function lower(name) {
    return name.replace(/^A /, 'a ')
}

export function followedCauseIds(app) {
    return [
        ...app.allSignups.map((entry) => entry.causeId),
        ...app.favourites.filter((item) => item.kind === 'cause').map((item) => item.id),
        ...app.followedOrgIds.flatMap((id) => organisationById(id).causeIds),
    ]
}

export function mailbagItems(app) {
    const followed = followedCauseIds(app)
    const news = app.orgUpdates
        .filter((update) => followed.includes(update.causeId))
        .map((update) => ({ id: update.id, kind: 'news', at: update.at, causeId: update.causeId, text: update.text }))
    const thanks = app.thanks
        .filter((item) => item.personId === 'student')
        .map((item) => ({
            id: item.id, kind: 'thanks', at: item.at, causeId: item.causeId,
            text: `Thank you for coming to ${causeName(item.causeId)}, ${app.profile.name}! We'd love to see you again.`,
        }))
    return [...news, ...thanks]
        .map((item) => ({ ...item, org: organisationOfCause(item.causeId) }))
        .sort((a, b) => (a.at < b.at ? 1 : -1))
}

// Things that just happened. Clover always mentions these first, newest first.
function urgentNotes(app) {
    const keepsake = app.newKeepsake
    const needsDiary = app.attendance
        .filter((visit) => visit.source === 'org' && !app.diary.some((entry) => entry.causeId === visit.causeId && entry.at > visit.at))
        .at(-1)
    const keptWithVisit = keepsake && needsDiary && keepsake.causeId === needsDiary.causeId && keepsake.at === needsDiary.at
    const keptLine = keepsake && (keepsake.level === 'treasured'
        ? `Your keepsake from ${causeName(keepsake.causeId)} is treasured now, because you keep coming back!`
        : `I kept ${lower(KEEPSAKES[keepsake.causeId].name)} from ${causeName(keepsake.causeId)}!`)
    const unreadMail = mailbagItems(app).filter((item) => !app.readMail.includes(item.id))
    const invite = sampleIncomingInvites.find((item) => !app.joinedInvites.includes(item.id))
    const approved = app.approvalNews
        .map((id) => app.events.find((event) => event.id === id))
        .filter(Boolean)

    return [
        needsDiary && {
            key: `diary-${needsDiary.id}`, at: needsDiary.at,
            text: `${causeName(needsDiary.causeId)} marked you as attended: +${needsDiary.hours} h and ${needsDiary.moolah} Moolah!${keptWithVisit ? ` ${keptLine}` : ""} How did it go?`,
            action: { label: "Write in my diary", onClick: () => app.startReflection(needsDiary.causeId) },
        },
        keepsake && !keptWithVisit && {
            key: `keepsake-${keepsake.causeId}-${keepsake.level}`, at: keepsake.at, text: `${keptLine} Come and see it in the barn.`,
            action: { label: "Visit the barn", onClick: () => app.navigate('cow') },
        },
        ...unreadMail.map((item) => ({
            key: `mail-${item.id}`, at: item.at,
            text: item.kind === 'thanks'
                ? `Moo! A thank-you card came from ${item.org.name}. They'd love to see you again, ${app.profile.name}.`
                : `Moo! ${item.org.name} sent news about ${causeName(item.causeId)}: "${item.text}"`,
            action: { label: "Open my mailbag", onClick: () => app.navigate('cow') },
        })),
        ...approved.map((event) => ({
            key: `approved-${event.id}`, at: event.approvedAt || '',
            text: `Moo! ${organisationOfCause(event.causeId).name} approved your event "${event.title}"! It's in your Next up.`,
            action: { label: "See it", onClick: () => app.navigate('profile') },
        })),
        invite && {
            key: `invite-${invite.id}`, at: '',
            text: `${sampleStudentById(invite.fromId).name} invited you to ${causeName(invite.causeId)}: "${invite.note}"`,
            action: { label: "See the invite", onClick: () => app.navigate('invites') },
        },
    ].filter(Boolean).sort((a, b) => (a.at < b.at ? 1 : -1))
}

// Personal things worth a mention any day. Clover picks a different one each visit.
function everydayNotes(app) {
    const next = upcomingSessions(app.signedUp)[0]
    const nextFriends = next ? friendsGoingTo(next.cause.id, app.friendIds) : []
    const lowStat = STATS
        .map((stat) => ({ ...stat, value: app.cow.stats[stat.id] }))
        .filter((stat) => stat.value < LOW_STAT)
        .sort((a, b) => a.value - b.value)[0]
    const signedUpCauses = app.signedUp.map((entry) => entry.causeId)
    const savedEvent = app.favourites
        .filter((item) => item.kind === 'event')
        .map((item) => app.events.find((event) => event.id === item.id))
        .find((event) => event && !signedUpCauses.includes(event.causeId))
    const friendPost = samplePublicEntries
        .filter((entry) => app.friendIds.includes(entry.authorId))
        .sort((a, b) => (a.at < b.at ? 1 : -1))[0]
    const almostTreasured = keepsakesFor(app.attendance, app.diary).find((item) => item.level !== 'treasured')
    const goal = goalById(app.profile.goal)
    const progress = goal && goalProgress(goal, app.history)
    const topMatch = matchedCauses(app.quizResult).find((cause) => !app.allSignups.some((entry) => entry.causeId === cause.id))

    return [
        next && {
            key: `next-${next.cause.id}`,
            text: `See you at ${next.cause.name} on ${shortDay(next.signup.startsAt)}?${nextFriends.length ? ` ${joinNames(nextFriends.map((f) => f.name))} ${nextFriends.length === 1 ? "is" : "are"} going too!` : " Tell me all about it after!"}`,
            action: { label: "Session details", onClick: () => app.openCause(next.cause.id) },
        },
        lowStat && {
            key: `care-${lowStat.id}`,
            text: app.basicGrassLeft > 0 && lowStat.id === 'hunger'
                ? `My tummy's rumbling, ${app.profile.name}. You've saved ${app.basicGrassLeft} ${app.basicGrassLeft === 1 ? "handful" : "handfuls"} of grass for me!`
                : `My ${lowStat.label.toLowerCase()} is a bit low this week. A visit to the barn would cheer me up.`,
            action: { label: "Visit the barn", onClick: () => app.navigate('cow') },
        },
        savedEvent && {
            key: `saved-${savedEvent.id}`,
            text: `You saved "${savedEvent.title}" with ${causeName(savedEvent.causeId)}. It's on ${shortDay(savedEvent.startsAt)}. Still keen?`,
            action: { label: "Sign up", onClick: () => app.signUpFor(savedEvent.causeId) },
        },
        friendPost && {
            key: `post-${friendPost.id}`,
            text: `${sampleStudentById(friendPost.authorId).name} wrote about ${causeName(friendPost.causeId)}: "${friendPost.message}"`,
            action: { label: "See Social", onClick: () => app.navigate('social') },
        },
        almostTreasured && {
            key: `treasure-${almostTreasured.cause.id}`,
            text: `${TREASURED_VISITS - almostTreasured.visits} more ${TREASURED_VISITS - almostTreasured.visits === 1 ? "visit" : "visits"} to ${almostTreasured.cause.name} and ${lower(almostTreasured.keepsake.name)} becomes treasured.`,
            action: { label: "Next session", onClick: () => app.openCause(almostTreasured.cause.id) },
        },
        progress && !progress.complete && {
            key: `goal-${goal.id}`,
            text: `You're ${progress.done} of ${progress.target} ${goal.unit} into "${goal.name}". ${goal.reward.moolah} Moolah is waiting at the end!`,
            action: null,
        },
        !next && topMatch && {
            key: `match-${topMatch.id}`,
            text: `${topMatch.name} is one of your best matches, ${app.profile.name}. Fancy giving it a try?`,
            action: { label: "Have a look", onClick: () => app.openCause(topMatch.id) },
        },
    ].filter(Boolean)
}

// Everything Clover could say on Home, most important first.
export function cowNotes(app) {
    const notes = [...urgentNotes(app), ...everydayNotes(app)]
    return notes.length > 0 ? notes : [{ key: 'hello', text: `Hi ${app.profile.name}! Every time you help out, I get a little grass.`, action: null }]
}

// How many of the notes are urgent, so Clover starts with those.
export function urgentCount(app) {
    return urgentNotes(app).length
}
