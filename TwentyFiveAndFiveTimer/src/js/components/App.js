import React from 'react';
import { useSelector } from 'react-redux';
import Interface from './Interface';
import Modal from './Modal';
import Settings from './Settings';
import Footer from './Footer'
import './App.scss';

const hideSettings = (event) => {
    event.preventDefault();
    console.log('todo: close the modal!');
}

const App = () => {
    const settingsShown = useSelector(state => state.ui.showSettings);

    return (
        <div id="react-app">
            <main>
                <Interface id="interface"/>
            </main>
            <Footer />
            <Modal id="settings-modal" shown={settingsShown} hide={hideSettings}>
                <Settings />
            </Modal>
        </div>
    );
};

export default App;
