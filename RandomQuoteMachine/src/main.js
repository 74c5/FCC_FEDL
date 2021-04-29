
// react
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const style={
            'backgroundColor': 'lightGreen', //@debug
            'width': '100vw',
            'height': '100vh',
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'justifyContent': 'center'
        };
        return (
            <div id="react-wrapper" style={style}>
                <QuoteBox text={"What is a man?"} author={"PeeWee Herman."}/>
            </div>

        );
    }
}

ReactDOM.render(<App />, document.querySelector('#react-target'));
