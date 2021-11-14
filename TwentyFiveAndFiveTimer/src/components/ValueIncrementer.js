import { faArrowUp, faArrowDown, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';

import styles from '../styles/ValueIncrementer.module.css';

const incrementer = ({id, title, value, onIncrement, onDecrement, onReset}) => {

    const increment = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onIncrement();
    };
    const decrement = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onDecrement();
    };
    const reset = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onReset();
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