const output = document.getElementById('output');
const button = document.getElementById('button');

const getMovies = async () => {
    try {
        const url = 'http://localhost:3000/movies/all';
        const res = await fetch(url);
        console.log(res)
        if (!res.ok) {
            throw new Error("Failed to fetch movies!");
        }
        
        const data = await res.json();
        console.log(data)
        // Clear previous output
        output.innerHTML = "";

        // Check if data is empty
        if (data.length === 0) {
            output.innerHTML = "<p>No movies found.</p>";
            return;
        }
        const movies = data.movies;
        movies.forEach((movieData) => {
            const movie = document.createElement('div');
            movie.innerHTML = `
                <h3>${movieData.title}</h3>
                <p><strong>Ratings:</strong> ${movieData.ratings}</p>
                <p><strong>Description:</strong> ${movieData.desc}</p>
                <p><strong>Genre:</strong> ${movieData.genre}</p>
                <p><strong>Created By:</strong> ${movieData.createdBy}</p>
            `;
            output.appendChild(movie);
        });
    } catch (error) {
        alert(error.message);
        console.error(`Error fetching movies: ${error.message}`);
    }
};



// Corrected event listener
button.addEventListener('click', getMovies);