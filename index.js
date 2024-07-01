const addObj=require("./addObj")
const deleteObj=require("./deleteObj")
const getObj=require("./getObj")
const getObjs=require("./getObjs")
const updateObj=require("./updateObj")
const {parseDynamoObj,objectToDynamodb}=require("./utils")
const getClient=require("./getClient")



const aa ={addObj,deleteObj,getObj,getObjs,updateObj,parseDynamoObj,objectToDynamodb,getClient}

module.exports=aa



