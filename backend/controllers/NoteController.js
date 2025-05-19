import Note from "../models/NoteModel.js";

// GET NOTE
export const getNote = async(req,res) =>{
  try {
    console.log("req.user: ", req.user.id);
    const id = req.user.id;
    const notes = await Note.findAll({ where: { userId: id } });
    res.status(200).json({
      status: "Success",
      message: "Notes Retrieved",
      data: notes,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// GET NOTE BY ID
export const getNoteById = async(req,res) =>{
  try {
    const note = await Note.findOne({ where: { id: req.params.id } });
    if (!note) {
      const error = new Error("User tidak ditemukan !");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      status: "Success",
      message: "Note Retrieved",
      data: note,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// ADD NOTE
export const addNote = async(req,res) => {
  try {
    const { title, content } = req.body;
    const id = req.user.id;

    if (!title || !content) {
      const msg = `${
        !title ? "Title" : "Content"
      } field cannot be empty !`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }
    await Note.create({
      userId: id,
      title: title,
      content: content
    });
    res.status(201).json({
      status: "Success",
      message: "Note Created",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// UPDATE NOTE
export const updateNote = async(req,res) => {
  try {
    const { title, content } = req.body;
    const ifNoteExist = await Note.findOne({ where: { id: req.params.id } });
    if (!title || !content) {
      const msg = `${
        !title ? "Title" : "Content"
      } field cannot be empty !`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }
    if (!ifNoteExist) {
      const error = new Error("Note tidak ditemukan !");
      error.statusCode = 400;
      throw error;
    }
    let updatedData = {title,content};
    await Note.update(updatedData, {
      where: { id: req.params.id },
    });
    res.status(200).json({
      status: "Success",
      message: "Note Updated",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}

// DELETE NOTE
export const deleteNote = async(req,res) => {
  try {
    const ifNoteExist = await Note.findOne({ where: { id: req.params.id } });
    if (!ifNoteExist) {
      const error = new Error("Note tidak ditemukan !");
      error.statusCode = 400;
      throw error;
    }

    await Note.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      status: "Success",
      message: "Note Deleted",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
}