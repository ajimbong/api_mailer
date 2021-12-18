
require('dotenv').config();

// Configuring express server
const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))

// Node mailer
const nodemailer = require('nodemailer')

// Enabling the app to be accessed from any brower with no errors
const cors = require('cors')
app.use(cors({ origin : "*"}))
// step 1 is to create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

app.post('/', (req, res)=>{
    // Setting the post body to 'data'
    data = req.body
    
    // Composing the email to be sent
    let mailOptions = {
        from: data.email,
        to:  process.env.EMAIL,
        subject: data.subject,
        text: `Email from joelfah.github.io
Name : ${data.name}
Email : ${data.email}

Message: ${data.message}`
    }
    //This action sends the email and checks for errors
    transporter.sendMail(mailOptions, (err, data)=>{
    if(err){
        console.error(err)
        res.json({message : "Sorry there was an error sending the email"})
    } else {
        res.json({message : `Thanks for contacting us, we will get back to you as soon as possible.`})
        console.log(`New email by ${data.email}`)
    }
    })
})
app.listen(3000, ()=> console.log('Api Mailer running 🔥🚀'))