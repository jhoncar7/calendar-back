const { Router } = require('express');
const { passwordRamdon } = require('../controllers/password');

const router = Router();

router.get('/', passwordRamdon);

module.exports = router;
