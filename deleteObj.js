const {  DeleteItemCommand } = require("@aws-sdk/client-dynamodb");
const getClient=require("./getClient")

const client = getClient();

async function deleteObj(params) {
    try {
      const deleteCommand = new DeleteItemCommand(params);
      const response = await client.send(deleteCommand);
      console.log(response)
      return true
    } catch (err) {
      console.error("Error fetching items:", err);
      return false
    }
  }
module.exports=deleteObj
