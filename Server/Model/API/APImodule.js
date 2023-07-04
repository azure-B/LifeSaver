const speciesAPI = require("./speciesAPI");

const Module = {
  findAll: async () => {
    const specieAPI = speciesAPI;
    const resultObj = {};

    for await (const obj of speciesAPI) {
      resultObj[obj.이름] = obj;
    }

    return resultObj;
  },

  searchCondition: async (objs) => {
    const specieAPI = speciesAPI;
    const resultObj = {};
    const { name, classification, endangered } = objs;

    const filterByName = (obj) => obj.이름.includes(name);
    const filterByClassification = (obj) => obj.분류.includes(classification);
    const filterByEndangered = (obj) => {
      if (endangered == 1) {
        return obj.지정관리.includes("야생생물 Ⅰ급");
      } else if (endangered == 2) {
        return obj.지정관리.includes("야생생물 Ⅱ급");
      } else {
        return undefined;
      }
    };

    if (name && !classification && !endangered) {
      // only Name search
      const filterSpecieAPI = specieAPI.filter(filterByName);

      for await (const obj of filterSpecieAPI) {
        resultObj[obj.이름] = obj;
      }
    } else if (classification && !name && !endangered) {
      // only classification search
      const filterSpecieAPI = specieAPI.filter(filterByClassification);

      for await (const obj of filterSpecieAPI) {
        resultObj[obj.이름] = obj;
      }
    } else if (endangered && !name && !classification) {
      // only endangered search
      const filterSpecieAPI = specieAPI.filter(filterByEndangered);

      for await (const obj of filterSpecieAPI) {
        resultObj[obj.이름] = obj;
      }
    } else if (name && endangered && !classification) {
      // name && endangered search
      const filterSpecieAPI = speciesAPI
        .filter(filterByName)
        .filter(filterByEndangered);

      for await (const obj of filterSpecieAPI) {
        resultObj[obj.이름] = obj;
      }
    } else if (name && classification && !endangered) {
      console.log("hit");
      // name && classification search
      const filterSpecieAPI = specieAPI
        .filter(filterByName)
        .filter(filterByClassification);

      for await (const obj of filterSpecieAPI) {
        resultObj[obj.이름] = obj;
      }
    } else if (classification && endangered && !name) {
      // classification && endangered search
      const filterSpecieAPI = speciesAPI
        .filter(filterByClassification)
        .filter(filterByEndangered);

      for await (const obj of filterSpecieAPI) {
        resultObj[obj.이름] = obj;
      }
    }

    return resultObj;
  },
};

module.exports = Module;
