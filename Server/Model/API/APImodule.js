const speciesAPI = require("./speciesAPI");

const Module = {
  findAll: async () => {
    const specieAPI = speciesAPI;

    return specieAPI;
  },

  searchCondition: async (objs) => {
    const specieAPI = speciesAPI;
    let resultObj;
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
      resultObj = filterSpecieAPI;
      //
    } else if (classification && !name && !endangered) {
      // only classification search
      const filterSpecieAPI = specieAPI.filter(filterByClassification);
      resultObj = filterSpecieAPI;

      //
    } else if (endangered && !name && !classification) {
      // only endangered search
      const filterSpecieAPI = specieAPI.filter(filterByEndangered);
      resultObj = filterSpecieAPI;

      //
    } else if (name && endangered && !classification) {
      // name && endangered search
      const filterSpecieAPI = speciesAPI
        .filter(filterByName)
        .filter(filterByEndangered);
      resultObj = filterSpecieAPI;

      //
    } else if (name && classification && !endangered) {
      console.log("hit");
      // name && classification search
      const filterSpecieAPI = specieAPI
        .filter(filterByName)
        .filter(filterByClassification);
      resultObj = filterSpecieAPI;

      //
    } else if (classification && endangered && !name) {
      // classification && endangered search
      const filterSpecieAPI = speciesAPI
        .filter(filterByClassification)
        .filter(filterByEndangered);
      resultObj = filterSpecieAPI;
    }

    console.log(resultObj);

    return resultObj;
  },
};

module.exports = Module;
