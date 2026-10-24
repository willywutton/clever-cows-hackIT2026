# Moomunity 🐄

**Find out how you like to help, and a reason to come back.**

Moomunity is a web app that helps students discover how they like to volunteer, sign up in a way that fits their life, and stay connected to the organisations they help. Organisations get a simple way to thank volunteers and see who came back.

Built by team **Clever Cows** for **HackIT 2026**, on the problem statement *Personalising the Giving Journey* (NCSS / Community Chest).

---

## Why we built it

Many students volunteer once and never return. Usually they do care. What's missing is a cause that feels like theirs, a friend to go with, a schedule that fits, and any word afterwards about what their help changed.

Moomunity turns that into one loop:

**discover yourself → find a fit → go together → hear back → remember it → come back**

## Features

### For students

- **Story-based discovery.** *The Day Mooville Needed You* is an 8-scene story where each choice reflects how you'd help. You become one of four helper types: **Guardian** (empathy), **Architect** (planning), **Anchor** (bringing people together) or **Builder** (hands-on), each with its own cow and a strengths breakdown.
- **A personal Home.** Causes matched to your helper type, topics you picked, causes near you, what friends are doing, and organisations that suit you. **Surprise me** always shows something outside your match.
- **Flexible sign-ups.**
  - Just once, for a set number of weeks (2 to 8), or every week, with a dated diagram of the sessions you're signing up for.
  - Go alone, with friends, or as a **relay group** that shares one weekly spot and takes turns, with a rota showing who goes each week.
  - The app checks your group against the places left and explains what to change if it doesn't fit.
  - **Fits my week** shows only sessions that fit your free time.
  - Add sessions to Google Calendar or download a calendar file.
- **Social.** Invite friends, see who's going, a feed of friends' diary pages and organisation posts, chat, friend suggestions and an opt-in leaderboard.
- **Clover the cow.**
  - When an organisation confirms you attended, Clover tells you and keeps a **keepsake** from that place. It becomes **treasured** on your third visit.
  - Organisation updates and thank-you notes arrive in **Clover's mailbag**.
  - Clover's messages point you to your next step: a new keepsake, an invite, an upcoming session or goal progress.
- **Diary and portfolio.** Turn each session into a page with words, a photo and stickers (private by default), then build a printable portfolio or copy a LinkedIn write-up.
- **Host your own event.** Propose an event to an organisation's programme, set how many people you need, and invite friends to co-host.
- **Rewards from showing up.** **Moolah** is earned only by helping and grows when you return to the same cause (10, then 15, then 20). Goals show their rewards upfront. **Donating is always optional and never earns anything.**

### For organisations

- An **overview of all programmes**, leading with how many first-time volunteers **came back**.
- A **to-do list**, e.g. "2 first-time volunteers waiting for a thank-you".
- One-tap **Mark attended** and **Say thanks** for each volunteer.
- **Helper-type tips** for placing volunteers in roles that suit them.
- **Approve student-proposed events**, and **add events** with a date, start time and duration.
- **Post updates** with a live preview of what Clover will tell students.

### Privacy and accessibility

- First name only, and every onboarding question can be skipped.
- Diary entries are private by default; titles and the leaderboard are opt-in.
- Works at phone width, with keyboard and screen-reader support and reduced motion.

## Try it

1. Open the app and click **Get started**. Enter a first name, skip or answer the questions, then play the story (or skip it).
2. On Home, open a cause such as **Golden Years Club** and click **Sign up**. Try a relay group with friends.
3. Log out from the sidebar, then choose **Organisation log in** on the welcome page and pick **Silver Threads Community**. Mark the student as attended, say thanks, and post an update.
4. Log out and choose **Continue as** your student. Clover has news, and the **Cow** tab shows the new keepsake and the letter in the mailbag.

To start over, use **Start fresh** on the welcome page.

## Getting started

You need [Node.js](https://nodejs.org/) 20.19 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints (usually http://localhost:5173).

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the app with live reload |
| `npm run build` | Builds the app into `dist/` |
| `npm run preview` | Serves the built app locally |
| `npm run lint` | Checks the code with ESLint |

## How it's built

- **React 19 + Vite**, in JavaScript. About 100 small components, each with its own stylesheet.
- **One custom hook** ([src/state/useCleverCows.js](src/state/useCleverCows.js)) holds all the app's state and saves it to the browser's local storage. The student and organisation sides share it, so an action on one side shows up on the other straight away.
- **Derived, not duplicated.** Goals, titles, keepsakes and organisation stats are worked out from the student's history each time, so they can't drift out of sync.
- **No backend yet.** Organisations, causes, people and sessions are demonstration data in [src/data/](src/data/). Nothing leaves the browser.

### Project layout

```
src/
  App.jsx            screens and navigation
  state/             the app's state hook and local storage helpers
  data/              demonstration causes, organisations, people, keepsakes, goals and more
  org/               the organisation side (overview, volunteers, events, updates)
  assets/            cow art, characters and icons
  *.jsx + *.css      one component per file, each with its own stylesheet
  *.js               helpers: calendar export, free-time matching, sign-up wording and more
```

## What's next

- A pilot with a student group and one or two organisations, measuring second visits within 60 days and coordinator time saved.
- Real organisations and listings in place of the demonstration data.
- Organisation-confirmed hours for school records, per-programme settings and simple impact reports.
- A proper backend: accounts, a secure database, notifications and calendar syncing.
- Stronger safety for under-18 users, such as parental consent.

## Team

Made with care by **Clever Cows** for HackIT 2026.
