const addObj=require("./addObj")
const delObj=require("./deleteObj")
const getObj=require("./getObj")
const getObjs=require("./getObjs")
const updateObj=require("./updateObj")
const {parseDynamoObj,objectToDynamodb}=require("./utils")
const getClient=require("./getClient")


const aa ={addObj,delObj,getObj,getObjs,updateObj,parseDynamoObj,objectToDynamodb,getClient}

module.exports=aa



