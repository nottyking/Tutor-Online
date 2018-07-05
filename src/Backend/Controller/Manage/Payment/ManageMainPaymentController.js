const omise = require('../../../Config/Omise');

async function queryInformation(req, res){
  omise.charges.list(function(error, list) {
    /* Response. */
    console.log("LIST:",list);
    for(var i = 0 ; i < list.data.length ; i++){
      console.log("#",i+1);
      console.log("ID:",list.data[i].id);
      console.log("Amount:",list.data[i].amount);
      console.log("Created:",list.data[i].created);
      console.log("Description:",list.data[i].description);
    }
  });
}

module.exports = {
  queryInformation : queryInformation,
}
