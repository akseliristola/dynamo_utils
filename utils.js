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
            return parseDynamoObj(v);
          });
        } else if (value.M !== undefined) {
          unmarshalled[key] = parseDynamoObj(value.M);
        } else if (value.NULL !== undefined) {
          unmarshalled[key] = null;
        }
      }
      return unmarshalled;
    };
    return unmarshall(dynamodbItem);
  }


  function objectToDynamodb(item) {
      const marshalled = {};
      for (const key in item) {
        const value = item[key];
        if (typeof value === 'string') {
          marshalled[key] = { S: value };
        } else if (typeof value === 'number') {
          marshalled[key] = { N: value.toString() };
        } else if (typeof value === 'boolean') {
          marshalled[key] = { BOOL: value };
        } else if (Array.isArray(value)) {
          marshalled[key] = { L: value.map((v) => (typeof v === 'object' ? { M: objectToDynamodb(v) } : objectToDynamodb({ value: v }).value)) };
        } else if (value === null) {
          marshalled[key] = { NULL: true };
        } else if (typeof value === 'object') {
          marshalled[key] = { M: objectToDynamodb(value) };
        }
      }
      return marshalled;

  }

const aa={parseDynamoObj,objectToDynamodb}

module.exports=aa