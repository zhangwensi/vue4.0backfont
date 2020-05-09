const dbGetlist = require ('../utils/mysqldb')


let total =''
// 获取总页数
const pageTotal = function(){
    let sql2 = `select count(*) as cnt from getList`
    let sqlArr2 =''
    dbGetlist.pool.getConnection((error,connection)=>{
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

let getList = (req,res)=>{
    // 先取总条数
    pageTotal()
    // 获取前台传过来的页码以及当前页码
    var currentPage = parseInt(req.body.pageNumber) || 1
    var pageSize = parseInt(req.body.pageSize) || 10
    // var startTiem = parseInt(req.body.startTiem)
    // var endTime = parseInt(req.body.endTime)
    // var sql = "select title,category,date,user,categoryId from getList  limit '"+(currentPage-1)*pageSize+"','"+currentPage*pageSize+"'"
    var sql =  `select * from getList  limit ${(currentPage-1)*pageSize} , ${currentPage*pageSize}`
    var sqlArr = ''
    var callback = (error,data) =>{
        if(error) {
            console.log("数据库连接失败"+error)
            res.status(200).send({resCode:1,msg:"数据库连接失败"})
        } else {
            let newDataList = data
           res.status(200).send({message:'请求成功',resCode: 0,data:newDataList,total})
        }
    }
    dbGetlist.sqlConnection(sql,sqlArr,callback)
}

module.exports = {getList};