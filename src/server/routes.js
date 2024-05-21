const {
  postPrediksiHandler,
  getRiwayatPrediksiHandler,
  tidakDitemukanHandler,
} = require("./handler.js");

const routes = [
  {
    method: "POST",
    path: "/predict",
    handler: postPrediksiHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 1 * 1024 * 1024,
      },
    },
  },
  {
    method: "GET",
    path: "/predict/histories",
    handler: getRiwayatPrediksiHandler,
  },
  {
    method: "*",
    path: "/{any*}",
    handler: tidakDitemukanHandler,
  },
];

module.exports = routes;
