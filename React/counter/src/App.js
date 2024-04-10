import React from 'react';
import Counter from './Counter/Counter';
import Temperature from './Temperatute/Temperature';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div className='box'>
        <Counter/>
        <Temperature/>
      </div>
    );   
  }
}

export default App;
