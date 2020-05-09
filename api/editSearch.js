const dbEditSearch = require('../utils/mysqldb')

const editSearch =(req,res)=>{
    let id = req.body.id
    sqlArr = ''
    sql = `select * from getList where categoryId='${id}'`
    var callback = (error,data) =>{
        if(error) {
            console.log("数据库连接失败"+error)
            res.status(200).send({resCode:1,msg:"数据库连接失败"+error})
        } else {
            res.status(200).send({message:'请求成功',resCode: 0,data:data})
        }
        flag = false
    }
    dbEditSearch.sqlConnection(sql,sqlArr,callback)
}



module.exports={editSearch}