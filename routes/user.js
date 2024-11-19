import express from 'express'
import  { signIn, logIn , deleteUsers, getMovie} from '../controllers/users.js'
const app = express()
const router = express.Router()


app.use('/users',router)

//user auth routes

router.post('/signup',signIn) //working
router.post('/login',logIn)     //working
router.get('/getMovie/:id',getMovie) //working

//delette all documents
router.delete('/delete',deleteUsers)
export default router