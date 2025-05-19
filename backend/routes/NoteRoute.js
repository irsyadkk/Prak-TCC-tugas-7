import express from "express";
import { addNote, deleteNote, getNote, getNoteById, updateNote } from "../controllers/NoteController.js";
import { addUser, deleteUser, getUsers, getUserById, getUserByEmail, updateUser, registerHandler, loginHandler, logout } from "../controllers/UserController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/token", refreshToken);

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.delete("/logout", logout);

router.get('/users', verifyToken, getUsers);
router.get('/users/:email', verifyToken, getUserByEmail);
router.post('/users', addUser);
router.patch('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', deleteUser);

router.get('/notes', verifyToken, getNote);
router.get('/notes/:id', verifyToken, getNoteById);
router.post('/notes', verifyToken, addNote);
router.patch('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', verifyToken, deleteNote);

export default router;