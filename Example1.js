var http = require("http");
var firmata = require("firmata");

console.log("Starting the code");

var board = new firmata.Board("/dev/ttyACM0", function(){// ACM (Abstract Control Model) for serial communication with Arduino (could be USB)
    console.log("Connecting to arduino");
    console.log("Activation of pin 8");
    console.log("Activation of pin 13");
    
    board.pinMode(8, board.MODES.OUTPUT);
    board.pinMode(13, board.MODES.OUTPUT); // Configures the specified pin to behave either as an input or an output. Pin 13 as out
});

http.createServer(function(req, res){ // http.createServer([requestListener]) | The requestListener is a function which is automatically added to the 'request' event.
    var parts = req.url.split("/"), // split request url on "/" character
    operator1 = parseInt(parts[1],10); // 10 is radix - decimal notation; the base in mathematical numeral systems (from 2 to 36)
    operator2 = parseInt(parts[2],10);    
        
    if (operator1 == 0) {
        //board.digitalWrite(13, board.LOW);
        board.digitalWrite(8, board.LOW);
        console.log("Putting LED to OFF");
    }
    if (operator1 == 1) {
       // board.digitalWrite(13, board.HIGH);
        board.digitalWrite(8, board.HIGH);
        console.log("Putting LED to ON");
    }
    if (operator2 == 0) {
        board.digitalWrite(13, board.LOW);
        //board.digitalWrite(13, board.LOW);
    }
    if (operator2 == 1) {
        board.digitalWrite(13, board.HIGH);
        //board.digitalWrite(13, board.HIGH);
    }
    res.writeHead(200, {"Content-Type": "text/plain"}); // 200 is OK
    res.write("For test write into browser e.g. 123.1.2.3:8080/1 \n");
    res.end("The value of operators: " + operator1 + "||" + operator2);
   // res.end("The value of operator: " + operator2);
}).listen(8080, "172.16.22.131"); // listen on port 8080