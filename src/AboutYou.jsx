// AboutYou.jsx asks four optional questions before the quiz, including which goal to work towards.
// Every question can be left blank, and the whole screen can be skipped.
import { useState } from 'react'
import { goals } from './data/goals'
import './AboutYou.css'

// The goal question offers each goal, plus "Not sure yet", which leaves the goal empty.
const GOAL_OPTIONS = [
    ...goals.map((goal) => ({ value: goal.id, label: goal.name, hint: goal.description })),
    { value: "", label: "Not sure yet" },
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

    function handleChange(questionId, value) {
        setAnswers({ ...answers, [questionId]: value })
    }

    // Plain text options use the same text for their value and label.
    function toOption(option) {
        return typeof option === "string" ? { value: option, label: option } : option
    }

    return (
        <div className="about card">
            <h2>About you</h2>
            <p className="about-intro">
                These help us suggest causes and show sessions near you. Every question is optional.
            </p>

            {QUESTIONS.map((question) => (
                <fieldset className="about-question" key={question.id}>
                    <legend>{question.label}</legend>
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
            ))}

            <div className="about-buttons">
                <button className="about-skip" onClick={() => onDone(profile)}>Skip</button>
                <button className="button-primary" onClick={() => onDone(answers)}>Continue</button>
            </div>
        </div>
    )
}

export default AboutYou
