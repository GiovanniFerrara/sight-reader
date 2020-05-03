// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/SmartArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SmartArray = /*#__PURE__*/function () {
  function SmartArray() {
    _classCallCheck(this, SmartArray);

    this.dataArray = [];
  }

  _createClass(SmartArray, [{
    key: "push",
    value: function push(item) {
      this.dataArray.push(item);
    }
  }, {
    key: "empty",
    value: function empty() {
      this.dataArray.length = 0;
    }
  }, {
    key: "avg",
    get: function get() {
      return this.dataArray.reduce(function (result, time) {
        return result + time;
      }, 0) / this.dataArray.length;
    }
  }, {
    key: "median",
    get: function get() {
      if (!this.dataArray.length) return 0;
      var midPoint = Math.floor(this.dataArray.length / 2);
      return this.dataArray[midPoint];
    }
  }, {
    key: "mode",
    get: function get() {
      if (!this.dataArray.length) return 0;
      var counts = {};
      var mode = null;
      var max = 0;
      this.dataArray.forEach(function (item) {
        var value = Math.round(item * 10) / 10;
        counts[value] = (counts[value] || 0) + 1;

        if (counts[value] > max) {
          max = counts[value];
          mode = value;
        }
      });
      return mode;
    }
  }]);

  return SmartArray;
}();

var _default = SmartArray;
exports.default = _default;
},{}],"src/constants.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEYS = void 0;
var KEYS = [{
  pos: 1,
  hz: 27.5,
  name: 'A0 Double Pedal A'
}, {
  pos: 2,
  hz: 29.1352,
  name: 'A♯0/B♭0'
}, {
  pos: 3,
  hz: 30.8677,
  name: 'B0'
}, {
  pos: 4,
  hz: 32.7032,
  name: 'C1 Pedal C'
}, {
  pos: 5,
  hz: 34.6478,
  name: 'C♯1/D♭1'
}, {
  pos: 6,
  hz: 36.7081,
  name: 'D1'
}, {
  pos: 7,
  hz: 38.8909,
  name: 'D♯1/E♭1'
}, {
  pos: 8,
  hz: 41.2034,
  name: 'E1'
}, {
  pos: 9,
  hz: 43.6535,
  name: 'F1'
}, {
  pos: 10,
  hz: 46.2493,
  name: 'F♯1/G♭1'
}, {
  pos: 11,
  hz: 48.9994,
  name: 'G1'
}, {
  pos: 12,
  hz: 51.9131,
  name: 'G♯1/A♭1'
}, {
  pos: 13,
  hz: 55,
  name: 'A1'
}, {
  pos: 14,
  hz: 58.2705,
  name: 'A♯1/B♭1'
}, {
  pos: 15,
  hz: 61.7354,
  name: 'B1'
}, {
  pos: 16,
  hz: 65.4064,
  name: 'C2 Deep C'
}, {
  pos: 17,
  hz: 69.2957,
  name: 'C♯2/D♭2'
}, {
  pos: 18,
  hz: 73.4162,
  name: 'D2'
}, {
  pos: 19,
  hz: 77.7817,
  name: 'D♯2/E♭2'
}, {
  pos: 20,
  hz: 82.4069,
  name: 'E2'
}, {
  pos: 21,
  hz: 87.3071,
  name: 'F2'
}, {
  pos: 22,
  hz: 92.4986,
  name: 'F♯2/G♭2'
}, {
  pos: 23,
  hz: 97.9989,
  name: 'G2'
}, {
  pos: 24,
  hz: 103.826,
  name: 'G♯2/A♭2'
}, {
  pos: 25,
  hz: 110,
  name: 'A2'
}, {
  pos: 26,
  hz: 116.541,
  name: 'A♯2/B♭2'
}, {
  pos: 27,
  hz: 123.471,
  name: 'B2'
}, {
  pos: 28,
  hz: 130.813,
  name: 'C3'
}, {
  pos: 29,
  hz: 138.591,
  name: 'C♯3/D♭3'
}, {
  pos: 30,
  hz: 146.832,
  name: 'D3'
}, {
  pos: 31,
  hz: 155.563,
  name: 'D♯3/E♭3'
}, {
  pos: 32,
  hz: 164.814,
  name: 'E3'
}, {
  pos: 33,
  hz: 174.614,
  name: 'F3'
}, {
  pos: 34,
  hz: 184.997,
  name: 'F♯3/G♭3'
}, {
  pos: 35,
  hz: 195.998,
  name: 'G3'
}, {
  pos: 36,
  hz: 207.652,
  name: 'G♯3/A♭3'
}, {
  pos: 37,
  hz: 220,
  name: 'A3'
}, {
  pos: 38,
  hz: 233.082,
  name: 'A♯3/B♭3'
}, {
  pos: 39,
  hz: 246.942,
  name: 'B3'
}, {
  pos: 40,
  hz: 261.626,
  name: 'C4 Middle C'
}, {
  pos: 41,
  hz: 277.183,
  name: 'C♯4/D♭4'
}, {
  pos: 42,
  hz: 293.665,
  name: 'D4'
}, {
  pos: 43,
  hz: 311.127,
  name: 'D♯4/E♭4'
}, {
  pos: 44,
  hz: 329.628,
  name: 'E4'
}, {
  pos: 45,
  hz: 349.228,
  name: 'F4'
}, {
  pos: 46,
  hz: 369.994,
  name: 'F♯4/G♭4'
}, {
  pos: 47,
  hz: 391.995,
  name: 'G4'
}, {
  pos: 48,
  hz: 415.305,
  name: 'G♯4/A♭4'
}, {
  pos: 49,
  hz: 440,
  name: 'A4 A440'
}, {
  pos: 50,
  hz: 466.164,
  name: 'A♯4/B♭4'
}, {
  pos: 51,
  hz: 493.883,
  name: 'B4'
}, {
  pos: 52,
  hz: 523.251,
  name: 'C5 Tenor C'
}, {
  pos: 53,
  hz: 554.365,
  name: 'C♯5/D♭5'
}, {
  pos: 54,
  hz: 587.33,
  name: 'D5'
}, {
  pos: 55,
  hz: 622.254,
  name: 'D♯5/E♭5'
}, {
  pos: 56,
  hz: 659.255,
  name: 'E5'
}, {
  pos: 57,
  hz: 698.456,
  name: 'F5'
}, {
  pos: 58,
  hz: 739.989,
  name: 'F♯5/G♭5'
}, {
  pos: 59,
  hz: 783.991,
  name: 'G5'
}, {
  pos: 60,
  hz: 830.609,
  name: 'G♯5/A♭5'
}, {
  pos: 61,
  hz: 880,
  name: 'A5'
}, {
  pos: 62,
  hz: 932.328,
  name: 'A♯5/B♭5'
}, {
  pos: 63,
  hz: 987.767,
  name: 'B5'
}, {
  pos: 64,
  hz: 1046.5,
  name: 'C6 Soprano C(High C)'
}, {
  pos: 65,
  hz: 1108.73,
  name: 'C♯6/D♭6'
}, {
  pos: 66,
  hz: 1174.66,
  name: 'D6'
}, {
  pos: 67,
  hz: 1244.51,
  name: 'D♯6/E♭6'
}, {
  pos: 68,
  hz: 1318.51,
  name: 'E6'
}, {
  pos: 69,
  hz: 1396.91,
  name: 'F6'
}, {
  pos: 70,
  hz: 1479.98,
  name: 'F♯6/G♭6'
}, {
  pos: 71,
  hz: 1567.98,
  name: 'G6'
}, {
  pos: 72,
  hz: 1661.22,
  name: 'G♯6/A♭6'
}, {
  pos: 73,
  hz: 1760,
  name: 'A6'
}, {
  pos: 74,
  hz: 1864.66,
  name: 'A♯6/B♭6'
}, {
  pos: 75,
  hz: 1975.53,
  name: 'B6'
}, {
  pos: 76,
  hz: 2093,
  name: 'C7 Double high C'
}, {
  pos: 77,
  hz: 2217.46,
  name: 'C♯7/D♭7'
}, {
  pos: 78,
  hz: 2349.32,
  name: 'D7'
}, {
  pos: 79,
  hz: 2489.02,
  name: 'D♯7/E♭7'
}, {
  pos: 80,
  hz: 2637.02,
  name: 'E7'
}, {
  pos: 81,
  hz: 2793.83,
  name: 'F7'
}, {
  pos: 82,
  hz: 2959.96,
  name: 'F♯7/G♭7'
}, {
  pos: 83,
  hz: 3135.96,
  name: 'G7'
}, {
  pos: 84,
  hz: 3322.44,
  name: 'G♯7/A♭7'
}, {
  pos: 85,
  hz: 3520,
  name: 'A7'
}, {
  pos: 86,
  hz: 3729.31,
  name: 'A♯7/B♭7'
}, {
  pos: 87,
  hz: 3951.07,
  name: 'B7'
}, {
  pos: 88,
  hz: 4186.01,
  name: 'C8 Eighth octave'
}];
exports.KEYS = KEYS;
},{}],"src/Audio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SmartArray = _interopRequireDefault(require("./SmartArray"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Audio = /*#__PURE__*/function () {
  function Audio(elementsRefs) {
    _classCallCheck(this, Audio);

    this.pitchSamples = new _SmartArray.default();
    this.elementsRefs = elementsRefs;
  }

  _createClass(Audio, [{
    key: "drawPitchMarkers",
    value: function drawPitchMarkers(canvas2Context) {
      canvas2Context.fillStyle = 'firebrick';
      canvas2Context.font = '14px serif';

      for (var i = 25; i < 1200; i += 25) {
        var pos = i / 2;
        canvas2Context.fillRect(65, pos, 4, 1);
        canvas2Context.fillText(i.toString(), 70, pos + 5);
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      var audioReady = false;
      var loudEnough = false;
      var MIN_VOLUME = 5;
      var ref = document.location.pathname.replace(/^\//, '');
      var audioContext = new window.AudioContext();
      var audioEl = this.elementsRefs[ref] || document.querySelector('audio');
      var analyser = audioContext.createAnalyser();
      var sampleRate = audioContext.sampleRate;
      analyser.fftSize = 2048;
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);
      var canvasContext = this.elementsRefs.canvas.getContext('2d');
      var userMediaConstraints = {
        audio: true
      };

      var getUserMediaSuccess = function getUserMediaSuccess(stream) {
        var audioSource = audioContext.createMediaStreamSource(stream);
        _this.elementsRefs.mic_audio.src = audioSource;
        audioSource.connect(analyser); // comment/uncomment to play to speakers
        // audioSource.connect(audioContext.destination); // out to the speakers

        audioReady = true;
      };

      var getUserMediaError = function getUserMediaError(err) {
        err && console.error(err);
      };

      navigator.getUserMedia(userMediaConstraints, getUserMediaSuccess, getUserMediaError);
      var lastItem = 0;
      var STEPS_THRESHOLD = 5;

      var getKey = function getKey() {
        var pitch = _this.pitchSamples.mode;
        var closestLower = _constants.KEYS[0];
        var closestHigher = _constants.KEYS[_constants.KEYS.length - 1];

        for (var i = 0; i < _constants.KEYS.length; i++) {
          if (_constants.KEYS[i].hz < pitch) closestLower = _constants.KEYS[i];

          if (_constants.KEYS[i].hz > pitch) {
            closestHigher = _constants.KEYS[i];
            break; // going from low to high so we can stop here
          }
        }

        var distanceToLower = Math.abs(pitch - closestLower.hz);
        var distanceToHigher = Math.abs(pitch - closestHigher.hz);
        return Math.min(distanceToLower, distanceToHigher) === distanceToLower ? closestLower : closestHigher;
      };

      var renderKey = function renderKey() {
        var key = getKey();
        var keyEls = document.querySelectorAll('[piano-key]');

        var _iterator = _createForOfIteratorHelper(keyEls),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var keyEl = _step.value;
            keyEl.style.fill = '';
            keyEl.classList.remove('piano-key--lit');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var pressedKeyEl = _this.elementsRefs["key_".concat(key.pos)];

        pressedKeyEl.classList.add('piano-key--lit');

        _this.pitchSamples.empty();
      };

      var drawWave = function drawWave() {
        if (!loudEnough) return;
        canvasContext.fillStyle = 'firebrick';
        analyser.getByteTimeDomainData(dataArray);
        canvasContext.fillRect(0, 128, 1024, 2);
        var lastPos = 0;
        dataArray.forEach(function (item, i) {
          if (i > 0 && i < dataArray.length && item > 128 && lastItem <= 128) {
            var elapsedSteps = i - lastPos;
            lastPos = i;

            if (elapsedSteps > STEPS_THRESHOLD) {
              var hertz = 1 / (elapsedSteps / sampleRate); // sampleRate = 44100

              _this.pitchSamples.push(hertz);
            }
          }

          canvasContext.fillRect(i, item, 2, 2); // point in the wave

          lastItem = item;
        });
      };

      var drawFreq = function drawFreq() {
        canvasContext.fillStyle = 'lightgray';
        analyser.getByteFrequencyData(dataArray);
        var volumeTotal = 0;
        canvasContext.fillRect(0, 300 - 256 / 10, 1024, 1);
        dataArray.forEach(function (item, i) {
          canvasContext.fillRect(i, 300 - item, 1, item);
          volumeTotal += item;
        });
        var volume = volumeTotal / dataArray.length;
        var nowLoudEnough = volume > MIN_VOLUME;

        if (loudEnough !== nowLoudEnough) {
          _this.pitchSamples.empty();
        }

        loudEnough = nowLoudEnough;
        _this.elementsRefs.db.textContent = volume;
      };

      var renderAudio = function renderAudio() {
        window.requestAnimationFrame(renderAudio);
        if (!audioReady) return;
        canvasContext.clearRect(0, 0, 1024, 300);
        drawFreq();
        drawWave();
      };

      renderAudio();
      setInterval(function () {
        loudEnough && renderKey();
      }, 250);
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 32) {
          // space
          audioEl.paused ? audioEl.play() : audioEl.pause();
        }
      });
      audioEl.play();
    }
  }]);

  return Audio;
}();

var _default = Audio;
exports.default = _default;
},{"./SmartArray":"src/SmartArray.js","./constants":"src/constants.js"}],"src/Piano.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var COLORS = {
  EBONY: 'ebony',
  IVORY: 'ivory'
};
var SHIFTS = {
  LEFT: 'LEFT',
  MIDDLE: 'MIDDLE',
  RIGHT: 'RIGHT'
};

function getKeyDeets(keyPos) {
  var key = keyPos % 12;
  var shift;
  var color;

  if (key === 2 || key === 7) {
    shift = SHIFTS.RIGHT;
    color = COLORS.EBONY;
  } else if (key === 5 || key === 10) {
    shift = SHIFTS.LEFT;
    color = COLORS.EBONY;
  } else if (key === 0) {
    shift = SHIFTS.MIDDLE;
    color = COLORS.EBONY;
  } else {
    shift = null;
    color = COLORS.IVORY;
  }

  return {
    shift: shift,
    color: color
  };
}

var Piano = /*#__PURE__*/function () {
  function Piano(refs) {
    _classCallCheck(this, Piano);

    this.refs = refs;
  }

  _createClass(Piano, [{
    key: "render",
    value: function render() {
      // key dimensions from http://www.rwgiangiulio.com/construction/manual/
      var pianoEl = this.refs.piano;
      var ns = 'http://www.w3.org/2000/svg';
      var left = 0;
      var blackKeyGroup = document.createElementNS(ns, 'g');
      var whiteKeyGroup = document.createElementNS(ns, 'g');

      _constants.KEYS.forEach(function (key) {
        var keyRect = document.createElementNS(ns, 'rect');
        var keyDeets = getKeyDeets(key.pos);
        var x = left;
        var height = 125;
        var width = 22;

        if (keyDeets.color === COLORS.EBONY) {
          height -= 45;
          width = 11;

          if (keyDeets.shift === SHIFTS.LEFT) {
            x = left - 7;
          } else if (keyDeets.shift === SHIFTS.MIDDLE) {
            x = left - 5;
          } else if (keyDeets.shift === SHIFTS.RIGHT) {
            x = left - 3;
          } else {
            console.warn('SHIFT was not set');
          }
        } else {
          left += 22;
          var keyText = document.createElementNS(ns, 'text');
          keyText.textContent = key.pos;
          keyText.setAttribute('x', x + width / 2);
          keyText.setAttribute('y', 10);
          keyText.setAttribute('text-anchor', 'middle');
          whiteKeyGroup.appendChild(keyText);
        }

        keyRect.setAttribute('rx', 2);
        keyRect.setAttribute('x', x);
        keyRect.setAttribute('y', 14);
        keyRect.setAttribute('width', width);
        keyRect.setAttribute('height', height);
        keyRect.setAttribute('data-ref', "key_".concat(key.pos));
        keyRect.setAttribute('piano-key', true);
        keyRect.classList.add('piano-key');
        keyRect.classList.add("piano-key--".concat(keyDeets.color));

        if (keyDeets.color === COLORS.EBONY) {
          blackKeyGroup.appendChild(keyRect);
        } else {
          whiteKeyGroup.appendChild(keyRect);
        }
      });

      pianoEl.appendChild(whiteKeyGroup);
      pianoEl.appendChild(blackKeyGroup);
    }
  }]);

  return Piano;
}();

var _default = Piano;
exports.default = _default;
},{"./constants":"src/constants.js"}],"src/RefManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RefManager = /*#__PURE__*/function () {
  function RefManager(refs) {
    _classCallCheck(this, RefManager);

    this.refs = refs || {};
  }

  _createClass(RefManager, [{
    key: "getRefs",
    value: function getRefs() {
      var refEls = document.querySelectorAll('[data-ref]');

      var _iterator = _createForOfIteratorHelper(refEls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var refEl = _step.value;
          var ref = refEl.getAttribute('data-ref');
          this.refs[ref] = refEl;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return RefManager;
}();

var _default = RefManager;
exports.default = _default;
},{}],"src/start.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Audio = _interopRequireDefault(require("./Audio"));

var _Piano = _interopRequireDefault(require("./Piano"));

var _RefManager = _interopRequireDefault(require("./RefManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = function start() {
  // build the refs after rendering the piano
  var refManager = new _RefManager.default();
  refManager.getRefs();
  var piano = new _Piano.default(refManager.refs);
  piano.render();
  refManager.getRefs();
  var audio = new _Audio.default(refManager.refs);
  audio.start();
};

var _default = start;
exports.default = _default;
},{"./Audio":"src/Audio.js","./Piano":"src/Piano.js","./RefManager":"src/RefManager.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _start = _interopRequireDefault(require("./start"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _start.default)();
},{"./start":"src/start.js"}],"../../.nvm/versions/node/v12.9.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34239" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.nvm/versions/node/v12.9.1/lib/node_modules/parcel/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map