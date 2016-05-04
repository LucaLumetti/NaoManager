var config = require('../config.js');
var gpio = require('pi-gpio');
var pin;

var on = [],
  off = []

var cod = {
  0: [1, 2, 3, 4, 5, 6],
  1: [1, 2],
  2: [1, 2, 4, 5, 7],
  3: [1, 2, 3, 4, 7],
  4: [2, 3, 6, 7],
  5: [1, 3, 4, 6, 7],
  6: [1, 3, 4, 5, 6, 7],
  7: [1, 2, 3],
  8: [1, 2, 3, 4, 5, 6, 7],
  9: [1, 2, 3, 4, 6, 7]
}

function countdown(start) {
  writeNumber(start)
  setTimeout(function() {
    if (start > 0)
      countdown(start - 1)
  }, 1000)
}

function accendiPin(i) {
  i = i || 0
  pin = on[i]
  gpio.open(pin, "output", function(err) {
    if(err) return
    gpio.write(pin, 1, function() {
      gpio.close(pin, function(){
        if (i < on.length - 1) {
          accendiPin(i + 1)
        } else {
          spegniPin(0)
        }
      })
    });
  });
}

function spegniPin(i) {
  i = i || 0
  pin = off[i]
  gpio.open(pin, "output", function(err) {
    if (err) return
    gpio.write(pin, 0, function() {
      gpio.close(pin, function(){
        if (i < off.length - 1)
          spegniPin(i + 1)
      })
    });
  });
}

function writeDisplay(displayNumber, number) {
  for (var i = 0; i < 7; i++) {
    if (cod[number].indexOf(i + 1) > -1) {
      pin = config["DISPLAY"][displayNumber][i]
      console.log("Acceso pin " + pin)
      on.push(pin)
    } else {
      pin = config["DISPLAY"][displayNumber][i]
      console.log("Spento pin " + pin)
      off.push(pin)
    }
  }
  accendiPin(0)
}

function writeNumber(number) {
  if (number > 99 || number < 0) {
    console.log("Can't write " + number + " in a two 7seg display")
    return;
  }

  dec = parseInt(number / 10)
  uni = parseInt(number) - parseInt(number / 10) * 10
  console.log("number1: " + number)
  writeDisplay(1, dec)
    //writeDisplay(2, uni)
}

countdown(20)
  //module.exports = writeNumber;
