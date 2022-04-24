const { isPrd, isPrdDev } = require('../utils/env')

let filename = 'dev.js'

if (isPrdDev) {
    filename = 'prd-dev.js'
}
if (isPrd) {
    filename = 'prd.js'
}
const conf = require(`./env/${filename}`)

module.exports = conf
