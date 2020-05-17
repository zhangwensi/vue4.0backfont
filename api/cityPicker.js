const fs = require('fs')


// 全国省市区的接口  根据type不同返回不一样的数据
const provincePicker =(req,res) =>{
    let reqData = req.body
    if (!reqData.type) {
        res.status(200).send({resCode:1,msg:'请求失败',data:{msg:'请求参数错误'}})
    }
    // 
    if(reqData.type==='province') {
        let pathPicker = process.cwd()+'/json/province.json'
        try{
            fs.readFile(pathPicker,'utf8',(err,data)=>{
                if (err) {
                    return console.dir(err)
                }
                let  provinceData = JSON.parse(data)
                res.status(200).send({resCode:0,msg:'请求成功',data:provinceData})
            })
        }catch(err){
            // 打印错误信息 入debuger
            console.log(err)
        }finally {
            console.log("province 已执行")
        }
    }else if(reqData.type==='city') {
        let cityPathPicker = process.cwd()+'/json/city.json'
        let cityDatas = []
        try {
            fs.readFile(cityPathPicker,'utf8',(err,data)=>{
                if (err) {
                    return console.dir(err)
                }
                let  cityData = JSON.parse(data)
                cityData.filter(item=>item.province === reqData.province).forEach((key)=>{
                    cityDatas.push(key)
                })
                res.status(200).send({resCode:0,msg:'请求成功',data:cityDatas})
            })
        } catch(err) {
            console.log(err)
        } finally {
            console.log("province 已执行")
        }
    } else if(reqData.type==='area'){
        let areaPathPicker = process.cwd()+'/json/area.json'
        fs.readFile(areaPathPicker,'utf8',(err,data)=>{
            if (err) {
                return console.dir(err)
            }
            let  areaData = JSON.parse(data)
            let midAreaData = areaData.filter(item=>item.province === reqData.province)
            let areaDatas = midAreaData.filter(item=>item.city === reqData.city)
            res.status(200).send({resCode:0,msg:'请求成功',data:areaDatas})
        })
    } else {
        let twonPathPicker = process.cwd()+'/json/town.json'
        try {
        fs.readFile(twonPathPicker,'utf8',(err,data)=>{
            if (err) {
                return console.dir(err)
            }
            let  townData = JSON.parse(data)
            let midTown = townData.filter(item=>item.province === reqData.province)
            let midTownData = midTown.filter(item=>item.city === reqData.city)
            let townDatas = midTownData.filter(item=>item.area === reqData.area)
            res.status(200).send({resCode:0,msg:'请求成功',data:townDatas})
        })
        } catch (err) {
            console.log(err)
        } finally {
            console.log("province 已执行")
        }
    }
}


module.exports = {
    provincePicker
}