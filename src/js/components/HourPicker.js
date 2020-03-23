/* eslint-disable linebreak-style */
import { select, settings } from '../settings.js';
import { utils } from '../utils.js';
import BaseWidget from './BaseWidget.js';

class HourPicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, settings.hours.open);
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input);
    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    //thisWidget.initPlugin();

    thisWidget.value = thisWidget.dom.input.value;

    thisWidget.dom.hourAvailability = document.querySelector('.range-slider .availability');
    thisWidget.open = settings.hours.open;
    thisWidget.close = settings.hours.close;
    thisWidget.events = {};

    thisWidget.initPlugin();
  }

  updateEvents(events) {
    this.events = events;
  }

  renderAvailability(date) {
    const thisWidget = this;

    const events = this.events[date];

    thisWidget.tablesByHour = [];

    for(let i = thisWidget.open; i < thisWidget.close; i += 0.5){

      if(events[i]){
        thisWidget.tablesByHour.push(events[i].length);
      } else {
        thisWidget.tablesByHour.push(0);
      }
    }

    thisWidget.dom.hourAvailability.innerHTML = '';

    for(let hour of thisWidget.tablesByHour){

      const rangeSliderDiv = document.createElement('div');
      rangeSliderDiv.classList.add('table-availability');

      if(hour === 0) rangeSliderDiv.classList.add('free');
      else if(hour < 3) rangeSliderDiv.classList.add('only-one-table');
      else rangeSliderDiv.classList.add('reserved');

      thisWidget.dom.hourAvailability.appendChild(rangeSliderDiv);
    }
  }

  initPlugin(){
    const thisWidget = this;
    // eslint-disable-next-line no-undef
    rangeSlider.create(thisWidget.dom.input);

    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.value = thisWidget.dom.input.value;
    });
  }

  parseValue(value){
    //return utils.numberToHour(value);
    const hourNo = utils.numberToHour(value);
    return hourNo;
  }
  
  isValid(){
    return true;
  }

  renderValue(){
    const thisWidget = this;
    thisWidget.dom.output.innerHTML = thisWidget.value;
  }
}

export default HourPicker;