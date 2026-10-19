// App.jsx is the top of the app. It gets everything the app remembers from
// useCleverCows (see src/state), decides which screen to show, and places it
// inside the page layout: the top bar, and the side menu once the story is done.
// It also switches between the student view and the mock organisation view.
import { useCleverCows } from './state/useCleverCows'
import Welcome from './Welcome'
import AboutYou from './AboutYou'
import StoryCover from './StoryCover'
import Quiz from './Quiz'
import MatchFeed from './MatchFeed'
import CausePage from './CausePage'
import SignUp from './SignUp'
import SignupDone from './SignupDone'
import CloverCowdini from './CloverCowdini'
import OrgView from './org/OrgView'
import SiteHeader from './SiteHeader'
import AppShell from './AppShell'
import HomeLayout from './HomeLayout'
import Profile from './Profile'
import HomeNextUp from './HomeNextUp'
import Reflection from './Reflection'
import CalendarConnect from './CalendarConnect'
import GoalCard from './GoalCard'
import GoalComplete from './GoalComplete'
import DiaryPage from './DiaryPage'
import PortfolioPrint from './PortfolioPrint'
import CowPage from './CowPage'
import FriendsPage from './FriendsPage'
import FriendProfile from './FriendProfile'
import SocialPage from './SocialPage'
import FavouritesPage from './FavouritesPage'
import SavedReminder from './SavedReminder'
import HostEventPage from './HostEventPage'
import CauseNews from './CauseNews'
import PageTitle from './PageTitle'
import { causes } from './data/causes'

// The story's character to use when "Skip story" is pressed on demo day.
const SKIP_STORY_TRAIT = 'Heart'

function App() {
  const app = useCleverCows()
  const { screen, navigate } = app
  const openCause = causes.find((cause) => cause.id === app.openCauseId)

  // Pick what to draw for the current screen.
  let content
  if (screen === 'welcome') {
    content = <Welcome onStart={app.finishWelcome}/>
  }
  else if (screen === 'about') {
    content = <AboutYou profile={app.profile} onDone={app.finishAboutYou}/>
  }
  else if (screen === 'cover') {
    content = (
      <StoryCover
        name={app.profile.name}
        onBegin={() => navigate('quiz')}
        onSkip={() => app.finishStory(SKIP_STORY_TRAIT)}
      />
    )
  }
  else if (screen === 'quiz') {
    // whenDone is a "prop": a value handed down to the Quiz component.
    // Here we hand it a function so Quiz can report back when it's finished.
    content = <Quiz whenDone={app.finishStory}/>
  }
  else if (screen === 'home' && app.justFinishedGoal) {
    // A goal was just finished, so thank the student before showing Home.
    content = (
      <GoalComplete
        key={app.justFinishedGoal}
        goalId={app.justFinishedGoal}
        history={app.history}
        finishedIds={app.finishedGoalIds}
        onChoose={app.chooseNextGoal}
        onTakeBreak={() => app.chooseNextGoal('')}
      />
    )
  }
  else if (screen === 'home') {
    // <> and </> group several components together without adding an extra box around them.
    content = (
      <HomeLayout
        side={
          <>
            <HomeNextUp signedUp={app.signedUp} onSeeAll={() => navigate('profile')}/>
            <SavedReminder
              events={app.events}
              favourites={app.favourites}
              signedUp={app.signedUp}
              onSignUp={app.signUpFor}
              onOpenFavourites={() => navigate('favourites')}
            />
            <CauseNews
              updates={app.orgUpdates}
              causeIds={[
                ...app.signedUp.map((entry) => entry.causeId),
                ...app.favourites.filter((item) => item.kind === 'cause').map((item) => item.id),
              ]}
            />
            <GoalCard
              goalId={app.profile.goal}
              history={app.history}
              finishedIds={app.finishedGoalIds}
              onGoalChange={app.changeGoal}
            />
            <CloverCowdini
              grass={app.grass}
              recentFeeds={app.recentFeeds}
              onReactionDone={app.clearRecentFeeds}
              onVisit={() => navigate('cow')}
            />
            <CalendarConnect
              connected={app.calendarConnected}
              fitsMyWeek={app.fitsMyWeek}
              onConnect={() => app.setCalendarConnected(true)}
              onDisconnect={app.disconnectCalendar}
              onFitsChange={app.setFitsMyWeek}
            />
          </>
        }
        main={
          <MatchFeed
            result={app.quizResult}
            onOpenCause={(causeId) => app.openCause(causeId)}
            fitsMyWeek={app.fitsMyWeek}
            onShowAll={() => app.setFitsMyWeek(false)}
            signedUp={app.signedUp}
            userRegion={app.profile.region}
          />
        }
      />
    )
  }
  else if (screen === 'cause') {
    // key makes React start a fresh page (with no old messages) for each cause.
    content = (
      <CausePage
        key={openCause.id}
        cause={openCause}
        surprise={app.openedBySurprise}
        events={app.events.filter((event) => event.causeId === openCause.id)}
        updates={app.orgUpdates.filter((update) => update.causeId === openCause.id)}
        isSignedUp={app.signedUp.some((item) => item.causeId === openCause.id)}
        userRegion={app.profile.region}
        isFavourite={app.isFavourite}
        onToggleFavourite={app.toggleFavourite}
        friendIds={app.friendIds}
        onInvite={app.inviteFriends}
        onSignUp={() => navigate('signup')}
        onAction={app.recordAction}
        onBack={() => navigate('home')}
      />
    )
  }
  else if (screen === 'signup') {
    content = (
      <SignUp
        cause={openCause}
        existing={app.signedUp.find((item) => item.causeId === openCause.id) || null}
        userRegion={app.profile.region}
        myFriendIds={app.friendIds}
        visitsSoFar={app.attendance.filter((visit) => visit.causeId === openCause.id).length}
        onAddFriend={app.addFriend}
        onConfirm={app.confirmSignup}
        onBack={() => navigate('cause')}
      />
    )
  }
  else if (screen === 'signup-done') {
    content = (
      <SignupDone
        cause={openCause}
        entry={app.signedUp.find((item) => item.causeId === openCause.id)}
        userRegion={app.profile.region}
        onCalendarAnswered={() => app.answerCalendarPrompt(openCause.id)}
        onHome={() => navigate('home')}
        onBackToCause={() => navigate('cause')}
      />
    )
  }
  else if (screen === 'reflection') {
    content = (
      <Reflection
        cause={openCause}
        publicByDefault={app.settings.publicDiary}
        visit={app.lastVisit}
        onSave={app.saveReflection}
        onCancel={() => navigate('diary')}
      />
    )
  }
  else if (screen === 'profile') {
    content = (
      <Profile
        quizResult={app.quizResult}
        profile={app.profile}
        onNameChange={(name) => app.setProfile((prev) => ({ ...prev, name }))}
        onAboutChange={(about) => app.setProfile((prev) => ({ ...prev, about }))}
        onGoalChange={app.changeGoal}
        moolah={app.moolah}
        accessories={app.cow.equipped}
        onReflect={app.wentToSession}
        signedUp={app.signedUp}
        history={app.history}
        diary={app.diary}
        settings={app.settings}
        onSettingsChange={app.setSettings}
        onRetakeStory={app.retakeStory}
        onResetDemo={app.resetDemo}
        portfolio={app.portfolio}
        hoursWorked={app.hoursWorked}
        onOpenPortfolio={() => navigate('portfolio')}
      />
    )
  }
  else if (screen === 'friends') {
    content = <FriendsPage app={app}/>
  }
  else if (screen === 'friend') {
    content = (
      <FriendProfile
        key={app.viewingFriendId}
        friendId={app.viewingFriendId}
        onBack={() => navigate('friends')}
        onChat={app.openChat}
      />
    )
  }
  else if (screen === 'social') {
    content = <SocialPage app={app}/>
  }
  else if (screen === 'favourites') {
    content = <FavouritesPage app={app}/>
  }
  else if (screen === 'cow') {
    content = <CowPage app={app}/>
  }
  else if (screen === 'diary') {
    content = <DiaryPage app={app}/>
  }
  else if (screen === 'portfolio') {
    content = (
      <PortfolioPrint
        name={app.profile.name}
        quizResult={app.quizResult}
        hoursWorked={app.hoursWorked}
        diary={app.diary}
        portfolio={app.portfolio}
        onBack={() => navigate('profile')}
      />
    )
  }
  else if (screen === 'host') {
    content = <HostEventPage events={app.events} onHost={app.hostEvent}/>
  }
  else {
    content = <PageTitle title="Page not found" subtitle="Use the menu to go back to Home."/>
  }

  // The menu and student bar appear once there is a character to build on.
  const signedIn = app.quizResult !== null && !['welcome', 'about', 'cover', 'quiz'].includes(screen)

  // Reading and form screens stay a comfortable width in the middle.
  const narrowScreens = ['about', 'cause', 'signup', 'signup-done', 'reflection']
  const studentPage = (
    <div className={narrowScreens.includes(screen) ? 'page-narrow' : undefined}>{content}</div>
  )

  return (
    <>
      <SiteHeader
        view={app.view}
        onViewChange={app.setView}
        signedIn={signedIn}
        name={app.profile.name}
        moolah={app.moolah}
        onSurprise={app.surpriseMe}
        onLogo={() => navigate('home')}
      />

      {/* Both views stay on the page and the other one is just hidden.
          This way switching back and forth doesn't lose progress in either. */}
      {/* On the Welcome screen the space around the page becomes a barn wall (see Welcome.css). */}
      <main className={app.view === 'student' && screen === 'welcome' ? 'barn-wall' : undefined}>
        <div className="page">
          <div hidden={app.view !== 'student'}>
            {signedIn
              ? <AppShell screen={screen} onNavigate={navigate}>{studentPage}</AppShell>
              : studentPage}
          </div>
          <div hidden={app.view !== 'organisation'} className="page-narrow">
            <OrgView app={app}/>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
