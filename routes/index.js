var express = require('express');
var router = express.Router();

/**
 * Toaster status:
 * 0  → stop
 * 1  → active
 * 2  → ended
 */
var Toaster = {
  status: "stop",
  getStatus: function() {
    return (this.status === "active") ? 1 : (this.status === "stop") ? 0 : 2
  },
  setStatus: function (s) {
    this.status = s
  },
  timer: 0,
  pin: 0
}
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/setTimer/:time', function(req, res, next) {
  if (!(Toaster.getStatus() === 0)) {
    res.render('res', {
      response: 0
    });

    console.log("\nIl tostapane e' gia' partito oppure ha finito e sta aspettando il Nao, non e' quindi possibile avviarlo")
    console.log("More info: ")
    console.log("Toaster.status: " + Toaster.status + "(" + Toaster.getStatus() +")")
    console.log("Toaster.timer: " + Toaster.timer + "\n")
  } else {
    Toaster.timer = req.params.time
    console.log("\nAvviato il tostapane per " + Toaster.timer + "s.\n")
    Toaster.setStatus("active")
    setTimeout(function() {
      Toaster.setStatus("ended")
      console.log("\nIl tostapane ha finito! Aspetto risposte dal Nao...\n")
    }, Toaster.timer * 1000);
    res.render('res', {
      response: 1
    });
  }
});

router.get('/getStatus', function(req, res, next) {
  res.render('res', {response: Toaster.getStatus()});
  console.log("\nStatus: " + Toaster.getStatus() + "\n")
  if(Toaster.getStatus() === 2)
    Toaster.setStatus("stop")
});

module.exports = router;
