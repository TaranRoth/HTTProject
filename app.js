const express = require('express');
const app = express();
const port = 3000;
const courses = [
    {id: 1, name:'Web Development'},
    {id:2, name: 'IT'},
    {id:3, name: 'Cybersecurity'},
];

app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return
    }
    res.send(course);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})