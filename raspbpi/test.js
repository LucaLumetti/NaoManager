var gpio = require('pi-gpio');
var config = require('../config.js');

accendiPin(0)

function accendiPin(i) {
  gpio.open(config["DISPLAY"][1][i], "output", function(err) {
    gpio.write(config["DISPLAY"][1][i], 1, function() {
      setTimeout(function() {
        if (i < 6)
          accendiPin(i + 1)
      }, 1000);
    });
  });
}
