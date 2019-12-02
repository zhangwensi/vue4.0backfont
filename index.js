const express = require ('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')

app.use(cors())

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// 对应不同的请求头做处理
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

// 获取验证码接口
app.post('/api/getSms',jsonParser,(req,res)=>{
    console.dir(req.body)
    if(!req.body.username) {
        return res.status(400).send({message: '邮箱不能为空',resCode: 400})
    }
    if(req.body.username) {
        // 模拟将随机生成的验证码发送至req.body.username邮箱中
        return res.status(200).send({message:'验证码已发送成功',resCode: 0})
    }
})

// 注册接口
app.post('/api/register',jsonParser,(req,res)=>{
    // 链接数据库写入库中，校验传入邮箱是否有注册 建议返回码提供参数 message,resCode,type(用来提示框使用)
    return res.status(200).send({message:'注册成功,请重新登录',resCode: 0})
})

// 登录接口
app.post('/api/Login',jsonParser,(req,res)=>{
    // 判断是否有存在的则登录成功
    return res.status(200).send({message:'登录成功',resCode: 0})
})
app.listen(3000)