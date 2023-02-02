// Taran Roth, Periods 7-8 Even, 2/1/23

const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const songs = [
    {id: 1, name:'Jolene', genre: 'pop', month: 'February', year: 1974},
    {id: 2, name: 'Rondo Alla Turca', genre: 'classical', month: 'August', year: 1784},
    {id: 3, name: 'Bohemian Rhapsody', genre: 'rock', month: 'October', year: 1975},
];
const genres = ['pop', 'hip-hop', 'rap', 'classical', 'rock', 'jazz', 'blues', 'electronic']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.get('/', (req, res) => {
    res.send('Welcome to my music app');
});

app.get('/api/genres', (req, res) => {
    res.send('Genres: ' + genres.join(', '));
})

app.get('/api/songs', (req, res) => {
    let songsStr = ''
    for (let i = 1; i <= songs.length; i++) {
        let currentSong = songs.find(s => s.id == i);
        if (currentSong) songsStr += `${currentSong.id}. ${currentSong.name}, Genre: ${currentSong.genre}\n`;
    }
    res.send(songsStr);
});

app.get('/api/songs/date/:month/:year', (req, res) => {
    let filteredSongs = songs.filter(s => s.month == months[parseInt(req.params.month) - 1] && s.year == parseInt(req.params.year));
    if (filteredSongs.length == 0) {
        res.status(404).send('The song with the given month and year was not found.');
        return;
    }
    let songsStr = '';
    for (let song of filteredSongs) {
        songsStr += `${song.id}. ${song.name}, Genre: ${song.genre}\n`
    }
    res.send(songsStr);
})

app.get('/api/songs/month/:month', (req, res) => {
    let filteredSongs = songs.filter(s => s.month == months[parseInt(req.params.month) - 1]);
    if (filteredSongs.length == 0) {
        res.status(404).send('The song with the given month was not found.');
        return;
    }
    let songsStr = '';
    for (let song of filteredSongs) {
        songsStr += `${song.id}. ${song.name}, Genre: ${song.genre}\n`
    }
    res.send(songsStr);
})

app.get('/api/songs/year/:year', (req, res) => {
    let filteredSongs = songs.filter(s =>  s.year == parseInt(req.params.year));
    if (filteredSongs.length == 0) {
        res.status(404).send('The song with the given year was not found.');
        return;
    }
    let songsStr = '';
    for (let song of filteredSongs) {
        songsStr += `${song.id}. ${song.name}, Genre: ${song.genre}\n`
    }
    res.send(songsStr);
});

app.get('/api/songs/:id', (req, res) => {
    const song = songs.find(s => s.id == parseInt(req.params.id));
    if (!song) {
        res.status(404).send('The song with the given ID was not found.');
        return;
    }
    res.send(song);
});

app.post('/api/genres/:genre', (req, res) => {
    if (genres.indexOf(req.params.genre) >= 0) {
        res.status(400).send('The given genre already exists.');
        return;
    } else if (req.params.genre.length < 3) {
        res.status(400).send('The given genre must be a minimum of 3 characters.');
        return;
    } else if (req.params.genre.length > 10) {
        res.status(400).send('The given genre must be 10 characters or less.');
        return;
    }
    genres.push(req.params.genre);
    res.send(`The genre was added successfully.\nCurrently available genres: ${genres.join(', ')}`);
});



app.put('/api/genres/:originalGenre/:newGenre', (req, res) => {
    const genreIndex = genres.indexOf(req.params.originalGenre);
    if (genreIndex < 0) {
        res.status(404).send('That genre does not exist.');
        return;
    }
    if (req.params.newGenre.length < 3) {
        res.status(400).send('The genre must have a minimum of 3 characters.');
        return;
    } else if (req.params.newGenre.length >10) {
        res.status(400).send('The genre can have a maximum of 10 characters.');
        return;
    }
    genres[genreIndex] = req.params.newGenre;
    res.send(`${req.params.originalGenre} successfully changed to ${req.params.newGenre}`);
});

app.delete('/api/songs/:id', (req, res) => {
    const song = songs.find(s => s.id == parseInt(req.params.id));
    if (!song) {
        res.status(404).send('The song with the given ID was not found.');
        return;
    }
    songs.splice(songs.indexOf(song), 1);
    res.send(`Song with ID ${req.params.id} was successfully removed.`);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

// 1. The front end of a website accepts requests via the URL, which prompt actions in the backend that have been set up by the developer.
// 2. I learned about the different kinds of requests, such as PUT and DELETE, as well as their functions.
// This project could be extended by including some of the other requests types available on Postman, such as PATCH or PURGE.