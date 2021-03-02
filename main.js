var dollarFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function animateTheCow() {
  playMooSound();
  var elem = document.getElementById("cowImg");
  var id = setInterval(frame, 100);

  var angle = 0;
  elem.style.transform = "rotate(" + angle + "deg)";

  function frame() {
    console.log('Animating ...');
    if (angle < 180) {
      angle += 20;
      console.log("rotating to " + angle + "deg");
      elem.style.transform = "rotate(" + angle + "deg)";
    }
    else {
      clearInterval(id);
    }
  }
}

function playMooSound() {
  document.getElementById("mooSound").play()
}

const app = Vue.createApp({
  data: function() {
    return{
      subtotal: 0.0,
      tipPct: 10,
      tipUSD: "$0.00",
      total: 0.0,
      totalUSD: "$0.00",
      showMouseover: false,
      mouseoverText: "Tip the cow!",
      cowTipped: false,
      cowAngle: 0
    }
  },
  methods: {
    clickTheCow() {
      console.log('you clicked the cow!!');
      if(this.cowTipped) {
        this.cowTipped = false;
        this.cowAngle = 0;
        var elem = document.getElementById("cowImg");
        elem.style.transform = "rotate(0deg)";
      }
      else {
        this.total = Math.round(this.subtotal*(1 + this.tipPct/100) * 100) / 100;
        this.totalUSD = dollarFormatter.format(this.total);
        this.cowTipped = true;
        animateTheCow()
      }
    },
    updateTip(newTip) {
      console.log('the tip changed to: ' + newTip);
      this.tipPct = newTip;
      this.tipUSD = dollarFormatter.format(this.subtotal*this.tipPct/100);
    },
    mouseoverCow() {
      console.log("it's hover time!")
      this.showMouseover = true;
    }
  }
})