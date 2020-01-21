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

  it('throw an error when trying to reduce temperature lower than minimum value', function() {
    thermostat._temperature = 10;
    expect( function() {thermostat.decreaseTemperature()}).toThrowError("Can't decrease the temperature lower than 10 degrees");
  });

  it('reset temperature to default value', function() {
    thermostat._temperature = 25;
    thermostat.resetTemperature();
    expect(thermostat.getCurrentTemperature()).toEqual(DEFAULT_TEMPERATURE);
  });
});