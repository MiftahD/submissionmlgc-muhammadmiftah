const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError.js");

const predictBinary = async (model, image) => {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const scoreData = await prediction.data();
    const score = scoreData[0];
    const threshold = 0.5;
    const label = score >= threshold ? "Cancer" : "Non-cancer";
    const confidence = score * 100;
    let suggestion;

    if (label === "Cancer") {
      suggestion = "Segera periksa ke dokter!";
    } else {
      suggestion = "Anda sehat!";
    }

    return {
      confidenceScore: confidence,
      label,
      suggestion,
    };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
};

module.exports = predictBinary;
