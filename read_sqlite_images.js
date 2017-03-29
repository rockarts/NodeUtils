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
    });
});

db.close();