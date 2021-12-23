const csv = require('csvtojson')
const csvFilePathAmenity = './db/Amenity.csv'
const csvFilePathReservations = './db/Reservations.csv'
const express = require("express");
const app = express();
const fs = require("fs");
const itemsJson = require('./amenity.json')
const finalProduct = require('./users.json')

csv({
  delimiter: ";"
})      
  .fromFile(csvFilePathReservations)
    .then((json) => {
        fs.writeFileSync("users.json", JSON.stringify(json), "utf-8", (err) => {
            if (err) console.log(err)
        })
    })

csv({
      delimiter: ";"
    })  
        .fromFile(csvFilePathAmenity)  
        .then((json) => {
            fs.writeFileSync("amenity.json", JSON.stringify(json), "utf-8", (err) => {
                if (err) console.log(err)
            })
        })


let mergedItems = [...finalProduct].map(obj => {
          let items = [...itemsJson].find(item => item.id === obj.amenity_id)
          obj.amenity_id = items
          return {...obj, ...items}
  })


fs.writeFileSync("merged.json", JSON.stringify(mergedItems), "utf-8", (err) => {
          if (err) console.log(err)
      })  

//----------------
app.use(express.static(__dirname ));

const filePath = "merged.json";

app.get("/api/users", function (req, res) {
  let content = fs.readFileSync(filePath, "utf8");
  let users = JSON.parse(content);
  res.send(users);
});

app.listen(3000, function() {
  console.log("Server started");
});
