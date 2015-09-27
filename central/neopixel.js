var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    //noble.startScanning();
    noble.startScanning(['ccc0']);    
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
    console.log(peripheral);
    connectAndSetUp(peripheral);
});

function connectAndSetUp(peripheral) {

  peripheral.connect(function(error) {

    var serviceUUIDs = ['ccc0'];
    var characteristicUUIDs = ['ccc1']; // color

    peripheral.discoverSomeServicesAndCharacteristics(serviceUUIDs, characteristicUUIDs, onServicesAndCharacteristicsDiscovered);
  });

  // attach disconnect handler
  peripheral.on('disconnect', onDisconnect);
}

function onDisconnect() {
  console.log('Peripheral disconnected!');
}

function onServicesAndCharacteristicsDiscovered(error, services, characteristics) {
  
  if (error) {
    console.log('Error discovering services and characteristics ' + error);
    return;
  }
  
  var colorCharacteristic = characteristics[0];
  
  function sendData(red, green, blue) {
console.log("sending data");
      var buffer = new Buffer(3);
      buffer[0] = red;
      buffer[1] = green;
      buffer[2] = blue;
      colorCharacteristic.write(buffer, false, function(error) {
          if (error) {
              console.log(error);
          } else {
              console.log("sent new color");            
          }
      });    
  }

  sendData(0,255,0);

  var intervalId = setInterval(function() {
     sendData(255,0,0);
  }, 3000);
 
  var intervalId2 = setInterval(function() {
     sendData(0,0,255);
  }, 1700);


}

