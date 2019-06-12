const fetch = require('node-fetch');

const { PH_API_KEY, PH_API_SECRET, PH_REDIRECT_URI } = process.env;

module.exports.token = async (event, context, callback) => {
  const request = JSON.parse(event.body);

  const phReq = {
    code: request.code,
    client_id: PH_API_KEY,
    client_secret: PH_API_SECRET,
    redirect_uri: PH_REDIRECT_URI,
    grant_type: 'authorization_code',
  };

  const phRes = await fetch('https://api.producthunt.com/v2/oauth/token', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(phReq),
  });

  const tokenJSON = await phRes.json();

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      access_token: tokenJSON.access_token,
    }),
  };

  callback(null, response);
};
