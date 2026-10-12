// AboutYou.jsx asks three optional questions before the quiz.
// Every question can be left blank, and the whole screen can be skipped.
import { useState } from 'react'
import './AboutYou.css'

const QUESTIONS = [
    {
        id: "goal",
        label: "What would you like to get out of helping?",
        options: ["Meet new people", "Learn a new skill", "Help my neighbourhood", "Try something new", "Not sure yet"],
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

    function handleChange(questionId, option) {
        setAnswers({ ...answers, [questionId]: option })
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
                    <div className="about-options">
                        {question.options.map((option) => (
                            <label className="about-option" key={option}>
                                <input
                                    type="radio"
                                    name={question.id}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={() => handleChange(question.id, option)}
                                />
                                {option}
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
