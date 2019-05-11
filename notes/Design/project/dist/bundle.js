(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Car = function Car(num) {
    _classCallCheck(this, Car);

    this.num = num;
  }; // 摄像头


  var Camera =
  /*#__PURE__*/
  function () {
    function Camera() {
      _classCallCheck(this, Camera);
    }

    _createClass(Camera, [{
      key: "shot",
      value: function shot(car) {
        return {
          num: car.num,
          inTime: Date.now()
        };
      }
    }]);

    return Camera;
  }(); // 出口显示屏


  var Screen =
  /*#__PURE__*/
  function () {
    function Screen() {
      _classCallCheck(this, Screen);
    }

    _createClass(Screen, [{
      key: "show",
      value: function show(car, inTime) {
        console.log("\u8F66\u724C\u53F7\uFF1A".concat(car.num));
        console.log("\u505C\u8F66\u65F6\u95F4\uFF1A".concat(Date.now() - inTime));
      }
    }]);

    return Screen;
  }(); // 停车场


  var Park =
  /*#__PURE__*/
  function () {
    function Park(floors) {
      _classCallCheck(this, Park);

      this.floors = floors || [];
      this.camera = new Camera();
      this.screen = new Screen();
      this.carList = {}; // 存储摄像头拍摄返回的车辆信息
    }

    _createClass(Park, [{
      key: "in",
      value: function _in(car) {
        // 通过摄像头获取信息
        var info = this.camera.shot(car); // 停到某个停车位

        var i = parseInt(Math.random() * 100 % 100);
        var place = this.floors[0].places[i];
        place["in"]();
        info.place = place; // 记录信息

        this.carList[car.num] = info;
      }
    }, {
      key: "out",
      value: function out(car) {
        // 获取信息
        var info = this.carList[car.num]; // 将停车位清空

        var place = info.place;
        place.out(); // 显示时间

        this.screen.show(car, info.inTime); // 清空记录

        delete this.carList[car.num];
      }
    }, {
      key: "emptyNum",
      value: function emptyNum() {
        return this.floors.map(function (floor) {
          return "".concat(floor.index, "\u5C42\u8FD8\u6709").concat(floor.emptyPlaceNum(), "\u4E2A\u7A7A\u95F2\u8F66\u4F4D");
        }).join('\n');
      }
    }]);

    return Park;
  }(); // 层


  var Floor =
  /*#__PURE__*/
  function () {
    function Floor(index, places) {
      _classCallCheck(this, Floor);

      this.index = index;
      this.places = places || [];
    }

    _createClass(Floor, [{
      key: "emptyPlaceNum",
      value: function emptyPlaceNum() {
        var num = 0;
        this.places.forEach(function (p) {
          if (p.empty) {
            num += 1;
          }
        });
        return num;
      }
    }]);

    return Floor;
  }(); // 车位


  var Place =
  /*#__PURE__*/
  function () {
    function Place() {
      _classCallCheck(this, Place);

      this.empty = true;
    }

    _createClass(Place, [{
      key: "in",
      value: function _in() {
        this.empty = false;
      }
    }, {
      key: "out",
      value: function out() {
        this.empty = true;
      }
    }]);

    return Place;
  }();
  /* - 某停车场，分3层，每层100车位
  - 每个车位都能监控到车辆的驶入和离开
  - 车辆进入前，显示每层的空余车位数量
  - 车辆进入时，摄像头可识别车牌号和时间
  - 车辆出来时，出口显示器显示车牌号和停车时长 */
  // 初始化停车场


  var floors = [];

  for (var i = 0; i < 3; i++) {
    var places = [];

    for (var j = 0; j < 100; j++) {
      places[j] = new Place();
    }

    floors[i] = new Floor(i + 1, places);
  }

  var park = new Park(floors); //初始化车辆

  var car1 = new Car(100);
  var car2 = new Car(200);
  var car3 = new Car(300);
  console.log("\u7B2C\u4E00\u8F86\u8F66\u8FDB\u5165\uFF1A".concat(park.emptyNum()));
  park["in"](car1);
  console.log("\u7B2C\u4E8C\u8F86\u8F66\u8FDB\u5165\uFF1A".concat(park.emptyNum()));
  park["in"](car2);
  console.log("\u7B2C\u4E00\u8F86\u8F66\u79BB\u5F00");
  park.out(car1);
  console.log("\u7B2C\u4E8C\u8F86\u8F66\u79BB\u5F00");
  park.out(car2);
  console.log("\u7B2C\u4E09\u8F86\u8F66\u8FDB\u5165\uFF1A".concat(park.emptyNum()));
  park["in"](car3);
  console.log("\u7B2C\u4E09\u8F86\u8F66\u79BB\u5F00");
  park.out(car3);

}());
