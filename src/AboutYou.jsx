// AboutYou.jsx asks four optional questions before the quiz, one per page,
// including which goal to work towards. The farmer asks them inside the barn.
// Every question can be skipped.
import { useState } from 'react'
import { goals } from './data/goals'
import FarmerScene from './FarmerScene'
import StoryDots from './StoryDots'
import './AboutYou.css'

const GOAL_ICONS = { "try-new": "🧭", regular: "📅", people: "👫", deeper: "🌱", story: "📔" }

// The goal question offers each goal, plus "Not sure yet", which saves as no goal ('').
// It has its own value so that nothing is ticked before the student chooses.
const GOAL_OPTIONS = [
    ...goals.map((goal) => ({ value: goal.id, label: goal.name, hint: goal.description, icon: GOAL_ICONS[goal.id] })),
    { value: "not-sure", label: "Not sure yet", hint: "Pick one later from Home.", icon: "🤔" },
]

const QUESTIONS = [
    {
        id: "goal",
        label: "Pick a goal to work towards",
        hint: "You can change it any time.",
        options: GOAL_OPTIONS,
        layout: "cards",
    },
    {
        id: "area",
        label: "Which area interests you most?",
        options: [
            { value: "Animals", label: "Animals", icon: "🐾" },
            { value: "Older people", label: "Older people", icon: "🧓" },
            { value: "Environment", label: "Environment", icon: "🌿" },
            { value: "Young people and learning", label: "Young people and learning", icon: "📚" },
            { value: "Making and fixing", label: "Making and fixing", icon: "🔧" },
            { value: "Not sure yet", label: "Not sure yet", icon: "🤔" },
        ],
        layout: "tiles",
    },
    {
        id: "ageGroup",
        label: "Which age group are you in?",
        options: ["Under 16", "16 to 18", "19 to 25", "26 and over", "Prefer not to say"],
    },
    {
        id: "region",
        label: "Which part of Singapore are you in?",
        hint: "Used to show how far each session is.",
        options: ["North", "North-East", "East", "West", "Central", "Prefer not to say"],
    },
]

// Plain text options use the same text for their value and label.
function toOption(option) {
    return typeof option === "string" ? { value: option, label: option } : option
}

// { profile } holds any earlier answers, so they show again on a return visit.
// { onDone } receives the answers when the student continues or skips.
function AboutYou({ profile, onDone }) {
    const [answers, setAnswers] = useState(profile)
    // Which question is showing, counting from 0.
    const [step, setStep] = useState(0)

    const question = QUESTIONS[step]
    const isLast = step === QUESTIONS.length - 1

    function handleChange(questionId, value) {
        setAnswers({ ...answers, [questionId]: value })
    }

    // "Not sure yet" means no goal, which is stored as ''.
    function finish(finalAnswers) {
        onDone({ ...finalAnswers, goal: finalAnswers.goal === "not-sure" ? "" : finalAnswers.goal })
    }

    // Moves to the next question, or finishes after the last one.
    function goNext(nextAnswers) {
        if (isLast) {
            finish(nextAnswers)
        }
        else {
            setStep(step + 1)
        }
    }

    // Skip leaves this question unanswered, then moves on.
    function handleSkip() {
        const skipped = { ...answers, [question.id]: "" }
        setAnswers(skipped)
        goNext(skipped)
    }

    return (
        <FarmerScene bubbleKey={question.id} centred>
            <StoryDots total={QUESTIONS.length} current={step} label="Question"/>

            {step === 0 && (
                <p className="about-greeting">
                    Nice to meet you{profile.name ? `, ${profile.name}` : ""}! A few quick questions
                    so I can suggest causes near you.
                </p>
            )}

            {/* key makes React draw a fresh question each step, so the right options show. */}
            <fieldset className="about-question" key={question.id}>
                <legend className="farmer-question">{question.label}</legend>
                {question.hint && <p className="about-hint">{question.hint}</p>}
                <div className={`about-options about-options-${question.layout || "pills"}`}>
                    {question.options.map(toOption).map((option) => (
                        <label className="about-option" key={option.value}>
                            <input
                                className="visually-hidden"
                                type="radio"
                                name={question.id}
                                value={option.value}
                                checked={answers[question.id] === option.value}
                                onChange={() => handleChange(question.id, option.value)}
                            />
                            {option.icon && <span className="about-option-icon" aria-hidden="true">{option.icon}</span>}
                            <span className="about-option-label">{option.label}</span>
                            {option.hint && <small>{option.hint}</small>}
                        </label>
                    ))}
                </div>
            </fieldset>

            <div className="about-buttons">
                {step > 0 && <button className="farmer-back" onClick={() => setStep(step - 1)}>← Back</button>}
                <button className="button-primary" onClick={() => goNext(answers)}>
                    {isLast ? "Start the story" : "Next"}
                </button>
            </div>
            <button className="about-skip" onClick={handleSkip}>Skip this question</button>
        </FarmerScene>
    )
}

export default AboutYou
