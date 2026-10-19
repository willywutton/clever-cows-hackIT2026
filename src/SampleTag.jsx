// SampleTag.jsx is the small "Sample" label shown on anything made up for the demo,
// so no one mistakes sample people, numbers or messages for real ones.
import './SampleTag.css'

// { text } changes the wording, e.g. "Sample reply".
function SampleTag({ text = "Sample" }) {
    return <span className="sample-tag">{text}</span>
}

export default SampleTag
