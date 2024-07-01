function parseDynamoObj(dynamodbItem) {
    const unmarshall = (item) => {
      const unmarshalled = {};
      for (const key in item) {
        const value = item[key];
        if (value.S !== undefined) {
          unmarshalled[key] = value.S;
        } else if (value.N !== undefined) {
          unmarshalled[key] = Number(value.N);
        } else if (value.BOOL !== undefined) {
          unmarshalled[key] = value.BOOL;
        } else if (value.L !== undefined) {
          unmarshalled[key] = value.L.map((v) => {
            if (v.M !== undefined) {
              return unmarshall(v.M);
            }
            return unmarshall(v);
          });
        } else if (value.M !== undefined) {
          unmarshalled[key] = unmarshall(value.M);
        } else if (value.NULL !== undefined) {
          unmarshalled[key] = null;
        }
      }
      return unmarshalled;
    };
    return unmarshall(dynamodbItem);
  }


  function objectToDynamodb(item) {
    let marshalled
    if(Array.isArray(item)){
      marshalled = {L:item.map(v=>objectToDynamodb(v))}
    }
    else if(typeof item==="string"){
       marshalled = {S:item}
    }
    else if(typeof item==="number"){
       marshalled = {N:item.toString()}
    }
    else if(typeof item==="boolean"){
       marshalled = {BOOL:item}
    }
    else if(item===null){
      marshalled = {NULL:true}
    }
    else if (typeof item === 'object') {
      marshalled = { M: objectToDynamodb(item) };
    }

    return marshalled

  }

const aa={parseDynamoObj,objectToDynamodb}

module.exports=aa