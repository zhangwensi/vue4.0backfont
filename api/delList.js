const dbDelList = require('../utils/mysqldb')

let flag = false
// 删除指定的数据
const delList = function(req,res){
    // 先将删除的数据插入数据备份表
    const categoryId = req.body.id
    var listbak = ''
    var sqlArr = ''
    const sql = `select * from getList where categoryId = ${categoryId}`
    dbDelList.pool.getConnection((error,connection)=>{
            if(error) {
                console.log('插入预处理失败，失败原因为' + error)
            } else {
                connection.query(sql,sqlArr,(error,result,fields)=>{
                    insert(result[0])
                })
                connection.release()
            }
        })
// 插入数据
    const insert = (item)=>{
            const time = new Date(item.date)
            let reltime = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
            const sql1 = `insert into list_bak (categoryId,category,date,id,title,user) values ('${item.categoryId}','${item.category}','${reltime}','${item.id}','${item.title}','${item.user}')`
            const sqlArr1 = ''
            dbDelList.pool.getConnection((error,connection)=>{
                if(error) {
                    console.log('插入数据失败，原因为'+error)
                } else {
                    connection.query(sql1,sqlArr1,(error,result,fields)=>{
                        if (error) {
                            console.log('处理失败'+error)
                        } else {
                            console.log('数据备份处理成功'+fields)
                            flag = true
                            delData()
                        }
                    })
                    connection.release()
                }
            })
        }
// 删除数据
    const delData = () =>{
        if(flag == true) {
            const sql2 = `delete from getList where categoryId = ${categoryId}`
            const sqlArr2 = ''
            var callback = (error,data) =>{
                if(error) {
                    console.log("数据库连接失败"+error)
                    res.status(200).send({resCode:1,msg:"数据库连接失败"})
                } else {
                console.log(data)
                console.log('111111111')
                   res.status(200).send({message:'删除成功',resCode: 0})
                }
                flag = false
            }
            dbDelList.sqlConnection(sql2,sqlArr2,callback)
        } else {
            console.log('删除失败，失败原因是插入数据失败')
        }
    }
}



module.exports={delList}