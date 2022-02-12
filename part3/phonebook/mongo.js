const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://phonebook_admin:${password}@phonebook0.gtbtj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const phonenumberSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Phonenumber = mongoose.model('Phonenumber', phonenumberSchema)

if (process.argv.length == 5) {
    const phonenumber = new Phonenumber({
        name: process.argv[3],
        number: process.argv[4]
    })

    phonenumber.save().then(result => {
            console.log(`added ${result.name} number ${result.number} to phonebook `) 
            mongoose.connection.close()
        }
    )
}

if (process.argv.length == 3) {
    Phonenumber.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(phonenumber => {
            console.log(`${phonenumber.name} ${phonenumber.number}`)
        }) 
        mongoose.connection.close()
    })
}
