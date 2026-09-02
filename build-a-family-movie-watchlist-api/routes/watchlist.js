import express from 'express';
import { getWatchlist, addMovie, updateMovie, deleteMovie } from '../utils/db.js';
import { authorizeModification } from '../middleware/authorize.js';

const router = express.Router();

router.get('/:userId',  (req, res) => {
    res.status(200).json(getWatchlist(Number(req.params.userId)));
});

router.post('/:userId/movies', authorizeModification, (req, res) => {
    const { userId } = req.params;
    const { title, genre } = req.body;
    const newMovie = {title, genre};
    addMovie(Number(userId), newMovie);
    res.status(201).json(newMovie);
    
});

router.put('/:userId/movies/:movieId', authorizeModification,  (req, res) => {
    const { userId, movieId } = req.params;
    const updatedMovie = updateMovie(Number(userId), Number(movieId), req.body);
    res.status(200).json(updatedMovie);
});

router.delete('/:userId/movies/:movieId', authorizeModification, (req, res) => {
    deleteMovie(Number(req.params.userId), Number(req.params.movieId));
    res.status(200).json({ message: 'Movie deleted' });
});

export default router;