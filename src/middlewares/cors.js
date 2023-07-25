const HomeModel = require("../models/homeModel");
const {responseGenerator} = require("../utilities/response");

const cors = async (req, res, next) => {
    try {
        const allowedOrigins = (await HomeModel.find({}, 'endpoint'))
            .map(d => d.endpoint);
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        const origin = req.headers.origin;
        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,HEAD,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers",
            "language,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Cache-Control,X-Auth-Token,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization");
        res.header("Access-Control-Expose-Headers", "X-Auth-Token");
        next();
    } catch (e) {
        return responseGenerator(req, res, 'internalServerError', e.message);
    }
}
module.exports = cors;
