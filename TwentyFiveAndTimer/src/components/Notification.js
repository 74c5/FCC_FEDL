import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Notification = ({id}) => {

    const clip = useRef(null);

    return (
        <audio id={"beep"} ref={clip} src="./audio/mixkit-alarm-tone-996.wav"></audio>
    );
};

export default Notification;