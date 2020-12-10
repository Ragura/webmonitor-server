const request = require("request");

function checkSite(site, io) {
  request(site.url, function (err, response, body) {
    //if the request fail
    if (err) {
      console.log(`Request Error - ${err}`);
    } else {
      //if the target-page content is empty
      if (!body) {
        console.log(`Request Body Error - ${err}`);
      }
      //if the request is successful
      else {
        //if any elementsToSearchFor exist
        if (!body.includes(site.changeTrigger)) {
          // Send to websocket listeners
          io.emit("update", { ...site, changed: "true" });
          console.log(site.title);
          console.log(body);
        }
      }
    }
  });
}

module.exports = checkSite;
