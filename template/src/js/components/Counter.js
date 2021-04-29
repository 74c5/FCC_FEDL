import './counter.scss';
import { useSelector, useDispatch } from 'react-redux'



const Counter = () => {
    const countValue = useSelector(state => state);
    
    const dispatch = useDispatch();
    const onClick = (event) => {
        event.preventDefault();
        dispatch({type: 'increment'});
    };

    return (
        <div className="min-vh-100 d-flex flex-column justify-content-center">
            <h1 onClick={onClick} className="text-center">{countValue}</h1>
        </div>
    );
};

export default Counter;