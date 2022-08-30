interface IMovie {
    title: string
    release_date: string
    poster_path: string
}

interface Genre {
    id: number
    name: string
}


class Movie implements IMovie {
    id: number
    title: string
    release_date: string
    poster_path: string
    genre_names?: string[]
    genre_ids?: number[]

    constructor (
        id: number = 0,
        title: string = "Loading",
        release_date: string = "2000-01-01", 
        poster_path: string = "...",
        genre_names: string[] = []) 
    {
        this.id = id
        this.title = title 
        this.release_date = this.formatDate(release_date)
        this.poster_path = poster_path
        this.genre_names = genre_names
    }

    formatDate(date: string): string {
        const dateObj = new Date(date)

        const year = dateObj.getFullYear()
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0")
        const day = dateObj.getUTCDate().toString().padStart(2, "0");

        return `${day}/${month}/${year}`
    }

    printGenres() {
        return this.genre_names.join(", ")
    }
}

class MovieDetail extends Movie {

    overview: string;
    genres?: Genre[]

    // TODO: Ainda não usado
    status?: string
    original_title?: string // Caso pegue o título em português, esse é o título em inglês

    constructor (
        title: string = "Loading",
        release_date: string = "2000-01-01", 
        poster_path: string = "...",
        overview: string = "Carregando...",
        genres: Genre[] = []) 
    {
        super(0, title, release_date, poster_path)
        this.overview = overview
        this.genres = genres
    }

    printGenres(): string {
        let genresString = []
        this.genres.forEach(genreObj => {
            genresString.push(genreObj.name)
        })

        return genresString.join(", ")
    }
}

export {
    IMovie,
    Movie,
    Genre,
    MovieDetail
} 

