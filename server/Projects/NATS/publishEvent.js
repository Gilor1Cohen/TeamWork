async function publishEvent(js, subject, data) {
  await js.publish(subject, JSON.stringify(data));
}

module.exports = { publishEvent };
