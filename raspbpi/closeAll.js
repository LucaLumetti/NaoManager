var config = require('../config.js');
var gpio = require('pi-gpio');

config["GPIO"].forEach(function(v, i) {
  setTimeout(function() {
    gpio.close(v, function() {
      gpio.open(v, "output pulldown", function(err) {
        if (err) return
        gpio.write(v, 0, function() {
          console.log("spento pin " + v)
          gpio.close(v)
        })
      })
    })
  }, i * 1000)
})
