const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

let client;

function getClient(){
    if(!client){
        client=new DynamoDBClient({region:"us-east-1"})
    }
    return client;
}

module.exports=getClient;