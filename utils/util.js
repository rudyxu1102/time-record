function formatTime(date, count) {
  date.setDate(date.getDate() + count);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}


function dayMoment(date) {
 var hours = date.getHours();
 if (hours < 6) {
   return '凌晨'
 } else if (hours >= 6 && hours < 12) {
    return '早上'
 } else if (hours == 12) {
   return '中午'
 } else if (hours > 12 && hours <= 17) {
   return '下午'
 } else if (hours > 17 && hours <= 18) {
   return '傍晚'
 } else {
   return '晚上'
 }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function compareTime (start, end) {
  var startHour = start.slice(0, 1) !== '0' ? start.slice(0, 2) : start.slice(1, 2);
  var endHour = end.slice(0, 1) !== '0' ? end.slice(0, 2) : end.slice(1, 2);
  var startMin = start.slice(3, 4) !== '0' ? start.slice(-2) : start.slice(-1);
  var endMin = end.slice(3, 4) !== '0' ? end.slice(-2) : end.slice(-1);
  if (endHour == '0') {
    endHour = 24
  }
  if (endHour - 0  > startHour - 0) {
    return true
  } else if (endHour == startHour && endMin > startMin){
    return true
  } else {
    return false
  }
}

// add an hour
function newTime (s) {
  var first = s.slice(0,1);
  var min = s.slice(-2)
  if (first === '0') {
    let second = s.slice(1,2) - 0 + 1; // 转化为数字
    var newString;
    if (second === 10) {
      newString = '10:' + min
    } else {
      newString = '0' + second + ":"+ min;
    }
    return newString
  } else {
    let time = s.slice(0,2) - 0 + 1;
    if (time == 24) {
      return '00:'+min
    }
    let newTime = time+ ':' + min;
    return newTime
  }
}

function deltaTime(start, end) {
  var startHour = start.slice(0, 1) !== '0' ? start.slice(0, 2) : start.slice(1, 2);
  var endHour = end.slice(0, 1) !== '0' ? end.slice(0, 2) : end.slice(1, 2);
  var startMin = start.slice(3, 4) !== '0' ? start.slice(-2) : start.slice(-1);
  var endMin = end.slice(3, 4) !== '0' ? end.slice(-2) : end.slice(-1);
  if (endHour == '0') {
    endHour = 24
  }
  if (startMin > endMin) {
    endHour = endHour - 1;
    endMin = endMin - 0 + 60;
    var deltaHour = endHour - startHour;
    var deltaMin = endMin - startMin;
    var deltaTime = deltaHour * 60 + deltaMin;
    return deltaTime
  } else {
    var deltaHour = endHour - startHour;
    var deltaMin = endMin - startMin;
    var deltaTime = deltaHour * 60 + deltaMin;
    return deltaTime
  }
}

function percentMin (tomorrowMin, todayMin) {
  var percent = todayMin / tomorrowMin;
  var little = percent.toFixed(2)
  return little*100;
}

// 防抖函数，让一个高频触发的函数在一定时间内只触发一次
function debounce(func, wait) {
  let _timestamp, _timer
  return function () {
    let now = Date.now()
    if (_timestamp && ((now - _timestamp) < wait)) {
      clearTimeout(_timer)
    }
    _timestamp = now
    _timer = setTimeout(func.bind(this, ...arguments), wait)
  }
}

function isInteger(obj) {
  return obj % 1 === 0
}

function starColor (point) {
  if (point <= 50) {
    return '#acebb9'
  } else if (point <= 75) {
    return '#83e196'
  } else if (point <= 85) {
    return '#30ce50'
  } else {
    return '#26a540'
  }
}

function makeCalendar(days, firstDay, logs) {
  var arr = [];
  var firstWeek = [];
  var first = 0;
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  for(var i=0; i < 7; i++) {
    if (i < firstDay) {
      var obj = {};
      obj['day'] = ''
      obj['color'] = ''
      firstWeek.push(obj);
    } else {
      var obj = {};
      var key = '';
      first = first + 1;
      key = year + '-' + formatNumber(month) + '-' + formatNumber(first);
      obj['day'] = first;
      if (logs.hasOwnProperty(key)) {
        var color = starColor(logs[key]);
        obj['color'] = color;
      }
      firstWeek.push(obj);
    }
  }
  arr.push(firstWeek);
  let leftWeeks = Math.ceil((days - first) / 7);
  for (var j = 0; j < leftWeeks; j++) {
    var item = [];
    for (var k=0; k < 7; k++) {
      if (first < days) {
        var key = '';
        var obj = {};
        first = first + 1;
        key = year + '-' + formatNumber(month) + '-'  + formatNumber(first);
        obj['day'] = first;
        if (logs.hasOwnProperty(key)) {
          var color = starColor(logs[key]);
          obj['color'] = color;
        }
        item.push(obj);
      } else {
        var obj = {};
        obj['day'] = '';
        obj['color'] = '';
        item.push(obj);
      }
    }
    arr.push(item);
  }
  return arr
}

function getRandColor(brightness){
    // Six levels of brightness from 0 to 5, 0 being the darkest
    var rgb = [Math.random() * 256, Math.random() * 256, Math.random() * 256];
    var mix = [brightness*51, brightness*51, brightness*51]; //51 => 255/5
    var mixedrgb = [rgb[0] + mix[0], rgb[1] + mix[1], rgb[2] + mix[2]].map(function(x){ return Math.round(x/2.0)})
    return "rgb(" + mixedrgb.join(",") + ")";
}

module.exports = {
  formatTime: formatTime,
  newTime: newTime,
  debounce: debounce,
  deltaTime: deltaTime,
  percentMin: percentMin,
  compareTime: compareTime,
  isInteger: isInteger,
  dayMoment: dayMoment,
  makeCalendar: makeCalendar,
  getRandColor: getRandColor
}
