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
    if(Array.isArray(item)){
      const marshalled = {L:item.map(v=>objectToDynamodb(v))}
      return marshalled
    }
    else if(typeof item==="string"){
      const marshalled = {S:item}
      return marshalled
    }
    else if(typeof item==="number"){
      const marshalled = {N:item.toString()}
      return marshalled
    }
    else if(typeof item==="boolean"){
      const marshalled = {BOOL:item}
      return marshalled
    }
    else if(item===null){
      const marshalled = {NULL:true}
      return marshalled
    }


    function marshall(item){
      const marshalled = {};
      for (const key in item) {
        const value = item[key];
        if (typeof value === 'string') {
          marshalled[key] = {S: value };
        } else if (typeof value === 'number') {
          marshalled[key] = {N: value.toString() };
        } else if (typeof value === 'boolean') {
          marshalled[key] = {BOOL: value };
        } else if (Array.isArray(value)) {
          marshalled[key] = {L: value.map((v) => objectToDynamodb(v)) };
        } else if (value === null) {
          marshalled[key] = {NULL: true };
        } else if (typeof value === 'object') {
          marshalled[key] = marshall(value);
        }
      }
      return marshalled;
    }

    return marshall({M:item})

  }
const aa={parseDynamoObj,objectToDynamodb}

module.exports=aa