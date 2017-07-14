const express = require('express')
const https = require('https')
const router = express.Router()
const db = require('../db/db.js')

// 保存openid
router.post('/api/user', (req, res) => {
    if (req.body.code) {
        var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret+'&js_code='+ req.body.code +'&grant_type=authorization_code'
    // 这里的appid和secret为小程序的基本信息
        https.get(url, function (responseFromOtherDomain) {
            var contentType = responseFromOtherDomain.headers['content-type'];
            responseFromOtherDomain.on("data", function(responseBody) {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(responseBody);
            });
        })
    }
})

// 上传数据
router.post('/api/info', (req, res) => {
    var keepDays = req.body.keepDays;
    var logs = req.body.logs;
    var logs_length = 0;
    var sum = 0;
    for (var prop in logs) {
        sum = sum + logs[prop];
        logs_length++;
    }
    var point  = (sum / logs_length).toFixed(1);
    let info = {
        openid: req.body.openid,
        name: req.body.name,
        keepDays: keepDays,
        avatarUrl: req.body.avatarUrl,
        point: point,
        logDays: logs_length,
        rank: req.body.rank
    }
    db.Info.findOne({openid: req.body.openid}, function (err, doc) {
        if (doc) {
            // 更新数据
            if (doc.keepDays > keepDays) {
                info.keepDays = doc.keepDays
            }
            db.Info.update({openid: req.body.openid}, info, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send('succeed in updating')
                }
            })
        } else {
            // 创建数据
            new db.Info(info).save()
        }
    })
})



// 获取所有的信息，用于排行榜
router.get('/api/allinfo', (req, res) => {
    db.Info.find({rank: true}).sort({logDays: -1, keepDays: -1, point: -1}).limit(10).exec().then((allInfo) => {
        res.send(allInfo)
    }).catch((err) => {
        console.log(err)
    })
})



// 退出排行榜功能
router.post('/api/changeInfo', (req, res) => {
    var flag = req.body.rank;
    var openid = req.body.openid;
    var update = {rank: flag}
    console.log(flag)
    db.Info.update({openid: openid}, update, function (err,data){
        if (err) {
            console.log(err)
        } else {
            res.status(200).send('succeed in updating flag')
        }
    })
})



module.exports = router