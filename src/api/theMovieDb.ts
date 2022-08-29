import {Genre, Movie, MovieDetail} from "../interfaces/Movie";

const getTrending = async (): Promise<Movie[]> => {
    
    const [api_key, base_url, size] = getApiInfo()

    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`)
    const json = await response.json()
    
    const genresDict: Genre[] = await getGenres()

    const movies: Movie[] = []
    json.results.forEach((obj: Movie) => {
        movies.push(new Movie(
            obj.id, 
            obj.title, 
            obj.release_date, 
            `${base_url}${size}${obj.poster_path}`,
            convertIdtoGenre(obj.genre_ids, genresDict)
        ))
    })

    return movies
}

const getMovieDetail = async (id : number): Promise<MovieDetail> => {
    const [api_key, base_url, size] = getApiInfo()
    // Pega em português
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=pt-BR`)
    const json = await response.json()

    const poster_path = `${base_url}${size}${json.poster_path}`

    return new MovieDetail(json.title, json.release_date, poster_path, json.overview, json.genres)
}

const getGenres = async (): Promise<Genre[]> => {
    const api_key = process.env.API_KEY

    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=pt-BR`)
    const json = await response.json()

    const genres: Genre[] = []
    json.genres.forEach((obj: Genre) => {
        genres.push({
            id: obj.id,
            name: obj.name
        })
    });

    return genres
}

function getApiInfo(): string[] {
    // TODO: Pegar essas 3 constantes de algum lugar, em vez de direto no código. Poder atualizar o base_url e size
    // Pegando de .env. Configurado em babel.config.json Ver: https://docs.expo.dev/guides/environment-variables/#from--babelconfigjs
    const api_key = process.env.API_KEY
    const base_url = "https://image.tmdb.org/t/p/"
    const size = "w300"
    
    return [api_key, base_url, size]
}

function convertIdtoGenre(ids: number[], genreDict: Genre[]): string[] {
    const genreNames: string[] = []
    ids.forEach(id => {
        const genreName = genreDict
            .find(genre => genre.id === id)
            .name
        genreNames.push(genreName)
    })

    return genreNames
}

export {
    getTrending,
    getMovieDetail
};