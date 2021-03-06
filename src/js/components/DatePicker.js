/* eslint-disable linebreak-style */
import { select, settings } from '../settings.js';
import { utils } from '../utils.js';
import BaseWidget from './BaseWidget.js';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);
    thisWidget.initPlugin();
    // console.log('thisWidget.dom.input', thisWidget.dom.input);
  }

  initPlugin() {
    const thisWidget = this;
    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(thisWidget.minDate, settings.datePicker.maxDaysInFuture);

    //flatpickr(element, options);
    // eslint-disable-next-line no-undef
    flatpickr(thisWidget.dom.input, {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1 // start week on Monday
      },
      disable: [
        function (date) {
          return date.getDay() === 1;
        }
      ],
      onChange: function (dateStr) {
        thisWidget.value = dateStr;
      },
    });
  }

  parseValue(value) {
    return value;
  }

  isValid() {
    return true;
  }

  renderValue() {
    //should return null;
  }
}

export default DatePicker;