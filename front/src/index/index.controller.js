const indexService = require("./index.service.js");

exports.getIndexPageData = async (req, res) => {
  try {
    const processedData = await indexService.fetchIndexContentData(req, res);
    // console.log(processedData);
    res.render("index.html", processedData);
  } catch (error) {
    console.log("IndexController getIndexPageData Error : " + error.message);
    throw new Error(
      "IndexController getIndexPageData Error : " + error.message
    );
  }
};
