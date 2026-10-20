// ProfileSettings.jsx is the Settings card on Profile. It sums up the student's choices,
// and opens a pop-up with the calendar, privacy switches and account options.
import { useState } from 'react'
import Graphic from './Graphic'
import Modal from './Modal'
import CalendarConnect from './CalendarConnect'
import PrivacySettings from './PrivacySettings'
import DemoTools from './DemoTools'
import './ProfileSettings.css'

const PRIVACY_COUNT = 3

function ProfileSettings({ calendarConnected, onConnectCalendar, onDisconnectCalendar, settings, onSettingsChange, onRetakeStory, onResetDemo, onLogOut }) {
    const [open, setOpen] = useState(false)
    const sharing = ["showTitles", "publicDiary", "showOnLeaderboard"].filter((id) => settings[id]).length

    return (
        <section className="card profile-settings">
            <h3><Graphic symbol="lock"/> Settings</h3>
            <ul className="profile-settings-summary">
                <li><span>Calendar</span><strong>{calendarConnected ? "Connected" : "Not connected"}</strong></li>
                <li><span>Privacy</span><strong>{sharing === 0 ? "Everything private" : `Sharing ${sharing} of ${PRIVACY_COUNT}`}</strong></li>
            </ul>
            <div className="profile-settings-buttons">
                <button className="profile-settings-open" onClick={() => setOpen(true)}>Open settings</button>
                <button className="profile-settings-logout" onClick={onLogOut}>Log out</button>
            </div>

            {open && (
                <Modal eyebrow="Profile" title="Settings" wide onClose={() => setOpen(false)}>
                    <div className="profile-settings-body">
                        <CalendarConnect connected={calendarConnected} onConnect={onConnectCalendar} onDisconnect={onDisconnectCalendar}/>
                        <PrivacySettings settings={settings} onChange={onSettingsChange}/>
                        <DemoTools onRetakeStory={onRetakeStory} onResetDemo={onResetDemo}/>
                    </div>
                    <div className="modal-buttons">
                        <button className="button-primary" onClick={() => setOpen(false)}>Done</button>
                    </div>
                </Modal>
            )}
        </section>
    )
}

export default ProfileSettings
