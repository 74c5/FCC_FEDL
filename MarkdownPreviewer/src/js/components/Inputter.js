//import React, {useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setInput } from '../store/reducer'
import './Inputter.scss';


const Inputter = () => {
    //const [text, setText] = useState("some default text to get us started");
    
    const input = useSelector(state => state.input);
    
    const dispatch = useDispatch();

    const onChange = (event) => {
        event.preventDefault();
        dispatch(setInput(event.target.value));
    }

    return (
        <div id="inputter">
            <label htmlFor="markdown-input">Markdown Text</label>
            <textarea id="editor" name="markdown-input" value={input} onChange={onChange}>
            </textarea>
        </div>
    );
};

export default Inputter;