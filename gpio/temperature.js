//
// Getting all sensors data...
//
// @chamerling
//

var sensor = require('ds18b20');

sensor.sensors(function(err, ids) {
  if (err) {
    console.log('Can not get sensor IDs', err);
  } else {
    console.log(ids);
    for (var id in ids) {
      sensor.temperature(ids[id], function(err, result) {
        if (err) {
          console.log('Can not get temperature from sensor', err);
        } else {
          console.log('Sensor ' + ids[id] + ' :', result);
        }
      });
    }
  }
});

sensor.sensors(function(err, ids) {
  if (err) {
    console.log('Can not get sensor IDs', err);
  } else {
    console.log(ids);
    for (var id in ids) {
       sensor.temperature(ids[id], function(err, value) {
         console.log('Current temperature is', value);
       });
       //console.log('Sensor ' + ids[id] + ' :' + sensor.temperatureSync(ids[id]));
    }
  }
});
