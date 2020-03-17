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
                },
                {
                    id: 13,
                    category_name: "国内信息",
                    children: [
                      {
                        id: 1,
                        category_name: "国内1"
                      },
                      {
                        id: 2,
                        category_name: "国内2"
                      }
                    ]
                },
                {
                    id: 14,
                    category_name: "事件发生",
                    children: [
                      {
                        id: 1,
                        category_name: "211工程"
                      }
                    ]
                }
            ],
        "message": "请求成功"
        }
        })
})

// 删除一级分类接口
app.post('/api/news/DeletFirstCategory',jsonParser,(req,res)=>{
    return res.status(200).send({
        message:"删除成功",
        resCode: 0
        // data 暂时不返回数据
    })
})

//编辑一级分类接口
app.post('/api/news/EditFirstCategory',jsonParser,(req,res)=>{
    let reqData = req.body
    console.dir(reqData)
    return res.status(200).send({
        message:"修改成功",
        resCode: 0,
        data:{category_name:reqData.category_name}
    })
})
// 添加新闻
app.post('/api/news/Addnews',jsonParser,(req,res)=>{
  let reqData = req.body
  return res.status(200).send({
    message:"添加成功",
    resCode: 0,
    data:{type:reqData.type,title:reqData.title,content:reqData.content}
  })
})
// 获取信息列表
app.post('/api/getList',jsonParser,(req,res)=>{
  let dataList = [
    {title: '上海市普陀区金沙江路 1516 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员'},
    {title: "上海市普陀区金沙江路 1516 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: "上海市普陀区金沙江路 1516 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: "可以获取到 row, column, $index 和 store（table 内部的状态管理）",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: '上海市普陀区金沙江路 1516 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员'},
    {title: "上海市普陀区金沙江路 1516 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: "上海市普陀区金沙江路 1516 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: '上海市普陀区金沙江路 1516 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员'},
    {title: "上海市普陀区金沙江路 1516 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: "上海市普陀区金沙江路 1516 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: "可以获取到 row, column, $index 和 store（table 内部的状态管理）",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员"},
    {title: '上海市普陀区金沙江路 1516 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员'}
  ]
  let total = dataList.length
  let currentPage = req.body.pageNumber
  let pageSize = req.body.pageSize
  const newDataList = []
  if(pageSize == 10 && currentPage == 1 ) {
    newDataList.push(dataList.slice(0,9))
  } else if(pageSize == 10 && currentPage == 2) {
    newDataList.push(dataList.slice(10,12))
  }
  return res.status(200).send({
    message:"获取成功",
    resCode: 0,
    data:{data:newDataList},
    total:total
  })
})
app.listen(3000)
