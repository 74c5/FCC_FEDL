import "./quote-box.scss";
import { useSelector, useDispatch } from 'react-redux';
import { getNewQuote } from "../store/reducer";

const QuoteBox = () => {
    const {quote, author, themeID} = useSelector(state => state);

    const dispatch = useDispatch();
    const newQuote = (event) => {
        event.preventDefault();
        dispatch(getNewQuote);
    };


    if (quote == "") {
        setTimeout( () => dispatch(getNewQuote), 3000);
        return (
            <div id="quote-box" className="col-6 offset-3 rounded-3 bg-light p-4">
                <p>...Retrieving a fresh quote.</p>
            </div>
        );
    }

    return (
        <div className={"row align-items-center"}>
            <div id="quote-box" className="col-6 offset-3 rounded-3 bg-light p-4">
                <p id="text" className={"text-center"}>
                    <span className={"fs-3 fw-bold"}>{'"'}</span>
                    {`${quote}`}
                    <span className={"fs-3 fw-bold"}>{'"'}</span>
                </p>
                <p id="author" className={"text-end pe-2"}>
                    ~ {author}
                </p>
                
                
                {/* <div className={"container overflow-hidden"}> */}
                <div className={"d-flex justify-content-between align-items-center"}>
                    <a id="tweet-quote" target="_blank" className={`btn btn-sm btn-outline-mytheme${themeID} text-decoration-none`}
                       href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote}" ~${author}`}>
                        <i className={"bi bi-twitter"} role={"img"} aria-label={"twitter"}></i>
                        <span> tweet me!</span>
                    </a> 
                        {/* should be a container for links i.e. #quote-links contains .quote-link */}
                    <button id="new-quote" onClick={newQuote} className={`btn btn-sm btn-outline-mytheme${themeID}`}>new quote</button>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}

export default QuoteBox;