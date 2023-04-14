const {register,login,setAvatar,getAllUsers,logOut} = require('../controller/userController');

const express = require('express');

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers", getAllUsers);
router.get("/logout/:id", logOut);
module.exports = router;