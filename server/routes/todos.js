const router = require('express').Router();
const todo = require('../models/todo.js')

router.get('/todos', async (req, res) => {
    res.send( await todo.find());
})

router.post('/todos', async (req, res) => {
    const itemToAdd = req.body;
    const item = new todo(itemToAdd);
    item.save()
    .then((response) => res.send(response))

})

router.post('/todos/:id', async (req, res) => {
    todo.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => res.send(err))
})

router.delete('/todos/:id', async (req, res) => {
    todo.findByIdAndDelete(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => res.status(404).send(err));
})


module.exports = router;