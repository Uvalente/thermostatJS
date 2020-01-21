describe("Thermostat", function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  it('starts at default temperature', function() {
    expect(thermostat.getCurrentTemperature()).toEqual(DEFAULT_TEMPERATURE);
  });

  describe('increase the temperature', function() {
    it('increase the temperature by one degree', function() {
      thermostat.increaseTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(21);
    });
  
    it('increase the temperature by two degree', function() {
      thermostat.increaseTemperature();
      thermostat.increaseTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(22);
    });
  });

  describe('decrease the temperatue', function() {
    it('decrease the temperature by one degree', function() {
      thermostat.decreaseTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(19);
    });
  
    it('decrease the temperature by two degree', function() {
      thermostat.decreaseTemperature();
      thermostat.decreaseTemperature();
      expect(thermostat.getCurrentTemperature()).toEqual(18);
    });
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

  describe('set temperature', function() {
    it('set the request temperature', function() {
      thermostat.setTemperature(17);
      expect(thermostat.getCurrentTemperature()).toEqual(17);
    });

    it('throw an error when setting a temperature under the minimum value', function() {
      expect( function() {
        thermostat.setTemperature(5);
      }).toThrowError(`Can't decrease the temperature lower than ${MINIMUM_TEMPERATURE} degrees`);
    });

    it('throw an error when setting a temperature over the maximum value with power saving on', function() {
      expect( function() {
        thermostat.setTemperature(28);
      }).toThrowError(`Can't increase the temperature over than ${MAXIMUM_TEMPERATURE_POWER_SAVING} degrees`);
    });

    it('set a temperature over 25 with power saving off', function() {
      thermostat.switchPowerSave()
      thermostat.setTemperature(28);
      expect(thermostat.getCurrentTemperature()).toEqual(28);
    });

    it('throw an error when setting a temperature over the maximum value with power saving off', function() {
      thermostat.switchPowerSave();
      expect( function() {
        thermostat.setTemperature(35);
      }).toThrowError(`Can't increase the temperature over than ${MAXIMUM_TEMPERATURE} degrees`);
    });
  });

  describe('power saving is on', function() {
    it('throw an error when increasing temperature over the maximum value', function() {
      thermostat._temperature = 25;
      expect( function() {
        thermostat.increaseTemperature();
      }).toThrowError(`Can't increase the temperature over than ${MAXIMUM_TEMPERATURE_POWER_SAVING} degrees`);
    });

    it('power saving is on by default', function() {
      expect(thermostat.isPowerSaving()).toEqual(true);
    });

    it('return true if power saving is on', function() {
      thermostat.switchPowerSave();
      thermostat.switchPowerSave();
      expect(thermostat.isPowerSaving()).toEqual(true);
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

    it('return false if power saving is off', function() {
      thermostat.switchPowerSave();
      expect(thermostat.isPowerSaving()).toEqual(false);
    });
  });
});