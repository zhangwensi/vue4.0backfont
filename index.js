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

const username = ''

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
    console.dir(req.body)
    // 链接数据库写入库中，校验传入邮箱是否有注册 建议返回码提供参数 message,resCode,type(用来提示框使用) 
    return res.status(200).send({message:'注册成功,请重新登录',resCode: 0})
})

// 登录接口
app.post('/api/Login',jsonParser,(req,res)=>{
    // 判断是否有存在的则登录成功  并且返回一个token
    console.dir(req.body)
    const useInfo = req.body.username
    const userTk = Math.random().toString(36).substr(2)
    return res.status(200).send({message:'登录成功',resCode: 0,token: userTk,username: useInfo})
})


// 一级分类接口
app.post('/api/news/AddFirstCategory',jsonParser,(req,res)=>{
    // 先比对请求头中的token与登录的token是否一致 如不匹配直接返回错误否则返回约定的数据
    // 暂时直接返回
    const userIfo = req.headers // 请求头信息  
    const id = Math.floor(Math.random () * 900)
    const cateGory = req.body.categoryName
    return res.status(200).send({message:"添加成功",resCode: 0,data:{category_name:cateGory,id:id,token: userIfo.token,username: userIfo.username}})
})
// 获取一级分类接口
app.post('/api/news/GetFirstCategory',jsonParser,(req,res)=>{
    return res.status(200).send({message:"请求成功",resCode:0,data:{
        "resCode":0,
         "data": 
             [
                {
                    id: 12,
                    category_name: "国际信息",
                    children: [
                      {
                        id: 1,
                        category_name: "哈哈"
                      },
                      {
                        id: 2,
                        category_name: "嘻嘻"
                      }
                    ]
                  }
            ],
        "message": "请求成功"
        }
        })
})
app.listen(3000)
