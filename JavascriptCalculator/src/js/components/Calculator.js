import Display from './Display';
import Pad from './Pad';
import { SYMBOLS } from '../logic/calculator';
import './Calculator.scss';

const Calculator = () => {
    return (
        <div id="calculator">
            <Display id="formula"/>
            <Display id="display" />
            <Pad id="zero"      symbol={SYMBOLS.zero} />
            <Pad id="one"       symbol={SYMBOLS.one} />
            <Pad id="two"       symbol={SYMBOLS.two} />
            <Pad id="three"     symbol={SYMBOLS.three} />
            <Pad id="four"      symbol={SYMBOLS.four} />
            <Pad id="five"      symbol={SYMBOLS.five} />
            <Pad id="six"       symbol={SYMBOLS.six} />
            <Pad id="seven"     symbol={SYMBOLS.seven} />
            <Pad id="eight"     symbol={SYMBOLS.eight} />
            <Pad id="nine"      symbol={SYMBOLS.nine} />
            <Pad id="clear"     symbol={SYMBOLS.clear} />
            <Pad id="add"       symbol={SYMBOLS.add}  />
            <Pad id="subtract"  symbol={SYMBOLS.subtract}  />
            <Pad id="multiply"  symbol={SYMBOLS.multiply}  />
            <Pad id="divide"    symbol={SYMBOLS.divide}  />
            <Pad id="decimal"   symbol={SYMBOLS.decimal}  />
            <Pad id="equals"    symbol={SYMBOLS.equals}  />
            <Pad id="backspace" symbol={SYMBOLS.backspace}  />
        </div>
    );
};

export default Calculator;