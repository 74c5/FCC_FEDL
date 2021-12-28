import Clockface from './Clockface';
import Settings from './Settings';
import Notifications from './Notifications';

import styles from '../styles/Interface.module.css';


const Interface = ({id}) => {
    return (
        <div id={id} className={styles.interface}>
            <Clockface id={"clock-face"}/>
            <Settings id={"settings"} />
            <Notifications />
        </div>
    );
};

export default Interface;