const HomeModel = require("../models/homeModel");
const {responseGenerator} = require("../utilities/response");
const {bot} = require("../utilities/telegramBot");

exports.smokeEventHandler = async (req, res) => {
    try {
        let {home} = req.params;
        let {room} = req.query;
        let doc = await HomeModel.findOne({home: home});
        if (doc) {
            let message = `There is an smoke alarm in room ${room}`;
            await bot.sendMessage(doc.userId, message);
            await bot.sendMessage(doc.careGiverId, message);
            console.log("calling 911 ...");
            let log = [{
                receiver: 'user',
                reason: 'smokeDetection',
                room: room
            },
                {
                    receiver: 'caregiver',
                    reason: 'smokeDetection',
                    room: room
                },
                {
                    receiver: '911',
                    reason: 'smokeDetection',
                    room: room
                }];
            doc.emergencyCalls.push(...log);
            await doc.save();
            return responseGenerator(req, res);

        } else {
            return responseGenerator(req, res, 'homeNotExist');
        }
    } catch (e) {
        return responseGenerator(req, res, 'internalServerError', e.message);
    }
};

exports.pillNotTakenEventHandler = async (req, res) => {
    try {
        let {home} = req.params;
        let doc = await HomeModel.findOne({home: home});
        if (doc) {
            let message = 'The user did not response to taking pill. ' +
                'Please contact them and make sure everything is fine!';
            await bot.sendMessage(doc.careGiverId, message);
            let log = {
                receiver: 'caregiver',
                reason: 'pillNotTaken',
            };
            doc.emergencyCalls.push(log);
            await doc.save();
            return responseGenerator(req, res);
        } else {
            return responseGenerator(req, res, 'homeNotExist');
        }
    } catch (e) {
        return responseGenerator(req, res, 'internalServerError', e.message);
    }
};

exports.mowedEventHandler = async (req, res) => {
    try {
        let {home} = req.params;
        let doc = await HomeModel.findOne({home: home});
        if (doc) {
            let message = 'Your yard is tidy again!';
            doc.mowLawn.push(Date.now());
            await doc.save();
            await bot.sendMessage(doc.userId, message);
            return responseGenerator(req, res);
        } else {
            return responseGenerator(req, res, 'homeNotExist');
        }
    } catch (e) {
        return responseGenerator(req, res, 'internalServerError', e.message);
    }
};

exports.vacuumedEventHandler = async (req, res) => {
    try {
        let {home} = req.params;
        let {room} = req.query;
        let doc = await HomeModel.findOne({home: home});
        if (doc) {
            let message = `room ${room} has been cleaned!`;
            doc.vacuum.push({
                room: room
            });
            await doc.save();
            await bot.sendMessage(doc.userId, message);
            return responseGenerator(req, res);
        } else {
            return responseGenerator(req, res, 'homeNotExist');
        }
        } catch (e) {
        return responseGenerator(req, res, 'internalServerError', e.message);
    }
};
