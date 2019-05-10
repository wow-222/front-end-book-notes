class Car{
  constructor(num) {
    this.num = num;
  }
}


// 摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}

// 出口显示屏
class Screen {
  shot(car, inTime) {
    console.log(`车牌号：${car.num}`);
    console.log(`停车时间：${Date.now() - inTime}`);
  }
}

// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || [];
    this.camera = new Camera();
    this.screen = new Screen();
    this.carList = {};  // 存储摄像头拍摄返回的车辆信息
  }
  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car);
    // 停到某个停车位
    const i = parseInt(Math.random() * 100 % 100);
    const place = this.floor[0].places[i];
    place.in();
    info.place = place;
    // 记录信息
    this.carList[car.num] = info;
  }
  out(car) {

  }
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index}层还有${floor.emptyPlaceNum()}个空闲车位`
    }).join('\n');
  }
}

// 层
class Foor {
  constructor(index, places) {
    this.index = index;
    this.places = places || [];
  }
  emptyPlaceNum() {
    let num = 0;
    this.places.forEach(p => {
      if(p.empty) {
        num += 1;
      }
    });
    return num;
  }
}

// 车位
class Place {
  constructor() {
    this.empty = true;
  }
  in() {
    this.empty = false;
  }
  out() {
    this.empty = true;
  }
}