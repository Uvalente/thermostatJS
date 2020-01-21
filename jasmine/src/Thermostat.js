const DEFAULT_TEMPERATURE = 20;
const MINIMUM_TEMPERATURE = 10;

function Thermostat() {
  this._temperature = DEFAULT_TEMPERATURE;
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this._temperature;
};

Thermostat.prototype.increaseTemperature = function() {
  this._temperature++;
};

Thermostat.prototype.decreaseTemperature = function() {
  if (this._temperature === MINIMUM_TEMPERATURE) {
    throw new TypeError("Can't decrease the temperature lower than 10 degrees");
  }

  this._temperature--;
};

Thermostat.prototype.resetTemperature = function() {
  this._temperature = DEFAULT_TEMPERATURE;
};