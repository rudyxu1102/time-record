function formatTime(date, count) {
  date.setDate(date.getDate() + count);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}

// -年-月
function yearMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1 
  var time = year + '年' + month + '月'
  return time
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
  if (endHour - 0  > startHour - 0) {
    return true
  } else if (endHour == startHour && endMin > startMin){
    return true
  } else {
    return false
  }
}

function newTime (s) {
  var first = s.slice(0,1);
  if (first === '0') {
    let second = s.slice(1,2) - 0 + 1; // 转化为数字
    var newString;
    if (second === 10) {
      newString = '10:00'
    } else {
      newString = '0' + second + ':00';
    }
    return newString
  } else {
    let time = s.slice(0,2) - 0 + 1;
    let newTime = time + ':00';
    return newTime
  }
}

function deltaTime(start, end) {
  var startHour = start.slice(0, 1) !== '0' ? start.slice(0, 2) : start.slice(1, 2);
  var endHour = end.slice(0, 1) !== '0' ? end.slice(0, 2) : end.slice(1, 2);
  var startMin = start.slice(3, 4) !== '0' ? start.slice(-2) : start.slice(-1);
  var endMin = end.slice(3, 4) !== '0' ? end.slice(-2) : end.slice(-1);
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

module.exports = {
  formatTime: formatTime,
  newTime: newTime,
  debounce: debounce,
  deltaTime: deltaTime,
  percentMin: percentMin,
  compareTime: compareTime,
  isInteger: isInteger,
  yearMonth: yearMonth
}
