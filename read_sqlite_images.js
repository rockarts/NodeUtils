const readChunk = require('read-chunk'); // npm install read-chunk 
const imageType = require('image-type');
var fs = require("fs");
var file = "test.sqlite";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file, sqlite3.OPEN_READONLY);

db.serialize(function() {
    db.each("SELECT id, picture FROM route where picture is not null", function(err, row) {
       //console.log(row.id + ".jpg");
       

        fs.writeFile(row.id + ".img", row.picture, function(err) {
            if(err) {
                return console.log(err);
            }else{
                const buffer = readChunk.sync(row.id + '.img', 0, 12);
                console.log(row.id + '.img');
                console.log(imageType(buffer));
                if(imageType(buffer) != null) {
                    if(imageType(buffer).ext == 'jpg') {
                        console.log("JPEG!");
                        fs.rename(row.id + ".img", row.id + ".jpg", function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        });
                    }
                    if(imageType(buffer).ext == 'png') {
                        console.log("PNG!");
                        fs.rename(row.id + ".img", row.id + ".png", function(err) {
                            if(err) {
                                return console.log(err);
                            }
                        });
                    }
                }
            }
        });
    });
});

db.close();
