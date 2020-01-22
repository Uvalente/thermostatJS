$( document ).ready(function() {
  let thermostat = new Thermostat();
  $('.modify-temperature.increase').click(function() {
    thermostat.increaseTemperature();
    updateTemperature();
  });

  $('.modify-temperature.decrease').click(function() {
    thermostat.decreaseTemperature();
    updateTemperature();
  });

  $('.modify-temperature.reset').click(function() {
    thermostat.resetTemperature();
    updateTemperature();
  });

  $('.power-saving').click(function() {
    thermostat.switchPowerSave();
    updatePowerSavingMode();
    updateTemperature();
  });

  $('#current-temperature').text(thermostat.getCurrentTemperature());

  $('.power-usage').text(thermostat.getEnergyUsage());

  function updateTemperature() {
    $('#current-temperature').text(thermostat.getCurrentTemperature());
    $('#current-temperature').attr('class', thermostat.getEnergyUsage());
  };

  function updatePowerSavingMode() {
    if (thermostat.isPowerSaving()) {
      $('.power-saving-status').text('on');
    } else {
      $('.power-saving-status').text('off');
    }
  };
});
