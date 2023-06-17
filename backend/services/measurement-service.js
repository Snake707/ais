const DailyMeasurement = require("../models/measurements/daily-measurement");
const HourlyMeasurement = require("../models/measurements/hourly-measurement");
const MinutelyMeasurement = require("../models/measurements/minutely-measurement");
const SecondlyMeasurement = require("../models/measurements/secondly-measurement");

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;

exports.setMeasurement = async (capacity, sensorName) => {
    const currentDate = new Date();

    let result = [];
    result.push(await updateMeasurement(SecondlyMeasurement, currentDate, capacity, sensorName));

    return result;
};

const updateMeasurement = async (collection, timestamp, capacity, sensorName) => {
    return await collection.updateOne({
        timestamp
    }, {
        capacity,
        sensorName
    }, {
        upsert: true,
    })
}

exports.getDailyMeasurements = async (queryFilter) => {
    return await DailyMeasurement.find(queryFilter);
};

exports.getHourlyMeasurements = async (queryFilter) => {
    return await HourlyMeasurement.find(queryFilter);
};

exports.getMinutelyMeasurements = async (queryFilter) => {
    return await MinutelyMeasurement.find(queryFilter);
};

exports.getSecondlyMeasurements = async (queryFilter) => {
    return await SecondlyMeasurement.find(queryFilter);
};
