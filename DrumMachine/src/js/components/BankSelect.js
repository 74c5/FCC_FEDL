import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectBank } from '../store/control';
import './BankSelect.scss';

const BankSelect = ({id}) => {
    const [bankID, setBankID] = useState(0);
    const banks = useSelector(store => store.ui.banklist);
    const enabled = useSelector(store => store.ui.enabled);

    const dispatch = useDispatch();

    const onChange = (event) => {
        const newIndex = Number(event.target.value);
        setBankID(newIndex);
        dispatch(selectBank(newIndex));
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