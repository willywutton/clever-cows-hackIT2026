// AboutYou.jsx asks four optional questions before the quiz, one per page,
// including which goal to work towards. The farmer asks them inside the barn.
// Every question can be skipped.
import { useState } from 'react'
import { goals } from './data/goals'
import FarmerScene from './FarmerScene'
import StoryDots from './StoryDots'
import './AboutYou.css'

// The goal question offers each goal, plus "Not sure yet", which saves as no goal ('').
// It has its own value so that nothing is ticked before the student chooses.
const GOAL_OPTIONS = [
    ...goals.map((goal) => ({ value: goal.id, label: goal.name, hint: goal.description })),
    { value: "not-sure", label: "Not sure yet" },
]

const QUESTIONS = [
    {
        id: "goal",
        label: "Pick a goal to work towards (you can change it any time)",
        options: GOAL_OPTIONS,
        stacked: true,
    },
    {
        id: "area",
        label: "Which area interests you most?",
        options: ["Animals", "Older people", "Environment", "Young people and learning", "Making and fixing", "Not sure yet"],
    },
    {
        id: "ageGroup",
        label: "Which age group are you in?",
        options: ["Under 16", "16 to 18", "19 to 25", "26 and over", "Prefer not to say"],
    },
    {
        id: "region",
        label: "Which part of Singapore are you in?",
        options: ["North", "North-East", "East", "West", "Central", "Prefer not to say"],
    },
]

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

    // Plain text options use the same text for their value and label.
    function toOption(option) {
        return typeof option === "string" ? { value: option, label: option } : option
    }

    return (
        <FarmerScene bubbleKey={question.id} centred>
            <p className="about-kicker">About you · Question {step + 1} of {QUESTIONS.length}</p>
            {step === 0 && (
                <p className="about-intro">
                    Nice to meet you{profile.name ? `, ${profile.name}` : ""}! A few quick questions so I can
                    suggest causes and show sessions near you. You can skip any of them.
                </p>
            )}

            {/* key makes React draw a fresh question each step, so the right options show. */}
            <fieldset className="about-question" key={question.id}>
                <legend className="farmer-line">{question.label}</legend>
                <div className={question.stacked ? "about-options about-options-stacked" : "about-options"}>
                    {question.options.map(toOption).map((option) => (
                        <label className="about-option" key={option.value}>
                            <input
                                type="radio"
                                name={question.id}
                                value={option.value}
                                checked={answers[question.id] === option.value}
                                onChange={() => handleChange(question.id, option.value)}
                            />
                            <span>
                                {option.label}
                                {option.hint && <small>{option.hint}</small>}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <StoryDots total={QUESTIONS.length} current={step} label="Question"/>
            <div className="about-buttons">
                {step > 0
                    ? <button className="about-back" onClick={() => setStep(step - 1)}>← Back</button>
                    : <span/>}
                <div className="about-buttons-right">
                    <button className="about-skip" onClick={handleSkip}>Skip</button>
                    <button className="button-primary" onClick={() => goNext(answers)}>
                        {isLast ? "Start the story" : "Next"}
                    </button>
                </div>
            </div>
        </FarmerScene>
    )
}

export default AboutYou
