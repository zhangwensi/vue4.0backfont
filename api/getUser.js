const dbUserList = require('../utils/mysqldb')

let getUserDate = (req,res) =>{
    // 接受传入初始页码及显示页数
    let sql = "select * from userinfo"
    let callback=(error,data)=>{
        if(error) {
            res.status(200).send({message:'请求失败，失败原因为'+error})
        }else {
            if(data.length!==0) {
                let userDate = data
                res.status(200).send({message:'请求成功',resCode: 0,data:userDate})
            }else {
                res.status(200).send({message:'数据不存在',resCode: 1})
            }
        }
    }
    dbUserList.sqlConnection(sql,callback)
}

module.exports={getUserDate};