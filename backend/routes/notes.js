const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { query, body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using GET "/api/auth/createuser". No login required.  doesn't require auth
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Some error occurred: " + error.message);
    }
 
});

//ROUTE 2: Add all new notes using POST "/api/auth/addnote". No login required.  doesn't require auth
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }), 
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try{
    const {title,description,tag} = req.body; 
    //if there are errors, return bad req and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description,tag,user:req.user.id
    })
    const saveNote = await note.save();
    res.json(saveNote);
}
catch(error){
    console.error(error.message);
    res.status(500).send("Some error occurred: " + error.message);
}
  }
);
module.exports = router;
