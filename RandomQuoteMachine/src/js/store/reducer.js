// At the minute we only have simple state - it is all lumped in together

// action enums
const NEW_QUOTE = 'new-quote';
const SET_BUSY = 'set-busy';

// action functions
export const getNewQuote = (dispatch, getState) => {
    dispatch({type: SET_BUSY});

    fetch('https://api.quotable.io/random?tags=technology') // use { "mode": "no-cors" } - if cors headers not returned correctly
        .then( response => {
          return response.json(); 
        })
        .then( data => {
            dispatch({type: NEW_QUOTE, payload: {quote: data.content, author: data.author}});
        })
        .catch((err) => { 
            console.log(err);
            dispatch({type: NEW_QUOTE, payload: {quote: "An error occured retrieving a fresh quote", author: "Mista Computa"}});
        })
};

const defaultStore = {
    quote: '', 
    author: '',
    status: 'idle',
    themeID : 1
}

// reducers
const quoteReducer = (store=defaultStore, action) => {
    switch (action.type) {
        case NEW_QUOTE:
            return {
                quote : action.payload.quote,
                author: action.payload.author,
                status: 'idle',
                themeID : (store.themeID % 10) + 1
              };
        case SET_BUSY:
              return ({...store, status: 'busy'});
        default:
            return store;
    }
}

export default quoteReducer;
export {quoteReducer as rootReducer};