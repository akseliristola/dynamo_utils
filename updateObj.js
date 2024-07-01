const {  UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const getClient=require("./getClient")

const client = getClient();

async function updateObj(updateItemParams) {
    try{
        const updateItemCommand = new UpdateItemCommand(updateItemParams);
        const updateItemResponse = await client.send(updateItemCommand);
        console.log("Item updated successfully:", updateItemResponse);
        return true
    }
    catch(e){
        console.log(e)
        return false
    }

}


module.exports=updateObj