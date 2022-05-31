var moment = require('moment');

module.exports = (date) => {

    var formatDate = moment(date).format("LLLL");

    return formatDate;
}
