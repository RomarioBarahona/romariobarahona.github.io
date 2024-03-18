const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
    {
        'joke': 'Why did the student eat his homework?',
        'response': 'Because the teacher told him it was a piece of cake!'
    },
    // Other jokes...
];

let lameJoke = [
    {
        'joke': 'Which bear is the most condescending?',
        'response': 'Pan-DUH'
    },
    // Other jokes...
];

app.get('/jokebook/categories', (req, res) => {
    res.json(categories);
});

app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit;
    
    if (!categories.includes(category)) {
        return res.status(400).json({ 'error': `No category listed for ${category}` });
    }

    let jokes = category === 'funnyJoke' ? funnyJoke : lameJoke;
    if (limit) {
        jokes = jokes.slice(0, limit);
    }

    res.json(jokes);
});

app.post('/jokebook/joke/new', (req, res) => {
    const { category, joke, response } = req.body;

    if (!category || !joke || !response || !categories.includes(category)) {
        return res.status(400).json({ 'error': 'Invalid or insufficient user input' });
    }

    const jokeObject = { joke, response };

    if (category === 'funnyJoke') {
        funnyJoke.push(jokeObject);
    } else if (category === 'lameJoke') {
        lameJoke.push(jokeObject);
    }

    res.json({ 'message': 'Joke added successfully', 'jokes': category === 'funnyJoke' ? funnyJoke : lameJoke });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
