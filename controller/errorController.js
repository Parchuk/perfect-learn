const data = require('../helper/data')

exports.get404 = (req, res, next) => {
    res.status(404).render('404', data)
}