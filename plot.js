var max = 800;
var factorIncrement = 0.025;

var isPaused = false;
var factor = 0;

function onLoad() {
	var maxField = document.getElementById("max-field");
	var incrementField = document.getElementById("increment-field");
	maxField.value = max;
	incrementField.value = factorIncrement;

	var canvas = document.getElementById("plot");
	//	console.log("canvas ", canvas);
	var ctx = canvas.getContext("2d");
	ctx.font = "bold 16px Lucida Console";

	setInterval(function() {
		if (isPaused) {
			return;
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.fillStyle = "blue";
		ctx.fillText(factor.toFixed(2), 10, 20);

		ctx.beginPath();
		var r = Math.min(canvas.width / 2, canvas.height / 2) - 20;
		var center = {
			x : r + 10,
			y : r + 10
		};
		ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
		ctx.stroke();

		var a = 0;
		var angleInc = 2 * Math.PI / max;
		var hue = 0;
		var sat = 0.8;
		var val = 0.9;
		for (var i = 0; i < max; i++) {
			var c = {
				x : center.x + (Math.cos(a) * r),
				y : center.y + (Math.sin(a) * r),
			};
			//		ctx.beginPath();
			//		ctx.arc(c.x, c.y, 6, 0, 2 * Math.PI);
			//		ctx.stroke();

			//			ctx.fillStyle = "blue";
			//			ctx.fillText(i, c.x, c.y);

			var angle = i * angleInc * factor;
			var c2 = {
				x : center.x + (Math.cos(angle) * r),
				y : center.y + (Math.sin(angle) * r),
			};

			hue = (a % (2 * Math.PI)) / (2 * Math.PI);
			ctx.strokeStyle = hsvToRgb(hue, sat, val);
			ctx.beginPath();
			ctx.moveTo(c.x, c.y);
			ctx.lineTo(c2.x, c2.y);
			ctx.stroke();

			a += angleInc;
		}
		factor += factorIncrement;
	}, 80);
}

function togglePause() {
	isPaused = !isPaused;
	var button = document.getElementById("pause-button");
	button.innerHTML = isPaused ? "Go" : "Pause";
}

function reset() {
	factor = 0;
}

function applyParams() {
	var maxField = document.getElementById("max-field");
	var incrementField = document.getElementById("increment-field");
	max = parseFloat(maxField.value);
	factorIncrement = parseFloat(incrementField.value);
	maxField.value = max;
	incrementField.value = factorIncrement;
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function hsvToRgb(h, s, v) {
	if (arguments.length === 1) {
		s = h.s, v = h.v, h = h.h;
	}
	var i = Math.floor(h * 6);
	var f = h * 6 - i;
	var p = v * (1 - s);
	var q = v * (1 - f * s);
	var t = v * (1 - (1 - f) * s);
	var r, g, b;
	switch (i % 6) {
	case 0:
		r = v, g = t, b = p;
		break;
	case 1:
		r = q, g = v, b = p;
		break;
	case 2:
		r = p, g = v, b = t;
		break;
	case 3:
		r = p, g = q, b = v;
		break;
	case 4:
		r = t, g = p, b = v;
		break;
	case 5:
		r = v, g = p, b = q;
		break;
	}

	var color = "#" + toHex(r) + toHex(g) + toHex(b);
	//	console.log(color);
	return color;
}

function toHex(n) {
	var hex = Math.round(n * 255).toString(16);
	if (hex.length < 2) {
		hex = "0" + str;
	}
	return hex;
}
