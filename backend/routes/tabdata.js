const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const TabData = require('../models/TabData');
const GetUser = require('../middleware/getuser');
const { findOne } = require('../models/TabData');

//create-note : post
router.post('/create-note', GetUser, async (req, res) => {

    let data = req.body;
    console.log(req.body);


    try {
        let tab = TabData({
            user: req.user.id,
            Tab: data.Tab,
            TabContent: data.Content
        })

        let SvdNote = await tab.save();
        res.json(SvdNote);
    } catch (error) {
        res.status(401).send({ error: error.message })
    }
});


// get-all-TabData : get
router.get('/get-alltabs', GetUser, async (req, res) => {

    const TabDataa = await TabData.find({ user: req.user.id });

    res.json(TabDataa);

});

// update-note/:id : put

router.put('/update-tab/:id', GetUser, async (req, res) => {

    const { Tab, Content } = req.body;
    console.log( Content)
    try {
        let newNote = {};
        if (Tab) { newNote.Tab = Tab };
        if (Content) { newNote.TabContent = Content };

        console.log(newNote)

        let note = await TabData.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ error: "Not Found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Bad Request" });
        }

        note = await TabData.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        if (Content.length == 0 || Tab.trim() === "") {

            return res.status(401).send({ note, ok: false });
        }
        return res.status(200).send({ note, ok: true });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }


});

// delete-note/:id
router.delete('/delete-Tab/:id', GetUser, async (req, res) => {

    try {

        let note = await TabData.findById(req.params.id);
        if (!note) {
            return res.status(404).send({ error: "Not Found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send({ error: "Bad Request" });
        }

        note = await TabData.findByIdAndDelete(req.params.id);

        res.send({ Success: "Deleted Successfully  ", note: note });
    } catch (error) {
        res.status(500).send({ error: error, msg: error.message });
    }
})

module.exports = router;