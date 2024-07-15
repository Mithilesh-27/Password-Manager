import express from "express"
const app = express()
const port = 3000
import 'dotenv/config'
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"

app.use(cors())
app.use(bodyParser.json())

await mongoose.connect(process.env.MONGO_URI)

const lockBoxSchema = new mongoose.Schema({
    website: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    id: {type: String, required: true, unique: true}
})

const Password = mongoose.model('Password', lockBoxSchema) 

app.get('/', async (req, res) => {
  const passwords = await Password.find()
  res.json(passwords)
})

app.post('/', async (req, res) => {
  let payload = req.body
  const newPassword = new Password(payload)
  const savedPassword = await newPassword.save()
  res.send({success:true, result:savedPassword})
})

app.delete('/', async (req, res) => {
  const deletedPassword = await Password.deleteOne({id: req.body.id})
  res.send({success:true, result:deletedPassword})
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
