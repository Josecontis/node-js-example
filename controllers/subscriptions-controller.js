const router = require("express").Router();
const asyncWrapper = require('../utilities/async-wrapper').AsyncWrapper;
// GET api/subscription
router.get('/',asyncWrapper(async (req, res)=>{

}));

// GET api/subscription/:id
router.get('/:id',asyncWrapper(async(req, res)=>{

}));

// POST request su api/subscription
router.post('/',asyncWrapper(async(req, res)=>{

}));

// DELETE request su api/subscription/:id
router.delete('/:id',asyncWrapper(async(req, res)=>{

}));

module.exports = router;