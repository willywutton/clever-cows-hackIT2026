// imageFile.js turns a picture the student picks into a small text version (a "data URL")
// that can be saved with the rest of the demo, so it still shows after a refresh.
// Pictures are shrunk first, because browser storage only holds a few megabytes.
// The picture never leaves the student's device.

const MAX_SIZE = 640
const QUALITY = 0.75

export function readImageFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = () => reject(reader.error)
        reader.onload = () => {
            const image = new Image()
            image.onerror = () => reject(new Error("That file isn't a picture we can read."))
            image.onload = () => {
                const scale = Math.min(1, MAX_SIZE / Math.max(image.width, image.height))
                const canvas = document.createElement('canvas')
                canvas.width = Math.round(image.width * scale)
                canvas.height = Math.round(image.height * scale)
                canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
                resolve(canvas.toDataURL('image/jpeg', QUALITY))
            }
            image.src = reader.result
        }
        reader.readAsDataURL(file)
    })
}
