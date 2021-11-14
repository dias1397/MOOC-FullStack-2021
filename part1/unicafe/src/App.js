import React, { useState } from 'react'

const Header = ({text}) => {
    return (
        <p>{text}</p>
    )
}

const Button = ({text, onClick}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const totalFeebacks = good + neutral + bad;
    const averageFeedbacks = (good*1 + neutral*0 + bad*-1) / totalFeebacks;
    const positiveFeedbacks = (good / totalFeebacks) * 100;
 
    if (totalFeebacks == 0) {
        return (
            <p>No feedback given</p>
        )
    } else {
        return (
            <table>
                <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />

                <StatisticLine text="all" value={totalFeebacks} />
                <StatisticLine text="average" value={averageFeedbacks} />
                <StatisticLine text="positive" value={positiveFeedbacks + "%"} />
                </tbody>
            </table>
        )
    }
}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text="give feedback" />
            <Button text="good" onClick={() => setGood(good + 1)} />
            <Button text="neuttral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="bad" onClick={() => setBad(bad + 1)} />

            <Header text="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App
