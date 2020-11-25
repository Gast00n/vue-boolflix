/**
 * 
 * Boolfix - Catalogo film
 * 
 */

const app = new Vue({
    el:'#app',
    data: {
        searchKey: '',
        filterFilms: [],
        allFilms: []
    },
    methods: {
        filterAPI() {
            axios.get('https://api.themoviedb.org/3/movie/550?api_key=39c2c769e3bc33c0ccd48f3c8b9612d6&language=it-IT')
            .then( result => {
 
                result.data.filter( (films) => {
                    if (films.title.includes(this.searchKey) || films.original_title.includes(this.searchKey)) {
                        this.filterFilms.push({
                            titolo: films.title,
                            titoloOrig: films.original_title,
                            lang: films.original_language,
                            vote: getVote(films.vote_average)
                        });
                    }
                });
                                               
            })
            .catch( error => {
                console.log(error);
            });
        },

        getVote(vote) {
            return Math.ceil(vote / 2);
        }
    }

});