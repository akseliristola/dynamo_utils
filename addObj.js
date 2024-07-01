const {  PutItemCommand } = require("@aws-sdk/client-dynamodb");
const getClient=require("./getClient")

const client = getClient();

async function addObj(params) {
  try {
      const command = new PutItemCommand(params);
      const response = await client.send(command);
      console.log("Item added successfully:", response);
      return true
    } catch (err) {
      console.error("Error adding item:", err);
      return false
    }
}


module.exports=addObj