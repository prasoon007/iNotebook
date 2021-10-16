const express = require('express'),
    router = express.Router(),
    Notes = require('../models/Notes'),
    fetchUser = require('../middleware/fetchuser'),
    { body, validationResult } = require('express-validator');

router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
})

router.post('/addnotes', fetchUser, [
    body('title', 'Minimum length is 5').isLength({ min: 5 }),
    body('description', 'Minimum length is 10 characters').isLength({ min: 10, max: 50 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); //return error + json
    }
    const { title, description, tag } = req.body;
    const notes = await Notes.create({ user: req.user.id, title: title, description: description, tag: tag });
    res.send(notes);
})

//route3:- to updates notes /api/notes/updatenotes/:id
router.put('/updatenotes/:id', fetchUser, async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        let notes = await Notes.findById(req.params.id);
        if(!notes.user.equals(req.user.id)){
            return res.status(401).send('Access Denied!');
        }       
        notes = await Notes.findByIdAndUpdate(req.params.id,  {title, description, tag}, {new: true});
        res.send(notes);
    } catch (error) {
        res.status(401).send('Details not matching');
        console.log(error.message);
    }
})

//routes4:- to delete the note /api/notes/deletenotes/:id
router.delete('/deletenotes/:id', fetchUser, async(req, res) => {
    try{
        let notes = await Notes.findById(req.params.id);
        if(!notes)return res.status(500).send('Not Found');
        if(!notes.user.equals(req.user.id)) return res.status(401).send('Access Denied!');
        notes = await Notes.findByIdAndDelete(req.params.id);
        res.send(notes);
    } catch(error){
        res.status(401).send('Details not matching');
        console.log(error.message);
    }
})

module.exports = router;