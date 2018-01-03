import React, { Component } from "react";
import { render } from "react-dom";

import { Grid, Segment, Button, Label, Form, Input } from "semantic-ui-react";

import "./timepick.css";


import Utils from './timepick-utils'
console.log('utils',Utils)

const DEBUG = true;
export default class Timepick extends Component {
  activecolor: string = "teal";
  minuteSteps: number;
  validSteps = [5, 10, 15];

  constructor(props) {
    super(props);
    if (DEBUG) {
      console.log("props", props);
    }
    const steps = props.minuteSteps;
    this.minuteSteps = steps && this.validSteps.includes(steps) ? steps : 5;

    this.state = {
      hour: null,
      minute: null,
      meridian: "AM"
    };
    this.timepickInit();
  }

  // parseDisplayTime(newState) {
  //   const displayHour = !isNaN(newState.hour) ? newState.hour : "--";
  //   const displayMinute = !isNaN(newState.minute)
  //     ? Utils.padNumber(newState.minute)
  //     : "--";

  //   return displayHour + ":" + displayMinute + " " + newState.meridian;
  // }

  doTimeUpdate(obj) {
    const newState = Object.assign(this.state, obj);

    obj.displayTime = Utils.parseDisplayTime(newState);
    this.setState(obj);
  }

  componentDidUpdate(prevProps, prevState) {
    console.warn("did update", prevState);
  }

  // debug only
  checkDateProp() {
    const d = this.props.date;
    if (d && new Date(d)) {
      console.warn("valid date in checkDateProp()");



      const timeObj = Utils.parseDateToTimeObj(d, this.minuteSteps)

      Object.assign(this.state, timeObj);

      return true;
    }

    return false;
  }

  setExisingTime() {
    const t = this.props.time;
    if (t) {
      
        const newState = Utils.parseTimeProp(t)

        if(newState){
          newState.displayTime = Utils.parseDisplayTime(newState)
          Object.assign(this.state, newState)
        

      } else {
        console.error("Invalid time property: ", t);
      }
    }
  }

  timepickInit() {
    /*****test */
    if (!this.checkDateProp()) {
      this.setExisingTime();
    }

    /********* */

    this.hours = new Array(12).fill().map((_, i) => i + 1);
    this.minutes = new Array(60 / this.minuteSteps)
      .fill()
      .map((_, i) => i * this.minuteSteps);
  }

  onTimeChange(val, type) {
    let obj = {};
    obj[type] = val;
    this.doTimeUpdate(obj);
  }


  toggleMeridian() {
    const meridian = this.state.meridian === "AM" ? "PM" : "AM";
    
    this.doTimeUpdate({ meridian });
    
  }

  renderMeridianControls() {
    let vals = ["AM", "PM"];
    return (
      <Button.Group toggle basic size="tiny">
        {vals.map(m => (
          <Button
          key={m}
            active={this.state.meridian === m}
            onClick={() => this.toggleMeridian()}
          >
            {m}
          </Button>
        ))}
      </Button.Group>
    );
  }

  renderTimes(type) {
    const stateProp = type.slice(0, -1);
    console.log(stateProp);

    return this[type].map(num => {
      const colorVal = this.state[stateProp] === num ? this.activecolor : null;
      const isLiveBtn = this.state[stateProp] === num;
      return (
        <Grid.Column key={stateProp + num}>
          <Button
            basic={!isLiveBtn}
           color={colorVal}
            onClick={() => this.onTimeChange(num, stateProp)}
            circular
            size="mini"
          >
            {type === "hours" ? num : Utils.padNumber(num)}
          </Button>
        </Grid.Column>
      );
    });
  }

  render() {
    return (
      <div>
        <Segment compact className="center">
          <Form>
            <Form.Field inline>
              <label>Start</label>
              <Input placeholder="Start time" value={this.state.displayTime} />
            </Form.Field>
          </Form>
        </Segment>

        <div className="t-picker">
          <Segment color="teal" compact attached inverted>
            <h3 className="center">
              <Label ribbon basic className="left">
                Start
              </Label>
              {this.state.displayTime}
            </h3>
          </Segment>
          <Segment compact attached>
            <Grid columns={2} divided>
              <Grid.Column>
                <Grid columns={3}>{this.renderTimes("hours")}</Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid columns={this.minuteSteps == 5 ? 3 : 2}>
                  {this.renderTimes("minutes")}
                </Grid>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment attached="bottom" className="t-picker-footer">
            {this.renderMeridianControls()}
          </Segment>
        </div>
      </div>
    );
  }
}
