import Jwt from "jsonwebtoken";
import { Movie } from "../models/movies-model.js";

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!extractedToken || extractedToken.trim() === "") {
        return res.status(401).json({ message: "You are not logged in!" });
    }

    //verify token
    Jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` })
        } else {
            const adminId = decrypted.id
            return;
        }
    })

    // create movie
    const { title, description, genre, director, releaseDate, posterUrl, actors,bookingStartDate } = req.body;
    if (!title || title.trim() === "" || !description || description.trim() === "" || !genre || genre.trim() == "" || !releaseDate  || !posterUrl || posterUrl.trim() == "" || !actors || actors.trim() == "" || !director || director.trim() == "" || !bookingStartDate || bookingStartDate.trim() == "") {
        return res.status(400).json({ message: "All fields are required" });
    }

    const movie = new Movie({
        title,
        director,
        actors,
        description,
        genre,
        releaseDate,
        posterUrl,
        bookingStartDate
    });

    movie.save()
    return res.status(201).json({message:"movie added successfully", movie })
}

export const getMovies = async (req, res, next) => {
    try {
        const allMovies = await Movie.find()
        // const allMovies = await Movie.find({enabled:true })
        return res.status(200).json({ allMovies });
    } catch (error) {
        return res.status(500).json({ message: "There was a problem retrieving the movies." });
    }
}

//get one movie by id
export const getMovieById = async (req, res, next) => {
    const movieId = req.params.id;
    let result;
    try {
        result = await Movie.findById(movieId);

        if (!result)
            return res.status(404).json({ message: 'The movie with the given ID does not exist.' });

    } catch (err) {
        return res.status(500).json({ message: "Error occured in fetching the movie" })
    }
    return res.status(200).json({ result });
};

//update movie
export const updateMovie = async (req, res, next) => {
    const movieId = req.params.id;
    const { title, description, genre, director, releaseDate, posterUrl, actors, bookingStartDate } = req.body;

    try {
        let updateMovie = await Movie.findById(movieId);
        if (!updateMovie) {
            return res.status(404).json({ message: 'The movie with the given ID does not exist.' });
        }
        updateMovie.title = title;
        updateMovie.description = description;
        updateMovie.genre = genre;
        updateMovie.director = director;
        updateMovie.releaseDate = releaseDate;
        updateMovie.posterUrl = posterUrl;
        updateMovie.actors = actors;
        updateMovie.bookingStartDate = bookingStartDate;

        await updateMovie.save();
        return res.status(200).json({ message: 'Movie updated successfully.', updateMovie });

    } catch (error) {
        return res.status(500).json({ message: "Error occurred while updating the movie." });
    }

};

//delete movie
export const deleteMovie = async (req, res, next) => {
    const movieId = req.params.id;
    try {
        let result = await Movie.findByIdAndDelete({ _id: movieId });
        if (!result) {
            return res.status(404).json({ message: 'The movie with the given ID does not exist.' });
        }
        res.status(200).json({ message: "Deleted Successfully!", result });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
}

export const toggleDisableMovie = async (req, res, next) => {
    const movieId = req.params.id;
  
    try {
      // Find the movie by ID
      const movie = await Movie.findById(movieId);
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      movie.enabled = !movie.enabled;
      await movie.save();
  
      res.status(200).json({ message: 'Movie status toggled successfully', enabled: movie.enabled });
    } catch (error) {
      console.error('Error toggling movie status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };