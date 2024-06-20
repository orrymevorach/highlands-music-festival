const { schedule } = require('@netlify/functions');
const abandonedCartEmail = require('../../scripts/abandoned-cart-email');

const handler = async function (event, context) {
  await abandonedCartEmail();
  return {
    statusCode: 200,
  };
};

module.exports.handler = schedule('15 17 * * *', handler);
