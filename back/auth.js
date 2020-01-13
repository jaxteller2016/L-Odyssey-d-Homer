const express = require('express');
const app = express();
const port = 3000;
const router = express.Router();

router.post('/SignUp', function(req, res, next) {
    res.send('I am in POST signup');
});

module.exports = router;