const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const notesModel = require('../model/note');

router.post('/notes/add', auth, async (req, res) => {
    try {
        const note = new notesModel({
            data: req.body.data,
            owner: req.user._id,
        });
        console.log(req.body);
        await note.save();
        res.status(200).send({
            success: true
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error
        })
    }
})

router.get('/notes',auth, async (req, res)=>{
    try {
        const notes=await notesModel.find({owner:req.user._id});
        // console.log(notes);
        res.status(200).send({
            success:true,
            notes
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error
        })
    }
});

router.patch('/note/:id', auth, async (req, res)=>{
    try {
        const note=await notesModel.findById(req.params.id);
        if(!note)
            throw 'Note not found!';
        note.data=req.body.data;
        // await notesModel.findOneAndUpdate({_id:req.params.id, owner:req.user._id});
        await note.save();
        res.status(200).send({
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            error
        })
    }
});

router.delete('/note/:id', auth, async (req, res)=>{
    try {
        const note=await notesModel.findById({_id:req.params.id});
        if(!note)
            throw 'Note not found!';
        await notesModel.findByIdAndDelete({_id:req.params.id, owner:req.user._id});
        res.status(200).send({
            success:true
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            error
        })
    }
})

module.exports = router;