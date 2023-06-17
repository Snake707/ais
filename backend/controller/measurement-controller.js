const measurementService = require("../services/measurement-service")
const irrigationService = require("../services/irrigation-service")

exports.getLastMinuteMeasurements = async (req, res, next) => {
    let date = new Date();
    const queryFilter = {
        sensorName: req.params.sensorName,
        timestamp: {
            $lte: date,
            $gte: new Date(new Date().setMinutes(date.getMinutes() - 1))
        }
    }
    res.json(await measurementService.getSecondlyMeasurements(queryFilter));
};

exports.getLastHourMeasurements = async (req, res, next) => {
    let date = new Date();
    const queryFilter = {
        sensorName: req.params.sensorName,
        timestamp: {
            $lte: date,
            $gte: new Date(new Date().setHours(date.getHours() - 1))
        }
    }
    res.json(await measurementService.getSecondlyMeasurements(queryFilter));
};

exports.getLastDayMeasurements = async (req, res, next) => {
    let date = new Date();
    const queryFilter = {
        sensorName: req.params.sensorName,
        timestamp: {
            $lte: date,
            $gte: new Date(new Date().setDate(date.getDate() - 1))
        }
    }
    res.json(await measurementService.getSecondlyMeasurements(queryFilter));
};

exports.getLastWeekMeasurements = async (req, res, next) => {
    let date = new Date();
    const queryFilter = {
        sensorName: req.params.sensorName,
        timestamp: {
            $lte: date,
            $gte: new Date(new Date().setDate(date.getDate() - 4))
        }
    }
    res.json(await measurementService.getSecondlyMeasurements(queryFilter));
};

exports.getLastMonthMeasurements = async (req, res, next) => {
    const queryFilter = {
        sensorName: req.params.sensorName,
        timestamp: {
            $lte: new Date(),
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
    }
    res.json(await measurementService.getSecondlyMeasurements(queryFilter));
};

exports.getAllMeasurements = async (req, res, next) => {
    const queryFilter = {
        sensorName: req.params.sensorName
    }
    res.json(await measurementService.getSecondlyMeasurements(queryFilter));
};

exports.setMeasurement = async (req, res, next) => {
    console.log(req.body.capacity)
    const result = await measurementService.setMeasurement(req.body.capacity, req.params.sensorName);
    const irrigated = await irrigationService.irrigateIfNeeded(req.body.capacity, req.params.sensorName);
    res.json({ ...result, irrigated })
};
