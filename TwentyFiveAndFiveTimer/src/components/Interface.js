import Clockface from './Clockface';
import Controls from './Controls';

import styles from '../styles/Interface.module.css';


const Interface = ({id}) => {
    return (
        <div id={id} className={styles.interface}>
            <Clockface id="clock-face"/>
            {/* <SessionCounter id="session-counter" />  */}
            <Controls id="controls" />
        </div>
    );
};

export default Interface;