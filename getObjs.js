const {  ScanCommand } = require("@aws-sdk/client-dynamodb");
const getClient=require("./getClient")

const client = getClient();

const {parseDynamoObj}=require("./utils")

async function getObjs(params) {
    try {
      const command = new ScanCommand(params);
      const response = await client.send(command);
      console.log("Items fetched successfully:", response.Items);
      return response.Items.map(parseDynamoObj);
    } catch (err) {
      console.error("Error fetching items:", err);
      return false
    }
  }

module.exports=getObjs
