const express = require ('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
// const connection =require('./sqldb')
const tableList = require('./api/getList')
const userInfo = require('./api/login')
const deletList = require('./api/delList')
const addList = require('./api/addNews')
const editeSh = require('./api/editSearch')
const getUser = require('./api/getUser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 对应不同的请求头做处理
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const username = ''

// // 获取验证码接口
// app.post('/api/getSms',tableList.getList)
app.post('/api/getSms',jsonParser,(req,res)=>{
  // 测试数据库连接
    // connection.query('select * from userinfo',function(error,results,fields){
    //   console.log(results)
    // })
    // console.dir(req.body)
    if(!req.body.username) {
        return res.status(400).send({message: '邮箱不能为空',resCode: 400})
    }
    if(req.body.username) {
        // 模拟将随机生成的验证码发送至req.body.username邮箱中
        return res.status(200).send({message:'验证码已发送成功',resCode: 0})
    }
})

// 注册接口
// app.post('/api/register',jsonParser,(req,res)=>{
//     console.dir(req.body)
//     // 链接数据库写入库中，校验传入邮箱是否有注册 建议返回码提供参数 message,resCode,type(用来提示框使用) 
//     return res.status(200).send({message:'注册成功,请重新登录',resCode: 0})
// })

app.post('/api/register',userInfo.register)


// 登录接口
// app.post('/api/Login',jsonParser,(req,res)=>{
//     // 判断是否有存在的则登录成功  并且返回一个token
//     console.dir(req.body)
//     const useInfo = req.body.username
//     const userTk = Math.random().toString(36).substr(2)
//     return res.status(200).send({message:'登录成功',resCode: 0,token: userTk,username: useInfo})
// })
app.post('/api/Login',userInfo.login)

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
                    id: 2,
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
                    id: 1,
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
                    id: 3,
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
app.post('/api/news/Addnews',addList.addList)
// 修改新闻列表接口
app.post('/api/editNews',addList.editList)
// app.post('/api/news/Addnews',jsonParser,(req,res)=>{
//   let reqData = req.body
//   return res.status(200).send({
//     message:"添加成功",
//     resCode: 0,
//     data:{type:reqData.type,title:reqData.title,content:reqData.content}
//   })
// })
// 获取信息列表
app.post('/api/getList',tableList.getList)
// app.post('/api/getList',jsonParser,(req,res)=>{
//   let dataList = [
//     {title: '上海市普陀区金沙江路 1516 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员',id:155},
//     {title: "上海市普陀区金沙江路 1517 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:156},
//     {title: "上海市普陀区金沙江路 1518 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:157},
//     {title: "可以获取到 row, column, $index 和 store（table 内部的状态管理）",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:158},
//     {title: '上海市普陀区金沙江路 1519 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员',id:320},
//     {title: "上海市普陀区金沙江路 1526 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:245},
//     {title: "上海市普陀区金沙江路 1536 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:1554},
//     {title: '上海市普陀区金沙江路 1546 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员',id:332},
//     {title: "上海市普陀区金沙江路 1556 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:154},
//     {title: "上海市普陀区金沙江路 1566 弄",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:9851},
//     {title: "习大大",category: "国内信息",date: '2020-01-09 16:25:32',user: "管理员",id:1547},
//     {title: '上海市普陀区金沙江路 1576 弄',category: '国内信息',date: '2020-01-09 16:25:32',user: '管理员',id:3332}
//   ]
//   let total = dataList.length
//   let currentPage = req.body.pageNumber
//   let pageSize = req.body.pageSize
//   const newDataList = []
//   if(pageSize == 10 && currentPage == 1 ) {
//     newDataList.push(dataList.slice(0,9))
//   } else if(pageSize == 10 && currentPage == 2) {
//     newDataList.push(dataList.slice(10,12))
//   }
//   return res.status(200).send({
//     message:"获取成功",
//     resCode: 0,
//     data:{data:newDataList},
//     total:total
//   })
// })
// app.post('/api/deletList',jsonParser,(req,res)=>{
//   let Id = req.body.id
//   return res.status(200).send({
//     message:"删除成功",
//     resCode: 0,
//     data:{id:Id}
//   })
// })
app.post('/api/deletList',deletList.delList)

app.post('/api/aaa',jsonParser,(req,res)=>{
  return res.status(200).send({data:[{id:1,title:'xxx'},{id:2,title:'sss'}]})
})
app.post('/api/editeSearch',editeSh.editSearch)

// 查询用户信息
app.get('/api/getUser',getUser.getUserDate)

app.listen(3300)
