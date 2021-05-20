import { useSelector, useDispatch } from 'react-redux';
import { selectBank } from '../store/control';
import './BankSelect.scss';

const BankSelect = ({id}) => {
    const bankID = useSelector(store => store.ui.bankID);
    const banks = useSelector(store => store.ui.banklist);
    const enabled = useSelector(store => store.ui.enabled);

    const dispatch = useDispatch();

    const onChange = (event) => {
        dispatch(selectBank(Number(event.target.value)));
    }

    const bankRadios = banks.map((name, ind) => 
        <label className={`radio-option`} key={ind}>
            <input className={`radio-input`} type="radio" id={`bank-${ind}`} value={ind}
                   onChange={onChange} checked={bankID===ind} disabled={!enabled} />
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