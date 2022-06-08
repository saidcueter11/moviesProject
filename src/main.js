const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    Headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

//Helpers

function createMovies(movies, container) {
    container.innerHTML = "";

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);

    });
}

function createCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryText = document.createElement('h3');
        categoryText.setAttribute("id",`id${category.id}`);

        categoryText.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        categoryText.classList.add('category-title');
        categoryText.innerText = category.name;

        categoryContainer.appendChild(categoryText);
        container.appendChild(categoryContainer);

    });
}


//Llamados API

async function getTrendingMoviesPreview() {
    const {data} = await api('trending/movie/day');

    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    
    const genres = data.genres;

    createCategories(genres, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
    const {data} = await api('discover/movie', {
        params: {
            'with_genres': id,
        }
    });

    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getMoviesBySearch(query) {
    const {data} = await api('search/movie', {
        params: {
            'query': query,
        }
    });

    const movies = data.results;

    createMovies(movies, genericSection);
}

async function getTrendingMovies() {
    const {data} = await api('trending/movie/day');

    const movies = data.results;

    createMovies(movies, genericSection);
}

