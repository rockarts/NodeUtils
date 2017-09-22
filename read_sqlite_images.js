const readChunk = require('read-chunk'); // npm install read-chunk 
const imageType = require('image-type');
var fs = require("fs");
var file = "test.sqlite";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file, sqlite3.OPEN_READONLY);

db.serialize(function() {
    db.each("SELECT id, picture FROM route where picture is not null", function(err, row) {
        console.log(row.id + ".jpg");
        
        
        fs.writeFile(row.id + ".jpg", row.picture, function(err) {
            if(err) {
                return console.log(err);
            }
        });

        fs.writeFile(row.id + ".png", row.picture, function(err) {
            if(err) {
                return console.log(err);
            }
        });

        const buffer = readChunk.sync('18.png', 0, 12);
        console.log(imageType(buffer));
    });
});

db.close();
