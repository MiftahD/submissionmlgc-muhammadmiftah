const { Firestore } = require("@google-cloud/firestore");

const loadHistory = async () => {
  const db = new Firestore();
  const predictCollection = db.collection("predictions");

  try {
    const snapshot = await predictCollection.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return {
        status: "success",
        data: [],
      };
    }

    const histories = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        result: data.result,
        createdAt: data.createdAt,
        suggestion: data.suggestion,
      };
    });

    console.log("Histories retrieved: ", histories);
    return {
      status: "success",
      data: histories,
    };
  } catch (error) {
    console.error("Error retrieving histories: ", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

module.exports = loadHistory;
