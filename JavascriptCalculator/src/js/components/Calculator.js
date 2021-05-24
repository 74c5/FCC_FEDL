import Display from './Display';
import Pad from './Pad';
import { TOKENS } from '../logic/controller';
import './Calculator.scss';

const Calculator = () => {
    return (
        <div id="calculator">
            <Display id="formula"/>
            <Display id="display" />
            <Pad id="zero"      text="0"    token={TOKENS.zero} />
            <Pad id="one"       text="1"    token={TOKENS.one} />
            <Pad id="two"       text="2"    token={TOKENS.two} />
            <Pad id="three"     text="3"    token={TOKENS.three} />
            <Pad id="four"      text="4"    token={TOKENS.four} />
            <Pad id="five"      text="5"    token={TOKENS.five} />
            <Pad id="six"       text="6"    token={TOKENS.six} />
            <Pad id="seven"     text="7"    token={TOKENS.seven} />
            <Pad id="eight"     text="8"    token={TOKENS.eight} />
            <Pad id="nine"      text="9"    token={TOKENS.nine} />
            <Pad id="clear"     text="AC"   token={TOKENS.clear} />
            <Pad id="add"       text="+"    token={TOKENS.add}  />
            <Pad id="subtract"  text="-"    token={TOKENS.subtract}  />
            <Pad id="multiply"  text="x"    token={TOKENS.multiply}  />
            <Pad id="divide"    text="/"    token={TOKENS.divide}  />
            <Pad id="decimal"   text="."    token={TOKENS.decimal}  />
            <Pad id="equals"    text="="    token={TOKENS.equals}  />
        </div>
    );
};

export default Calculator;