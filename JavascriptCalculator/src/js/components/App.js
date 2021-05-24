import React from 'react';
import Calculator from './Calculator';
import Footer from './Footer'
import './App.scss';


const App = () => {
    return (
        <div id="react-app">
            <main>
                <Calculator />
            </main>
            <Footer />
        </div>
    );
};

export default App;
