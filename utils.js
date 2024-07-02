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
  if (item === null) {
    return { NULL: true };
  }

  switch (typeof item) {
    case 'string':
      return { S: item };
    case 'number':
      return { N: item.toString() };
    case 'boolean':
      return { BOOL: item };
    case 'object':
      if (Array.isArray(item)) {
        return { L: item.map(objectToDynamodb) };
      } else {
        const marshalled = {};
        for (const [key, value] of Object.entries(item)) {
          marshalled[key] = objectToDynamodb(value);
        }
        return { M: marshalled };
      }
    default:
      throw new Error(`Unsupported type: ${typeof item}`);
  }
}


const aa={parseDynamoObj,objectToDynamodb}

module.exports=aa