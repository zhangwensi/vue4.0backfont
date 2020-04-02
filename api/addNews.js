const dbAddList = require('../utils/mysqldb')

/**
 * 1.获取前台传入值  通过list_cfg表判断传入值类型
 * 2.将分类好的数据 插入 getList表
 */

 const addList = (req,res) =>{
    // 获取传入数据
    let id = req.body.type
    let content = req.body.content
    let title = req.body.title
    let type = ''
    let sqlArr =''
    const add0=(m)=>{return m<10?'0'+m:m }
    let time = new Date()
    let reltime = time.getFullYear() + '-' + add0((time.getMonth() + 1)) + '-' + add0(time.getDate()) + ' ' + add0(time.getHours()) + ':' + add0(time.getMinutes()) + ':' + add0(time.getSeconds())
    let key = time.valueOf()
    sql = `select newstype from news_type_cfg where id = ${id}`
    dbAddList.pool.getConnection((error,connection)=>{
       if(error) {
         console.log('数据库连接失败'+error) 
         res.status(200).send({msg:'数据库连接失败',resCode:'1'})
       } else {
          connection.query(sql,sqlArr,(error,result,fields)=>{
             if (error) {
                console.log(error)
             } else {
                type = result[0].newstype
             }
             insert()
          })
          connection.release()
       }
    })
   //  插入数据
    const insert= ()=>{
      let sql2 = `insert into getList (categoryId,category,date,id,title,user) values ('${key}','${type}','${reltime}','${id}','${title}','管理员')`
      // let sqlArr2 = [key,type,reltime,id,title,'管理员']
      let sqlArr2 = []
      let callback = (error,data)=>{
         if(error) {
            console.log(error)
            res.status(200).send({resCode:1,msg:"数据插入失败"})
         } else {
            res.status(200).send({resCode:0,msg:"数据插入成功"})
         }
      }
      dbAddList.sqlConnection(sql2,sqlArr2,callback)
    }
 }

const editList = (req,res)=>{
   let categoryId = req.body.categoryId
   let title = req.body.title
   sql = `update getList set title='${title}'  where categoryId='${categoryId}'`
   sqlArr = ''
   callback = (error,data)=>{
      if(error) {
         console.log(error)
         res.status(200).send({resCode:1,msg:"修改数据失败"})
      } else {
         res.status(200).send({resCode:0,msg:"修改数据成功"})
      }
   }
   dbAddList.sqlConnection(sql,sqlArr,callback)
}
 module.exports = { addList ,editList}