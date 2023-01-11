const express = require("express");
const axios = require("axios");
const { UserModel } = require("../Models/User.model");

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  const qry = req.query;
  const { _page, _limit, gender, country } = qry;

  // FILTER
  let params = {};
  gender && (params.gender = gender);
  // let location = {};
  // country && (params.location.country = country);
  // country && params.location;
  // console.log("params ", params);
  // PAGINATION
  let Limit = +_limit || 10;
  let skip = Limit * (_page - 1);

  let usersData = await UserModel.find();

  if (!usersData || usersData.length <= 0) {
    let usersData;
    let count;
    await axios
      .get(`https://randomuser.me/api/?results=50`)
      .then(async (res) => {
        let data = res.data.results;
        data = data.map((ele) =>
          ele.gender == "male" ? (ele.group = "B") : (ele.group = "A")
        );
        const temp = await UserModel.insertMany(data);
        count = await UserModel.find(params).countDocuments();
        usersData = await UserModel.find(params).limit(Limit).skip(skip);
      });
    let totalPages = Math.ceil(count / Limit);
    let result = {
      totalPages,
      currentPage: _page,
      data: usersData,
      count,
      message: "Users data fetched successfully",
    };
    res.send(result);
  } else {
    let count = await UserModel.find(params).countDocuments();
    let usersData = await UserModel.find(params).limit(Limit).skip(skip);
    let totalPages = Math.ceil(count / Limit);
    let result = {
      totalPages,
      currentPage: _page,
      data: usersData,
      count,
      message: "Users data fetched successfully",
    };
    res.send(result);
  }
});

usersRouter.delete("/delete", async (req, res) => {
  const temp = await UserModel.deleteMany();
  if (temp) {
    res.send({
      data: [],
      result: temp,
      message: "All users deleted successfully",
    });
  } else {
    res.send({ message: "Unable to delete users at this moment" });
  }
});

module.exports = {
  usersRouter,
};
