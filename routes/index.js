const router = require('express').Router();

router.use('/auth', require('./userRouter'));
router.use('/messages', require('./messagesRouter'));
// router.use('/slider', require('./SliderRouter'));
// router.use('/order',require('./OrderRouter'));
// router.use('/category',require('./Cateogory'));
// router.use('/cart',require('./CartRouter'))
module.exports = router;
