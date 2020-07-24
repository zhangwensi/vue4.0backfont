const dbEditSearch = require('../utils/mysqldb')

// 根据前端传过来的userEmail及phone返回对应数据(本版暂不使用---)

const editUserSearch = (req, res) => {
    // console.dir(req.body)
    // return false
    let phone = req.body.phone
    let userEmail = req.body.userEmail
    sql = `select * from userinfo where phone='${phone}' and email='${userEmail}'`
    var callback = (error,data) => {
        if(error) {
            console.log("数据库连接失败"+error)
            res.status(200).send({resCode:1,msg:"数据库连接失败"+error})
        } else {
            res.status(200).send({message:'请求成功',resCode: 0,data:data})
        }
    }
    dbEditSearch.sqlConnection(sql,[],callback)
}

// 根据前段返回的修改后数据存入数据库中

const submitEdit = (req,res) => {

}

module.exports={editUserSearch,submitEdit}