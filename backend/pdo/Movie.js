export class Movie {
    id;
    title;
    year;
    genres;
    director;
    country;
    poster;
    minutes;

    constructor(id, title, year, country, genres,director, minutes, poster) {
        // just in case data file contains extra whitespace
        this.id = id.trim();
        this.title = title.trim();
        this.year = parseInt(year.trim());
        this.genres = genres;
        this.director = director;
        this.country = country;
        this.poster = poster;
        this.minutes = minutes;
    }

    // Returns ID associated with this item
    getID () {
        return this.id;
    }

    // Returns title of this item
    getTitle () {
        return this.title;
    }

    // Returns year in which this item was published
    getYear () {
        return this.year;
    }

    // Returns genres associated with this item
    getGenres () {
        return this.genres;
    }

    getCountry(){
        return this.country;
    }

    getDirector(){
        return this.director;
    }

    getPoster(){
        return this.poster;
    }

    getMinutes(){
        return this.minutes;
    }

    // Returns a string of the item's information
    toString () {
        let result = "Movie [id=" + this.id + ", title=" + this.title + ", year=" + this.year;
        result += ", genres= " + this.genres + "]";
        return result;
    }
}
