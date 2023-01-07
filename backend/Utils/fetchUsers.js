const axios = require("axios");

const fetchUsers = () => {
  let data = [];
  axios.get(`https://randomuser.me/api/?results=50`).then((res) => {
    data = res.data.results;
  });
  module.exports = {
    data,
  };
};

module.exports = {
  fetchUsers,
};
