var fs = require('fs');

function writeCommand(cmd) {
	return new Promise(function (resolve, reject) {
		var buffer = new Buffer(cmd + "\n");
		var fd = fs.open("/dev/pi-blaster", "w", undefined, function(err, fd) {
			if (err) {
				reject(err);
			} else {
				fs.write(fd, buffer, 0, buffer.length, -1, function(error, written, buffer) {
					if (error) {
						reject(error);
					} else {
						fs.close(fd);
						resolve();
					}
				});
			}
		});
	});
}

function setPwm(gpio, value) {
	return new Promise(function (resolve, reject) {
		writeCommand(gpio + "=" + value).then(function () {
			console.log("GPIO " + gpio + " was set to " + value);
			resolve();
		});
	});
}

function releasePwm(gpio) {
	return new Promise(function (resolve, reject) {
		writeCommand("release " + gpio).then(function () {
			console.log("GPIO " + gpio + " was released")
			resolve();
		});
	});
}

/**
 * 4, // P1-7
 * 17, // P1-11
 * 18, // P1-12
 * 27, // P1-13
 * 21, // P1-13
 * 22, // P1-15
 * 23, // P1-16
 * 24, // P1-18
 * 25, // P1-22
 */
 
/* 30%~180    pin 4
for (var i = 0.01; i <= 0.3; i += 0.01) {
	(() => {
		var value = parseInt(i * 100) / 100;
		setTimeout(() => {
			setPwm(4, value);
		}, value * 20000);
	})();
}

setTimeout(function () {
	releasePwm(4);
}, 10000);
*/
