import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ text }) => <p>{text}</p>

const Votes = ({ votes }) => <p>has {votes} votes</p>

const Button = ({ text, action }) => <button onClick={action}>{text}</button> 

    
const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]
   
    const [selected, setSelected] = useState(0)
    const [mostVoted, setMostVoted] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const vote = selected => {
        const copy = [...votes]
        copy[selected] = copy[selected] + 1
        setVotes(copy)
        setMostVoted(copy.indexOf(Math.max(...copy)))
    }

    const getRandom = max => {
        let random = Math.floor( Math.random() * max )
        while (random === selected) {
            random = Math.floor( Math.random() * max )
        }
        return random
    }

    return (
        <div> 
            <Header text="Anecdote of the day" />
            <Anecdote text={anecdotes[selected]} />
            <Votes votes={votes[selected]} />
            <Button text="vote" action={() => vote(selected)} />
            <Button text="next anecdote" action={() => setSelected(getRandom(anecdotes.length))} />

            <Header text="Anecdote with most votes" />
            <Anecdote text={anecdotes[mostVoted]} />
        </div>
    )
}

export default App
