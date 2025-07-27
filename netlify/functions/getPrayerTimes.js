
const axios = require('axios');

exports.handler = async function(event, context) {
  const { country = 'EG', city = 'Cairo' } = event.queryStringParameters;

  try {
    const response = await axios.get('https://api.aladhan.com/v1/timingsByCity', {
      params: { country, city }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch prayer times." })
    };
  }
};
