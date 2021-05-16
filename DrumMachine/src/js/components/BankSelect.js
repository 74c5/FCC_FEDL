import { useSelector, useDispatch } from 'react-redux';
import { selectBank } from '../store/ui';
import './BankSelect.scss';

const BankSelect = () => {
    const bankID = useSelector(store => store.ui.bankID);
    const banks = useSelector(store => store.ui.banks);
    const power = useSelector(store => store.control.power);

    const dispatch = useDispatch();

    const onChange = (event) => {
        if(power === 'on') {
            dispatch(selectBank(Number(event.target.value)));
        }
    }

    const bankRadios = banks.map((val, ind) => 
        <label className={`radio-option ${power}`} key={ind}>
            <input className={`radio-input ${power}`} type="radio" id={`bank-${ind}`} value={ind}
                   onChange={onChange} checked={power==='on' && bankID===ind} />
            {` ${val.name}`}
        </label>
    );

    return (
        <div id="bank-select">
            {bankRadios}
        </div>
    );
};

export default BankSelect;