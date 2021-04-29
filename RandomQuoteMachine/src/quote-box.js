class QuoteBox extends React.Component {
    constructor(props) {
        super(props);
    }
    getNewQuote() {
        console.log("todo: get a new quote");
    }
    render() {
        const style = {
            quoteBox: {
                'backgroundColor': 'lightgrey',
                'display' : 'inline-block',
                'padding': '2em',
                'borderRadius': '1em',
                'display': 'grid',
                'gridGap': '0.5em',
                'gridTemplateColumns': '1fr 1fr',
                'gridTemplateAreas': '"quote-text quote-text" "quote-author quote-author" "quote-link new-quote-btn"'
            },
            quoteText: {
                'gridArea': 'quote-text',
                'textAlign': 'center'
            },
            quoteAuthor: {
                'gridArea' : 'quote-author'
            },
            quoteLink: {
                'gridArea': 'quote-link'
            },
            newQuoteBtn: {
                'gridArea' : 'new-quote-btn'
            },
        };

        return (
            <div id="quote-box" style={style.quoteBox}>
                <p id="quote-text" style={style.quoteText}>{this.props.text}</p>
                <p id="quote-author" style={style.quoteAuthor}>- {this.props.author}</p>
                <a id="quote-link" href="#" target="_blank" style={style.quoteLink}>tweet quote</a>  {/* should be a container for links i.e. #quote-links contains .quote-link */}
                <button id="new-quote-btn" onClick={this.getNewQuote.bind(this)} style={style.newQuoteBtn}>new quote</button>
            </div>
        );
    }
}