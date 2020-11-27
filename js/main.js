/**
 * 
 * Boolfix - Catalogo film
 * 
 */

const app = new Vue({
    el:'#app',
    data: {
        apiKey: '39c2c769e3bc33c0ccd48f3c8b9612d6',
        searchKey: '',
        filterFilms: [],
        filterSeries: [],
        filterAll: []
    },
    created() {
    },
    methods: {
        filterAPI() {

            this.filterFilms = [];
            this.filterSeries = [];
            this.filterAll = [];
            // PRENDO TUTTI I FILM CON LA KEY
            axios.get('http://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: this.apiKey,
                    language: 'it-IT',
                    query: this.searchKey,
                }
            })
            .then( result => {
                // Pusho la selezione in un array per i film
                if (this.searchKey != '') {
                    this.filterFilms = result.data.results;
                }

                // Seleziono gli elementi dell'array che voglio passare all'array di oggettiche contiente tutto.
                this.filterFilms.forEach( (films)  => {
                    
                    if (films.poster_path === null) {
                        this.filterAll.push({
                            titolo: films.title,
                            titoloOrig: films.original_title,
                            img: './img/placeholder.png',
                            lang: films.original_language,
                            stars: films.vote_average,
                            shortDescr: this.shortDesc(films.overview),
                            media: 'film'
                        });
                    } else {
                        this.filterAll.push({
                            titolo: films.title,
                            titoloOrig: films.original_title,
                            img: `https://image.tmdb.org/t/p/w780/${films.poster_path}`,
                            lang: films.original_language,
                            stars: films.vote_average,
                            shortDescr: this.shortDesc(films.overview),
                            media: 'film'
                        });
                    }
                    
                });
                
            })
            .catch( error => {
                console.log('Errore riscontrato: ',error);
            });

            // PRENDO TUTTE LE SERIE CON LA KEY
            axios.get('http://api.themoviedb.org/3/search/tv', {
                params: {
                    api_key: this.apiKey,
                    language: 'it-IT',
                    query: this.searchKey,
                }
            })
            .then( result => {
                // Pusho la selezione in un array per i film
                if (this.searchKey != '') {
                    this.filterSeries = result.data.results;
                }

                // Seleziono gli elementi dell'array che voglio passare all'array di oggettiche contiente tutto.
                this.filterSeries.forEach( (series)  => {   

                    if (series.poster_path === null) {
                        this.filterAll.push({
                            titolo: series.name,
                            titoloOrig: series.original_name,    
                            img: './img/placeholder.png',
                            lang: series.original_language,
                            stars: series.vote_average,
                            shortDescr: this.shortDesc(series.overview),
                            media: 'series'
                        });
                    } else {
                            this.filterAll.push({
                                titolo: series.name,
                                titoloOrig: series.original_name,
                                img: `https://image.tmdb.org/t/p/w780/${series.poster_path}`,
                                lang: series.original_language,
                                stars: series.vote_average,
                                shortDescr: this.shortDesc(series.overview),
                                media: 'series'
                            });
                    }
                });
                
            })
            .catch( error => {
                console.log('Errore riscontrato: ',error);
            });
            
            // PULISCO LA SEARCH
            this.search = '';

        },
        //Funzione per modificare l'output voto
        getVote(vote) {
            return Math.ceil(vote / 2);
        },

        //Funzione per accorciare la descrizione
        shortDesc(element) {
            if (element.length > 300){
                return element = element.slice(0,300).concat('...');
            };
        }
    }

});