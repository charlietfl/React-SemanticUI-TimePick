import React from 'react';
import { render } from 'react-dom';


import Timepick from './timepick'
//import TpTest from './datepick'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const date= new Date()
//date.setMinutes(22);
//date.setHours(9)
const steps = 5

const App = () => (
  <div >
  <h3 className="center">TimePicker Development</h3>
{ /*  <Timepick 
  time='3:20 Pm'
  date={date}
  minuteSteps={steps}
   start /> */}
    
<Timepick
  time='3:20 Pm'
      date={date}
  minuteSteps={steps}
  start />
  </div>
);

render(<App />, document.getElementById('root'));
