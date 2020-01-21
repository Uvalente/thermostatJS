describe("Thermostat", function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at default temperature', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(DEFAULT_TEMPERATURE);
  });

  it('increase the temperature by one degree', function() {
    thermostat.increaseTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(21);
  });

  it('increase the temperature by two degree', function() {
    thermostat.increaseTemperature();
    thermostat.increaseTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(22);
  });

  it('decrease the temperature by one degree', function() {
    thermostat.decreaseTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(19);
  });

  it('decrease the temperature by two degree', function() {
    thermostat.decreaseTemperature();
    thermostat.decreaseTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(18);
  });

  it('throw an error when reducing temperature lower than minimum value', function() {
    thermostat._temperature = 10;
    expect( function() {thermostat.decreaseTemperature()}).toThrowError(`Can't decrease the temperature lower than ${MINIMUM_TEMPERATURE} degrees`);
  });

  it('reset temperature to default value', function() {
    thermostat._temperature = 25;
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(DEFAULT_TEMPERATURE);
  });

  it('power saving is on by default', function() {
    expect(thermostat.isPowerSaving()).toEqual(true);
  });

  it('return false if power saving is off', function() {
    thermostat.switchPowerSave();
    expect(thermostat.isPowerSaving()).toEqual(false);
  });

  it('return true if power saving is on', function() {
    thermostat.switchPowerSave();
    thermostat.switchPowerSave();
    expect(thermostat.isPowerSaving()).toEqual(true);
  });

  it('set the request temperature', function() {
    thermostat.setTemperature(17);
    expect(thermostat.getCurrentTemperature()).toEqual(17);
  });

  describe('power saving is on', function() {
    it('throw an error when increasing temperature over the maximum value', function() {
      thermostat._temperature = 25;
      expect( function() {
        thermostat.increaseTemperature()
      }).toThrowError(`Can't increase the temperature over than ${MAXIMUM_TEMPERATURE_POWER_SAVING} degrees`);
    });
  });

  describe('power saving is off', function() {
    it('throw an error when increasing temperature over the maximum value', function() {
      thermostat.switchPowerSave()
      expect(thermostat.isPowerSaving()).toEqual(false);
      thermostat._temperature = 32
      expect( function() {
        thermostat.increaseTemperature()
      }).toThrowError(`Can't increase the temperature over than ${MAXIMUM_TEMPERATURE} degrees`);
    });
  });
});