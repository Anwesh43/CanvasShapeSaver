var fs = require('fs')
class PngSaver {
    saveFile(file_name,data,cb) {
        fs.writeFile(file_name,this.base64toBuf(data),(err)=>{
            if(err == null) {
                cb(err)
            }
        })
    }
    base64toBuf(data) {
        var buf = new Buffer(data,'base64')
        return buf
    }
}
module.exports = PngSaver
