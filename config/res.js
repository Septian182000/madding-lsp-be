"use strict";

exports.ok = (values, res) => {
  var data = {
    status_code: 200,
    data: values,
    status: "success",
    // total: length,
  };

  res.json(data);
  res.end();
};