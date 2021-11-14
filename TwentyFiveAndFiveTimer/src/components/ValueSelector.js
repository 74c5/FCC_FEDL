import styles from '../styles/ValueSelector.module.css';


const incrementer = ({id, title, value, selection, onChange}) => {

    const onSelect = (event) => {
        event.preventDefault();
        event.stopPropagation();
        onChange(event.target.value);
    }
    
    return (
        <div id={id} className={styles.main}>
            <h3>{title}</h3>

            <select name={id + "Selecter"} className={styles.select} value={value} onChange={onSelect}>
                {selection.map(({ value, text }, ind) => (
                    <option key={`${id}Option${ind}`} value={value}>{text}</option>
                ))}
            </select>
        </div>
    );
};

export default incrementer;