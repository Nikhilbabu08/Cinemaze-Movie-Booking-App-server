import express from  'express';
import { addMovie, deleteMovie,getMovieById, getMovies, toggleDisableMovie, updateMovie } from '../controller/movie-controller.js';

const router = express.Router()

// Define routes
router.post('/',addMovie)
router.get('/',getMovies)
router.get('/:id',getMovieById)
router.put('/:id',updateMovie)
router.put('/:id/toggleDisableMovie',toggleDisableMovie);
router.delete('/:id',deleteMovie)

// Export router
export { router as movieRouter };