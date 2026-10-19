// storage.js keeps the demo's data in the browser's localStorage, so it survives a refresh.
// Every read and write is wrapped in try/catch: some browsers block storage
// (e.g. private windows), and the app should still work, just without saving.

const PREFIX = 'clever-cows:'

export function loadValue(key, fallback) {
    try {
        const saved = localStorage.getItem(PREFIX + key)
        return saved === null ? fallback : JSON.parse(saved)
    } catch {
        return fallback
    }
}

export function saveValue(key, value) {
    try {
        localStorage.setItem(PREFIX + key, JSON.stringify(value))
    } catch {
        // Storage is blocked or full. The app keeps working until the page is closed.
    }
}

// Removes everything this app saved, for the "Reset demo" button.
export function clearAll() {
    try {
        Object.keys(localStorage)
            .filter((key) => key.startsWith(PREFIX))
            .forEach((key) => localStorage.removeItem(key))
    } catch {
        // Nothing to clear if storage is blocked.
    }
}
