// linkedinText.js writes a ready-to-paste LinkedIn post from a diary entry.
// It only uses what the student actually wrote and did. Nothing is posted for them:
// the text is copied, and the student pastes it into LinkedIn themselves.

// { entry } is a diary entry. { causeName } is its cause. { hours } is the student's
// total hours with that cause so far.
export function linkedinText(entry, causeName, hours) {
    const lines = [`Volunteering with ${causeName}`]
    if (entry.message) {
        lines.push('', entry.message)
    }
    if (hours > 0) {
        lines.push('', `So far I've given ${hours} ${hours === 1 ? 'hour' : 'hours'} with ${causeName}.`)
    }
    lines.push('', '#volunteering #community #youth')
    return lines.join('\n')
}
