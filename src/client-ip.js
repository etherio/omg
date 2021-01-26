const IPCONFIG_URL = 'https://ipinfo.io';
const axios = require('axios').default;

module.exports = function clientIp(ipAddr) {
  return axios(`${IPCONFIG_URL}/${ipAddr}`)
    .then(({ data }) => data)
    .catch((err) => null);
};
