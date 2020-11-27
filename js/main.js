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
        filterSeries: []
    },
    created() {
    },
    methods: {
        filterAPI() {

            this.filterFilms = [];
            this.filterSeries = [];

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

                // Ottimizo l'output.
                this.filterFilms.forEach( (films)  => {
                    films.overview = this.shortDesc(films.overview);                    
                    if (films.poster_path === 'null') {
                        films.poster_path = './img/placeholder.png';
                    } else {
                        films.poster_path = `https://image.tmdb.org/t/p/w780/${films.poster_path}`;
                    }
                });
                
            })
            .catch( error => {
                console.log(error);
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

                // Ottimizo l'output.
                this.filterSeries.forEach( (series)  => {
                    series.overview = this.shortDesc(series.overview);                    
                    if (series.poster_path === 'null') {
                        series.poster_path = './img/placeholder.png';
                    } else {
                        series.poster_path = `https://image.tmdb.org/t/p/w780/${films.poster_path}`;
                    }
                    
                });
                
            })
            .catch( error => {
                console.log(error);
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
            if (element.length > 200){
                return element = element.slice(0,200).concat('...');
            };
        }
    }

});