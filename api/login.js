const dbUserinfo = require('../utils/mysqldb')
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

let register =  (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let user = [username,password]
    let sql = 'insert into userinfo (username,password) values (?,?)'
    let callback =(error,data)=>{
        if(error) {
            res.status(200).send({message:'注册失败，失败原因为'+error})
        }else {
            res.status(200).send({message:'注册成功,请重新登录',resCode: 0})
        }
    }
    dbUserinfo.sqlConnection(sql,user,callback)
}


let login = (req,res)=>{
    let username = req.body.username
    let password = req.body.password
    let userTk = Math.random().toString(36).substr(2)
    let sql = "select username,password from userinfo where username='"+username+"'and password='"+password+"'"
    let callback=(error,data)=>{
        if(error) {
            res.status(200).send({message:'登录失败，失败原因为'+error})
        }else {
            if(data.length!==0) {
                let resusername = data[0].username
                res.status(200).send({message:'登录成功',resCode: 0,token: userTk,username:resusername})
            }else {
                res.status(200).send({message:'用户名或密码不正确',resCode: 1})
            }
        }
    }
    dbUserinfo.sqlConnection(sql,callback)
}
module.exports={register,login};