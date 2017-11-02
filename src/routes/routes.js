var fs = require('fs');

var appRouter = function(app) {
  app.get("/log", function(req, res) {
//    var query = require('url').parse(req.url, true).query;
    var output = "";

    if (req.query.logFile) {
      if (req.query.logStrln || req.query.logStr) {
        var now = new Date();
        var day = now.getDate();
        var month = now.getMonth() + 1;
        var year = now.getFullYear();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        var day0  = ((day < 10) ? "0" : "");
        var month0  = ((month < 10) ? ".0" : "."); 
        var hour0  = ((hour < 10) ? "0" : ""); 
        var minute0  = ((minute < 10) ? ":0" : ":"); 
        var second0  = ((second < 10) ? ":0" : ":"); 
        
        output = day0 + day + month0 + month + "." + year + " " + hour0 + hour + minute0 + minute + second0 + second;

        if (req.query.logLev) {
          output += " - " + req.query.logLev;
        }
        if (req.query.logFct) {
          output += " - " + req.query.logFct;
        }
        if (req.query.logStrln) {
          output += " - " + req.query.logStrln + "\n";
        }
        if (req.query.logStr) {
          output += " - " + req.query.logStr;
        }
      }
      else {
        output = "\n";
      }
          
//      console.log("req.query: %s", JSON.stringify(req.query));

      buffer = new Buffer.from(output);

      logFileName = '/var/log/' + req.query.logFile;
      fs.appendFile(logFileName, buffer);

//      console.log("File written: %s", buffer);
    }
  
    return res.send();
  });
}

module.exports = appRouter;
