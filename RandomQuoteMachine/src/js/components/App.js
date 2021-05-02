import React from 'react';
import { useSelector } from 'react-redux';
import QuoteBox from './quote-box';
import './App.scss';

const App = () => {
  const themeID = useSelector(state => state.themeID);
  
  return (
    <div id={"react-app"} className={`container-fluid min-vh-100 d-flex flex-column justify-content-center bg-mytheme${themeID}`}>
      <QuoteBox />
    </div>
  );
}

export default App;
