document.addEventListener('DOMContentLoaded', function () {
    // Fetch a random joke on page load
    fetchRandomJoke();

    // Fetch and display joke categories
    fetchCategories();

    // Event listener for adding a new joke
    document.getElementById('addJokeForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addJoke();
    });
});

function fetchRandomJoke() {
    fetch('/jokebook/random')
    .then(response => response.json())
    .then(data => {
        const randomJokeElement = document.getElementById('randomJoke');
        randomJokeElement.innerHTML = `<h2>Random Joke:</h2><p>${data.joke}</p><p>${data.response}</p>`;
    })
    .catch(error => console.error('Error fetching random joke:', error));
}

function fetchCategories() {
    fetch('/jokebook/categories')
    .then(response => response.json())
    .then(data => {
        const categoriesElement = document.getElementById('categories');
        categoriesElement.innerHTML = `<h2>Categories:</h2><ul>${data.map(category => `<li>${category}</li>`).join('')}</ul>`;
    })
    .catch(error => console.error('Error fetching categories:', error));
}

function addJoke() {
    const category = document.getElementById('category').value;
    const joke = document.getElementById('joke').value;
    const response = document.getElementById('response').value;

    fetch('/jokebook/joke/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ category, joke, response })
    })
    .then(response => response.json())
    .then(data => {
        console.log('New joke added:', data);
        // Refresh the categories after adding a new joke
        fetchCategories();
        // Clear the form fields
        document.getElementById('category').value = '';
        document.getElementById('joke').value = '';
        document.getElementById('response').value = '';
    })
    .catch(error => console.error('Error adding joke:', error));
}
