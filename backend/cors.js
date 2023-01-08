function cors(res) {
  return (
    res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    ),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    res.setHeader('Access-Control-Allow-Credentials', true)
  );
}

module.exports = { cors };
