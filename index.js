
const exec = require('child_process').exec
const path = require('path')
const rootPath = path.normalize(`${__dirname}`)

const runPromisifiedCommand = async (cmd, showLog = true) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            if(err) reject(err)
            else {
                const rst = stdout ? stdout : stderr
                if(showLog) console.log(rst)
                resolve(rst)
            }
        })
    })
}
runPromisifiedCommand(`node ${rootPath}/data/DataServer.js`)
runPromisifiedCommand(`npm start`)