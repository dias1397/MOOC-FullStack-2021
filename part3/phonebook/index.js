require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Phonenumber = require('./models/phonenumber')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// ENDPOINTS

app.get('/info', (req, res) => {
	Phonenumber.find({}).then(result => {
		res.send(
			`<div>Phonebook has info for ${result.length} people</div>
            <div>${new Date()}</div>`
		)
	})
})

app.get('/api/persons/', (req, res, next) => {
	Phonenumber.find({})
		.then(result => {
			res.json(result)
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
	Phonenumber.findById(req.params.id)
		.then(phonenumber => {
			if (phonenumber) {
				res.json(phonenumber)
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Phonenumber.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
	const body = req.body

	const phonenumber = new Phonenumber({
		name: body.name,
		number: body.number
	})

	phonenumber.save()
		.then(savedPhonenumber => {
			res.json(savedPhonenumber)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body

	Phonenumber.findByIdAndUpdate(
		request.params.id, 
		{ name, number },    
		{ new: true, runValidators: true, context: 'query' }
	)
		.then(updatedPhonenumber=> {
			response.json(updatedPhonenumber)
		})
		.catch(error => next(error))
})

// ERROR HANDLING

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {    
		return response.status(400).json({ error: error.message })
	} 

	next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
