const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    Headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': API_KEY,
    }
});

async function getTrendingMoviesPreview() {
    const {data} = await api('trending/movie/day');

    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer);

    });
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    
    const genres = data.genres;

    categoriesPreviewList.innerHTML = "";
    genres.forEach(genre => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryText = document.createElement('h3');
        categoryText.setAttribute("id",`id${genre.id}`);

        categoryText.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`;
        })
        categoryText.classList.add('category-title');
        categoryText.innerText = genre.name;

        categoryContainer.appendChild(categoryText);
        categoriesPreviewList.appendChild(categoryContainer);

    });
}

async function getMoviesByCategory(id) {
    const {data} = await api('discover/movie', {
        params: {
            'with_genres': id,
        }
    });

    const movies = data.results;

    genericSection.innerHTML = "";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);

        movieContainer.appendChild(movieImg);
        genericSection.appendChild(movieContainer);

    });
}

