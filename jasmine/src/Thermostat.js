'use strict'

const DEFAULT_TEMPERATURE = 20;
const MINIMUM_TEMPERATURE = 10;
const MAXIMUM_TEMPERATURE_POWER_SAVING = 25;
const MAXIMUM_TEMPERATURE = 32;
const MEDIUM_ENERGY_USAGE = 18

function Thermostat() {
  this._temperature = DEFAULT_TEMPERATURE;
  this._powerSave = true
};

Thermostat.prototype.getCurrentTemperature = function() {
  return this._temperature;
};

Thermostat.prototype.increaseTemperature = function() {
  let max_temp = this._powerSave ? MAXIMUM_TEMPERATURE_POWER_SAVING : MAXIMUM_TEMPERATURE;
  let message = `Can't increase the temperature over than ${max_temp} degrees`
  if (this._temperature >= max_temp) throw new TypeError(message);

  this._temperature++;
};

Thermostat.prototype.decreaseTemperature = function() {
  let message = `Can't decrease the temperature lower than ${MINIMUM_TEMPERATURE} degrees`
  if (this._temperature <= MINIMUM_TEMPERATURE) throw new TypeError(message);

  this._temperature--;
};

Thermostat.prototype.resetTemperature = function() {
  this._temperature = DEFAULT_TEMPERATURE;
};

Thermostat.prototype.isPowerSaving = function() {
  return this._powerSave;
};

Thermostat.prototype.switchPowerSave = function() {
  this._powerSave ? this._powerSave = false : this._powerSave = true;
  if (this.getCurrentTemperature() > MAXIMUM_TEMPERATURE_POWER_SAVING) this.setTemperature(MAXIMUM_TEMPERATURE_POWER_SAVING);
};

Thermostat.prototype.setTemperature = function(temperature) {
  let minimumMessage = `Can't decrease the temperature lower than ${MINIMUM_TEMPERATURE} degrees`
  let max_temp = this._powerSave ? MAXIMUM_TEMPERATURE_POWER_SAVING : MAXIMUM_TEMPERATURE;
  let maximumMessage = `Can't increase the temperature over than ${max_temp} degrees`
  if (temperature < MINIMUM_TEMPERATURE) throw new TypeError(minimumMessage);
  if (temperature > max_temp) throw new TypeError(maximumMessage)

  this._temperature = temperature;
};

Thermostat.prototype.getEnergyUsage = function() {
  if (this._temperature < MEDIUM_ENERGY_USAGE) {
    return 'low-usage';
  } else if (this._temperature < MAXIMUM_TEMPERATURE_POWER_SAVING) {
    return 'medium-usage';
  } else {
    return 'high-usage';
  }
};