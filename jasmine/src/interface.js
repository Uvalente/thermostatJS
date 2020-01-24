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

  $('input[type="checkbox"]').click(function() {
    thermostat.switchPowerSave();
    updateTemperature();
  });

  $('#current-temperature').text(thermostat.getCurrentTemperature());

  $('.power-usage').text(thermostat.getEnergyUsage());

  $.get( 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=65f656b60f2f754b93b689557641dc3e&units=metric', function(json) {
    let cityTemperature = Math.round(json.main.temp);
    let cityHumidity = json.main.humidity;
    $('.city-temperature').html(`<div class='api-temp'><img src='public/celsius.svg'> ${cityTemperature}</div><div class='api-hum'><img src='public/percent.svg'> ${cityHumidity}</div>`);
  });

  $('select').change(function() {
    updateCityTemperature(($('select').val()));
  })

  function updateTemperature() {
    $('#current-temperature').text(thermostat.getCurrentTemperature());
    $('#current-temperature').attr('class', thermostat.getEnergyUsage());
  };

  function updateCityTemperature(city) {
    $.get( `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=65f656b60f2f754b93b689557641dc3e&units=metric`, function(json) {
      let cityTemperature = Math.round(json.main.temp);
      let cityHumidity = json.main.humidity;
      $('.city-temperature').html(`<div class='api-temp'><img src='public/celsius.svg'> ${cityTemperature}</div><div class='api-hum'><img src='public/percent.svg'> ${cityHumidity}</div>`);
    });
  };
});
