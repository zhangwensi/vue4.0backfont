let mysql = require('mysql')
// 数据库连接池

let pool = mysql.createPool({
    host: '121.36.254.183',
    port:'3306',
    database:'platform',
    user:'root',
    password:'Jrh20060607+'
})

let sqlConnection =function(sql,sqlArr,callback){
    pool.getConnection((error,connection)=>{
        if(error) {
            console.log('连接数据库失败'+error)
            // connection.release()
            return
        } else {
            // 事件回掉驱动
            connection.query(sql,sqlArr,callback)
            // 释放数据库
            connection.release()
        }
    })
}
module.exports = {pool,sqlConnection};
