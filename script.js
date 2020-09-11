"use strict";

window.addEventListener("load", start);

function start() {
  document
    .querySelector(".color_selector")
    .addEventListener("input", getInputColor);
}

function getHarmonyChoice() {
  const currentFilter = this.value;
  console.log(currentFilter);
}

function getInputColor() {
  const inputColor = this.value;
  delegator(inputColor);
}

function delegator(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);

  setBaseColor(hex);

  calcHarmonies(hsl);
  console.log(rgb);
  console.log(hsl);
  console.log(hex);

  document.querySelectorAll("#colorHarmonies").forEach((button) => {
    button.addEventListener("change", getHarmonyChoice);
  });
}

function setBaseColor(hex) {
  document.querySelector(".color3").style.backgroundColor = hex;
}

// color calculations and conversitions

function hexToRgb(hex) {
  const hexR = hex.substring(1, 3);
  const red = parseInt(hexR, 16);
  const hexG = hex.substring(3, 5);
  const green = parseInt(hexG, 16);
  const hexB = hex.substring(5, 7);
  const blue = parseInt(hexB, 16);

  return { red, green, blue };
}
function rgbToHsl(rgb) {
  let r = rgb.red;
  let b = rgb.blue;
  let g = rgb.green;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  s *= 100;
  l *= 100;

  return { h, s, l };
}
function hslToRgb(h, s, l) {
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

function rgbToHex(rgb) {
  const hexR = rgb.r.toString(16).padStart(2, "0");
  const hexG = rgb.g.toString(16).padStart(2, "0");
  const hexB = rgb.b.toString(16).padStart(2, "0");

  const hex = "#" + hexR + hexG + hexB;
  return hex;
}

function calcHarmonies(hsl) {
  calcAnalogous(hsl);
}

function calcShades(hsl) {}
function calcMonochromatic(hsl) {}
function calcCompound(hsl) {}
function calcTriad(hsl) {}

function calcAnalogous(hsl) {
  const h = hsl.h;
  const s = hsl.s;
  const l = hsl.l;

  const colorsArr = [
    { h, s, l },
    { h, s, l },
    { h, s, l },
    { h, s, l },
  ];

  const hCalcOne = h + 90;
  const hCalcTwo = h + 45;
  const hCalcThree = h - 45;
  const hCalcFour = h - 90;

  colorsArr[0].h = hCalcOne;
  colorsArr[1].h = hCalcTwo;
  colorsArr[2].h = hCalcThree;
  colorsArr[3].h = hCalcFour;

  showColors(colorsArr);
}

function calcComplementary() {}

function showColors(array) {
  let i = 0;
  array.forEach((color) => {
    i++;
    const h = Math.round(color.h);
    const s = Math.round(color.s);
    const l = Math.round(color.l);

    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb);
    if (i === 1) {
      document.querySelector(".color1").style.backgroundColor = hex;
      document.querySelector(".hex_value1").textContent = hex;
      document.querySelector(".rgb_value1").textContent =
        "r:" + rgb.r + ", " + "g:" + rgb.g + ", " + "b:" + rgb.b;

      document.querySelector(".hsl_value1").textContent =
        h + ", " + s + "% " + l;
    } else if (i === 2) {
      document.querySelector(".color2").style.backgroundColor = hex;
      document.querySelector(".hex_value2").textContent = hex;
      document.querySelector(".rgb_value2").textContent =
        "r:" + rgb.r + ", " + "g:" + rgb.g + ", " + "b:" + rgb.b;

      document.querySelector(".hsl_value2").textContent =
        h + ", " + s + "% " + l;
    } else if (i === 3) {
      document.querySelector(".color4").style.backgroundColor = hex;
      document.querySelector(".hex_value4").textContent = hex;
      document.querySelector(".rgb_value4").textContent =
        "r:" + rgb.r + ", " + "g:" + rgb.g + ", " + "b:" + rgb.b;

      document.querySelector(".hsl_value4").textContent =
        h + ", " + s + "% " + l;
    } else if (i === 4) {
      document.querySelector(".color5").style.backgroundColor = hex;
      document.querySelector(".hex_value5").textContent = hex;
      document.querySelector(".rgb_value5").textContent =
        "r:" + rgb.r + ", " + "g:" + rgb.g + ", " + "b:" + rgb.b;

      document.querySelector(".hsl_value5").textContent =
        h + ", " + s + "% " + l;
    }
  });
}

function hslToHex() {}
