
const {validParam, sendErrorResponse, sendSuccessResponse} = require('../../helpers/utility');
let router = require('express').Router();
let controller = require('./controller');


router.post('/register', controller.register);
router.post('/auth', controller.auth);

router.post('/decodeToken', controller.decodeToken);
module.exports = router;