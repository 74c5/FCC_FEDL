import { faArrowUp, faArrowDown, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';

import styles from '../styles/ValueIncrementer.module.css';

const incrementer = ({id, title, value, setValue}) => {

    const increment = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValue(value+1);
    };
    const decrement = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValue(value-1);
    };
    const reset = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setValue(-1);
    };

    return (
        <div id={id} className={styles.main}>
            <h3>{title}</h3>
            <div className={styles.modifier}>
                <IconButton id="inc-session" icon={faArrowUp}   onClick={increment} />
                <div className={styles.value}>{value}</div>
                <IconButton id="dec-session" icon={faArrowDown} onClick={decrement} />
                <IconButton id="dec-session" icon={faUndoAlt}   onClick={reset} />
            </div>
        </div>
    );
};

export default incrementer;