const {  GetItemCommand } = require("@aws-sdk/client-dynamodb");

const getClient=require("./getClient")
const client=getClient()
const {parseDynamoObj}=require("./utils")


async function getObj(params) {
    try {
      const command = new GetItemCommand(params);
      const response = await client.send(command);
      if(response.Item){
        return parseDynamoObj(response.Item)
      }
      return false
    } catch (err) {
      console.error("Error fetching items:", err);
      return false
    }
  }
module.exports=getObj
