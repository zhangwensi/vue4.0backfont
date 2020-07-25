const dbUserList = require('../utils/mysqldb')

let total =''
// 获取总页数
const pageTotal = function(){
    let sql2 = `select count(*) as cnt from userinfo `
    let sqlArr2 =''
    dbUserList.pool.getConnection((error,connection)=>{
        if(error) {
            console.log('求其总量连接错误')
        }else {
            connection.query(sql2,sqlArr2,(error,result,fields)=>{
                total = result
            })
            connection.release()
        }
    })
}
const getUserDate = (req,res) =>{
    pageTotal()
    // 接受传入初始页码及显示页数
    // 获取前台传过来的页码以及当前页码
    var currentPage = parseInt(req.body.currentPage) || 1
    var pageSize = parseInt(req.body.pageSize) || 10
    let sql = `select email,phone,address,role,realname,state from userinfo limit ${(currentPage-1)*pageSize} , ${currentPage*pageSize}`
    var sqlArr = ''
    let callback=(error,data)=>{
        if(error) {
            res.status(200).send({message:'请求失败，失败原因为'+error})
        }else {
            if(data.length!==0) {
                let userDate = data
                // 改变total的指向  否则读取的为缓存的值
                let _total= total[0]
                res.status(200).send({message:'请求成功',resCode: 0,data:userDate,total:_total})
            }else {
                res.status(200).send({message:'数据不存在',resCode: 1})
            }
        }
    }
    dbUserList.sqlConnection(sql,sqlArr,callback)
}

module.exports={getUserDate};