const dbAddUser = require('../utils/mysqldb')

/**
 * 1.获取前台传入值  直接插入userinfo表中
 * 2.需要注意的是用户地址是数组形式 需转为字符串入库
 */

const addUser = (req, res) => {
    let username = req.body.username || ''
    let email = req.body.email || ''
    let password = req.body.password || ''
    let phone = req.body.phone || ''
    let address = req.body.address || ''
    let role = req.body.role || ''
    let realname = req.body.realname || ''
    let state = req.body.state || 0
    let userinfo = [username, email, password, phone, address, role, realname, state]
    // 开始插入对应的userinfo表中
    let sql = `insert into userinfo (username,email,password,phone,address,role,realname,state) values 
    (?,?,?,?,?,?,?,?)`
    // let sql = `insert into userinfo (username,password,email,phone,address,role,realname,state) values 
    // ('${username}','${password}'，'${email}','${phone}','${address}','${role}','${realname}',${state})`
    let callback = (error, data) => {
        if (error) {
            res.status(200).send({ message: '添加失败，失败原因为' + error })
        } else {
            res.status(200).send({ message: '添加成功！', resCode: 0 })
        }
    }
    dbAddUser.sqlConnection(sql, userinfo, callback)

}


module.exports = { addUser }