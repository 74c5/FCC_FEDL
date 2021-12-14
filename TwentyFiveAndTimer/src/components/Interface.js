import Clockface from './Clockface';
import Settings from './Settings';

import styles from '../styles/Interface.module.css';


const Interface = ({id}) => {
    return (
        <div id={id} className={styles.interface}>
            <Clockface id={"clock-face"}/>
            <Settings id={"settings"} />
            <audio id={"beep"} src="./audio/mixkit-alarm-tone-996.wav"></audio>
        </div>
    );
};

export default Interface;