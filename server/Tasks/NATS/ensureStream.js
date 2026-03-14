async function ensureStream(jsm, streamName) {
  try {
    await jsm.streams.info(streamName);
    console.log("Stream ready");
  } catch (error) {
    await jsm.streams.add({
      name: streamName,
      subjects: ["auth.*", "team.*", "project.*", "task.*"],
    });
    console.log("Stream ready");
  }
}

module.exports = { ensureStream };
