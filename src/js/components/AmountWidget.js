/* eslint-disable linebreak-style */
import {settings, select} from '../settings.js';
import BaseWidget from './BaseWidget.js';


class AmountWidget extends BaseWidget {
  constructor(element) {
    super(element, settings.amountWidget.defaultValue);
    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.initActions();
    
    //thisWidget.value = settings.amountWidget.defaultValue; this is now function of BaseWidget
    //thisWidget.setValue(thisWidget.input.value); this is now function of BaseWidget
    
    //console.log('AmoundWidget: ', thisWidget);
    //console.log('constructor argument:', element);
  }

  getElements() {
    const thisWidget = this;

    //thisWidget.element = element; this is now function of BaseWidget
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);
  }

  isValid (value){
    return !isNaN(value)
    && value >= settings.amountWidget.defaultMin 
    && value <= settings.amountWidget.defaultMax;
  }

  renderValue (){
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.value;
  }

  initActions() {
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function () {
      thisWidget.value = thisWidget.dom.input.value;
    })
    ;
    thisWidget.dom.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();
      thisWidget.setValue(thisWidget.value - 1);
    });
    thisWidget.dom.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();
      //console.log('clicked', thisWidget.value);
      thisWidget.setValue(thisWidget.value + 1);
    });
  }
}

export default AmountWidget;