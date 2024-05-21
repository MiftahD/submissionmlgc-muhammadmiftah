const InputError = require("../exceptions/InputError.js");
const predictBinary = require("../services/inferenceService.js");
const storeData = require("../services/storeData.js");
const loadHistory = require("../services/loadHistory.js");
const crypto = require("crypto");
const { Firestore } = require("@google-cloud/firestore");

const postPrediksiHandler = async (request, h) => {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictBinary(
    model,
    image
  );
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result: label,
    suggestion,
    createdAt,
  };

  await storeData(id, data);

  return h
    .response({
      status: "success",
      message:
        confidenceScore >= 100 || confidenceScore < 1
          ? "Model is predicted successfully"
          : "Model is predicted successfully",
      data,
    })
    .code(201);
};

const getRiwayatPrediksiHandler = async (request, h) => {
  const { data } = await loadHistory();

  return h
    .response({
      status: "success",
      data,
    })
    .code(200);
};

const tidakDitemukanHandler = (request, h) =>
  h
    .response({
      status: "fail",
      message: "Halaman tidak ditemukan",
    })
    .code(404);

module.exports = {
  postPrediksiHandler,
  getRiwayatPrediksiHandler,
  tidakDitemukanHandler,
};
