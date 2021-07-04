const dbUserState = require('../utils/mysqldb')

const userState = (req,res) => {
    // 获取前段传值(id ,state)
    var phone = req.body.phone
    var state = req.body.state
    sql = `update userinfo set state = ${state} where phone = ${phone}`
    sqlArr = []
    let callback = (error, data) => {
        if (error) {
            res.status(200).send({ message: '修改失败，失败原因为' + error })
        } else {
            res.status(200).send({ message: '宝宝真厉害，修改成功！', resCode: 0 })
        }
    }
    dbUserState.sqlConnection(sql, sqlArr, callback)
}

module.exports={userState}