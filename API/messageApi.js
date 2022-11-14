const { auth } = require('../middleware/auth.midleWare')
const { addMessage, getMessage, getInfo, viewMessage, updateView } = require('../services/messageService')
const router = require('express').Router()
router.post('/' , addMessage)
router.get('/' ,auth, getMessage )
 router.get('/userInfo' , getInfo)
 router.get('/view' , viewMessage)
 router.patch('/' , auth , updateView)
module.exports = router