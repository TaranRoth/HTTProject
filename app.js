const express = require('express');
const app = express();
app.use(express.json());
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
        return;
    }
    res.send(course);
})

app.post('/api/courses', (req, res) => {
    if (req.body.name.length < 4) {
        res.status(422).send('The course name must be at least 4 characters.');
        return;
    }
    const course = {id: courses.length + 1, name: req.body.name};
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }
    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return;
    }
    courses.splice(courses.indexOf(course), 1);
    res.send(course);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})