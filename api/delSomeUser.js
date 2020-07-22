const delSbUser = require('../utils/mysqldb')

const delInfo = (req, res) => {
    // 获取前端穿过来的phone(数组形式)
    let reqData = ''
    console.dir(req.body.phone)
    if ( req.body.phone ) {
        reqData = req.body.phone
    } else  {
        reqData = req.body.phone.join()
    }
    sql = `select * from userinfo  where phone in (${reqData})`
    sqlArr = []
    delSbUser.pool.getConnection((error, connection) => {
        if (error) {
            console.log('查询用户信息错误')
        } else {
            connection.query(sql,sqlArr,(error,result,fields)=>{
                sqlArr = JSON.parse(JSON.stringify(result))
                if(sqlArr) {
                    sqlArr2 = []
                    sqlArr.forEach((item,i)=>{
                        var _arr = []
                        for (var n in item) {
                            _arr.push(item[n])
                        }
                        sqlArr2.push(_arr)
                    })
                    sql2 = `insert into userinfo_bak (username,password,email,phone,address,role,realname,state) values ?`
                    delSbUser.pool.getConnection((err,connection) => {
                        if(err) {
                            console.log('插入数据不成功')
                        } else {
                            connection.query(sql2,[sqlArr2],(error,result2,fields)=>{
                                if(result2) {
                                    console.log('插入到表userinfo_bak数据成功')
                                    // 删除userinfo表中的数据
                                    sql3 = `delete  from userinfo  where phone in (${reqData})`
                                    sqlArr3 = []
                                    delSbUser.pool.getConnection((err,connection) =>{
                                        if(err) {
                                            console.log(err+'删除源数据不成功')
                                        } else {
                                            connection.query(sql3,sqlArr3,(error,result3,fields) => {
                                                // console.log('sql3'+result) 
                                                console.log(fields)
                                                if (result) {
                                                    res.status(200).send({message:'删除成功',resCode: 0})
                                                } else {
                                                    res.status(200).send({message:'删除失败',resCode: 1})
                                                }
                                            })
                                        }
                                        connection.release()
                                    })
                                } else {
                                    console.log('插入数据不成功'+err)
                                }
                            })
                        }
                        connection.release()
                    })
                } else {

                }
        })
        connection.release()
        }
    })
}

module.exports = {
    delInfo
}