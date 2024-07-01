const {  ScanCommand } = require("@aws-sdk/client-dynamodb");

const getClient=require("./getClient")
const client=getClient()
const {parseDynamoObj}=require("./utils")


async function getObj(params) {
    try {
      const command = new ScanCommand(params);
      const response = await client.send(command);
      if(response.Items?.length>0){
        return parseDynamoObj(response.Items[0])
      }
      return false
    } catch (err) {
      console.error("Error fetching items:", err);
      return false
    }
  }
module.exports=getObj
