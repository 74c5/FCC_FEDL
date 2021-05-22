import { useSelector } from 'react-redux';
import { selectBank } from '../logic/controller';
import './BankSelect.scss';

const BankSelect = ({id}) => {
    const enabled = useSelector(store => store.ui.enabled);
    const bankID = useSelector(store => store.ui.bankID);
    const banks = useSelector(store => store.ui.banklist);

    const onChange = (event) => {
        const newIndex = Number(event.target.value);
        selectBank(newIndex);
    }

    const bankRadios = banks.map((name, index) => 
        <label className={`radio-option`} key={index}>
            <input className={`radio-input`} type="radio" id={`bank-${index}`} value={index}
                   onChange={onChange} checked={bankID===index} disabled={!enabled} />
            {` ${name}`}
        </label>
    );

    return (
        <div id={id} className="bank-select">
            {bankRadios}
        </div>
    );
};

export default BankSelect;