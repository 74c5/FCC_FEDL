import { faArrowUp, faArrowDown, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';

import styles from '../styles/ValueIncrementer.module.css';

const incrementer = ({idPrefix, title, value, setValue}) => {

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
        <div id={`${idPrefix}-incrementer`} className={styles.main}>
            <h3 id={`${idPrefix}-label`}>{title}</h3>
            <div className={styles.modifier}>
                <IconButton id={`${idPrefix}-increment`} icon={faArrowUp} onClick={increment} />
                <div className={styles.value}>{value}</div>
                <IconButton id={`${idPrefix}-decrement`} icon={faArrowDown} onClick={decrement} />
                <IconButton id={`${idPrefix}-reset`} icon={faUndoAlt}   onClick={reset} />
            </div>
        </div>
    );
};

export default incrementer;