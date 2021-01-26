const IPCONFIG_URL = 'https://ipinfo.io';
const axios = require('axios').default;

async function getIpInfo(ipAddr) {
  return (await axios(`${IPCONFIG_URL}/${ipAddr}`)).data;
}

module.exports = function clientIp(ipAddr) {
  return new Promise(async (resolve) => {
    try {
      resolve(await getIpInfo(ipAddr));
    } catch (e) {
      resolve({})
    }
  });
};
