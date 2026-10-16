// InstantPhoto.jsx shows a photo like an instant-camera print: a white frame with a
// wider strip at the bottom for a handwritten caption, held on with a piece of tape.
import './InstantPhoto.css'

// { src } and { alt } describe the photo. { caption } is written on the bottom strip.
// { tilt } is "left" or "right", so a page of photos doesn't look too tidy.
function InstantPhoto({ src, alt, caption, tilt = "left" }) {
    return (
        <figure className={`instant-photo instant-photo-${tilt}`}>
            <img src={src} alt={alt}/>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}

export default InstantPhoto
