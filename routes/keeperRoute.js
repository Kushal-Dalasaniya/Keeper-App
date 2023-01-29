const { getAllNotes,
        creatNote,
        deleteNote,
        updateNote } = require('../services/keeperService');
const express = require("express");

const keeperRouter = express.Router();


keeperRouter.route("/")
    .get(getAllNotes)
    .post(creatNote)
    .delete(deleteNote)
    .patch(updateNote); 

module.exports={keeperRouter}

