const dbGetlist = require ('../utils/mysqldb')

let getList = (req,res)=>{
    var sql = 'select * from getList'
    var sqlArr = ''
    var callback = (error,data) =>{
        if(error) {
            console.log("11111数据库连接失败")
        } else {
        
           res.status(200).send({message:'验证码已发送成功',resCode: 0,data})
        }
    }
    dbGetlist.sqlConnection(sql,sqlArr,callback)
}

module.exports = {getList};