import React from 'react';
import DrumMachine from './DrumMachine';
import Footer from './Footer'
import './App.scss';


const App = () => {
    return (
        <div id="react-app">
            <main>
                <DrumMachine />
            </main>
            <Footer />
        </div>
    );
};

export default App;
