// At the minute we only have simple state - it is all lumped in together

// action enums
const NEW_QUOTE = 'new-quote';

// action functions
export const getNewQuote = (dispatch, getState) => (
    fetch('https://quotes.stormconsultancy.co.uk/random.json')
        .then( response => response.json() )
        .then( data => {
            console.log(data.author);
            console.log(data.quote);
            dispatch({type: NEW_QUOTE, payload: data});
        })
        .catch((err) => { console.log(err);})
);

const defaultStore = {
  quote: '', 
  author: '',
  themeID : 1
}

// reducers
const quoteReducer = (store=defaultStore, action) => {
  console.log(action);
  switch (action.type) {
    case NEW_QUOTE:
        return {
            quote : action.payload.quote,
            author: action.payload.author,
            themeID : (store.themeID % 10) + 1
          };
    default:
      return store;
  }
}

export default quoteReducer;
export {quoteReducer as rootReducer};