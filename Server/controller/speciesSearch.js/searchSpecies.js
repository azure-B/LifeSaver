const Module = require("../../Model/API/APImodule");

exports.searchAll = async (req, res) => {
  const result = await Module.findAll();

  res.send(result);
};

exports.searchForCondition = async (req, res) => {
  const { name, classification, endangered } = req.query;

  const objs = {
    name,
    classification,
    endangered,
  };

  if (!name && !classification && !endangered) {
    result = await Module.findAll();
  } else {
    result = await Module.searchCondition(objs);
  }

  res.send(result);
};
