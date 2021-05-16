import React from 'react';
import useScreenSize from './useScreenSize';
import Display from './Display';
import Drumboard from './Drumboard';
import Power from './Power';
import VolumeControl from './VolumeControl';
import BankSelect from './BankSelect';
import Footer from './Footer'
import './App.scss';


const App = () => {
    const screen = useScreenSize();

    const viewClass = (screen.width < 600) ? 'mobileView' : 'fullView';

    return (
        <div id="react-app">
            <main>
                <div id="drum-machine" className={viewClass}>
                    <h3>I think, we need... more cow bell?</h3>
                    <Display />
                    <Drumboard />
                    <Power />
                    <VolumeControl />
                    <BankSelect />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;
