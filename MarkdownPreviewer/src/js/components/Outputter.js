import './Outputter.scss';
import { useSelector } from 'react-redux'



const Outputter = () => {
    const output = useSelector(state => state.output);

    return (
        <div id="outputter">
            <h3>Markdown Preview</h3>
            <div id="preview" dangerouslySetInnerHTML={{__html: output}} />
        </div>
    );
};

export default Outputter;