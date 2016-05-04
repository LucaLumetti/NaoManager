/** Denominazione di ogni parte del display 7seg
 *     H      A          ----  ----
 *   M   I  F   B        |  |  |  |
 *     N      G          ----  ----
 *   L   J  E   C        |  |  |  |
 *     K      D          ----  ----
 *
 * Per i pin: https://www.npmjs.com/package/pi-gpio
 */
 var GPIO = [16,18,7,11,13,15,19,21,23,29,31,33,35,37]

 var PIN = {
   "7SEG_A": 16, //vedi sopra fino a PIN_7SEG_N
   "7SEG_B": 5,
   "7SEG_C": 7,
   "7SEG_D": 11,
   "7SEG_E": 13,
   "7SEG_F": 15,
   "7SEG_G": 19,
   "7SEG_H": 21,
   "7SEG_I": 23,
   "7SEG_J": 29,
   "7SEG_K": 31,
   "7SEG_L": 33,
   "7SEG_M": 35,
   "7SEG_N": 37,
   "SERVOS_1": 16, //Prima coppia di servo
   "SERVOS_2": 18, //Seconda coppia di servo
   "LEDS": 32
 };


var DISPLAY = {
  1: [PIN["7SEG_A"], PIN["7SEG_B"], PIN["7SEG_C"], PIN["7SEG_D"], PIN["7SEG_E"], PIN["7SEG_F"], PIN["7SEG_G"]],
  2: [PIN["7SEG_H"], PIN["7SEG_I"], PIN["7SEG_J"], PIN["7SEG_K"], PIN["7SEG_L"], PIN["7SEG_M"], PIN["7SEG_N"]]
}

module.exports = {
  GPIO: GPIO,
  PIN: PIN,
  DISPLAY: DISPLAY
};
