const router = require('express').Router();
const {
    createData,
    getData,
    getSingleData,
    updateData,
    deleteData
} = require('../controllers/contactController');

router.route('/')
    .get(getData)
    .post(createData);

router.route('/:id')
    .get(getSingleData)
    .put(updateData)
    .delete(deleteData)

module.exports = router;