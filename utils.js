function parseDynamoObj(item) {
  if (Array.isArray(item)) {
    return item.map(parseDynamoObj);
  }
  
  if (typeof item !== "object" || item === null) {
    return item;
  }

  const parseValue = (value) => {
    if (value.S !== undefined) return value.S;
    if (value.N !== undefined) return Number(value.N);
    if (value.BOOL !== undefined) return value.BOOL;
    if (value.NULL !== undefined) return null;
    if (value.L !== undefined) return value.L.map(parseDynamoObj);
    if (value.M !== undefined) return parseDynamoObj(value.M);
    return parseDynamoObj(value); // Recursively parse any unhandled types
  };

  const keys = Object.keys(item);
  if (keys.length === 1 && ['S', 'N', 'BOOL', 'NULL', 'L', 'M'].includes(keys[0])) {
    return parseValue(item);
  }

  const result = {};
  for (const [key, value] of Object.entries(item)) {
    result[key] = parseValue(value);
  }
  
  return result;
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