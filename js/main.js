/**
 * 
 * Boolfix - Catalogo film
 * 
 */

const app = new Vue({
    el:'#app',
    data: {
        searchKey: '',
        filterFilms: []
    },
    created() {
    },
    methods: {
        filterAPI() {
            axios.get('http://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: '39c2c769e3bc33c0ccd48f3c8b9612d6',
                    language: 'it-IT',
                    query: this.searchKey,
                }
            })
            .then( result => {

                console.log(result.data.results);
                if (this.searchKey != '') {
                    this.filterFilms = result.data.results;
                    console.log(this.filterFilms);                             
                }
            })
            .catch( error => {
                console.log('Errore riscontrato: ',error);
            })
            this.search = '';
        },

        getVote(vote) {
            return Math.ceil(vote / 2);
        }
    }

});