function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
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

module.exports = {
  formatTime: formatTime,
  newTime: newTime,
  debounce: debounce
}
