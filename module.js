// 暂时使用免费的mdb
const mongoose = require ('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017',{
    useNewUrlParser: true
})

const User = mongoose.model('Users',new mongoose.Schema({
    username: {type: String,unique: true},
    password: {type: String}
}))

module.exports = { User }