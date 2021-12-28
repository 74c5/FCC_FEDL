import React, {useState} from 'react';

import Player from './Player';



const Notifications = () => {
    const [audio, setAudio]  = useState(null);

    const setAudioRef = (element) => { 
        if (element) {
            element.onpause = (event) => {
                element.currentTime = 0; 
                console.log('-> paused', element.currentTime, Date.now(), element.paused, element);
            };
            setAudio(element); 
        }
    };

    return (
        <>
            <audio id={"beep"} ref={setAudioRef} src="./audio/mixkit-alarm-tone-996.wav" preload={"auto"}></audio>
            <Player audioRef={ audio }/>
        </>
    );
};

export default Notifications;