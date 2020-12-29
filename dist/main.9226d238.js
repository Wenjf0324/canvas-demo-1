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
})({"epB2":[function(require,module,exports) {
var canvas = document.getElementById("canvas"); //画布的宽高为屏幕的宽高

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "none";
ctx.fillStyle = "black";
ctx.lineWidth = 3;
ctx.lineCap = "round"; //选择画笔颜色

var black = document.querySelector('.black');
var red = document.querySelector('.red');
var orange = document.querySelector('.orange');
var green = document.querySelector('.green');
var purple = document.querySelector('.purple');

black.onclick = function (e) {
  ctx.strokeStyle = "black";
};

red.onclick = function (e) {
  ctx.strokeStyle = "red";
};

orange.onclick = function (e) {
  ctx.strokeStyle = "orange";
};

green.onclick = function (e) {
  ctx.strokeStyle = "green";
};

purple.onclick = function (e) {
  ctx.strokeStyle = "purple";
};

var painting = false;
var last; //上一个坐标点
//检测是否支持触屏

var isTouchDevice = ("ontouchstart" in document.documentElement); //如果是触屏设备

if (isTouchDevice) {
  //获取第0个触碰点
  canvas.ontouchstart = function (e) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    last = [x, y]; //第一个last
  };

  canvas.ontouchmove = function (e) {
    var x = e.touches[0].clientX;
    var y = e.touches[0].clientY;
    drawLine(last[0], last[1], x, y);
    last = [x, y]; //更新上一次的坐标点
  };
} else {
  //如果不是触屏设备
  canvas.onmousedown = function (e) {
    painting = true;
    last = [e.clientX, e.clientY]; //初始化last
  };

  canvas.onmousemove = function (e) {
    if (painting === true) {
      drawLine(last[0], last[1], e.clientX, e.clientY);
      last = [e.clientX, e.clientY]; //更新上一次的坐标点
    }
  };

  canvas.onmouseup = function () {
    painting = false;
  };
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9226d238.js.map