import React from 'react';
import Controls from './Controls';
import Inputter from './Inputter';
import Outputter from './Outputter';
import useScreenSize from './useScreenSize';
import './App.scss';

const App = () => {
  //const dispatch = useDispatch();
  //dispatch(setManual);
  //dispatch(setInteractive);
  
  const screen = useScreenSize();

  const viewClass = (screen.width < 1100) ? 'mobileView' : 'fullView';

  return (
    <div id="react-app" className={viewClass}>
      <Controls />
      <Inputter /> 
      <Outputter />
    </div>
  );
};

export default App;
