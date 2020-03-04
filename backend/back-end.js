let express = require("express");
let axios = require("axios");

let app = express();
let port = process.env.PORT || "8000";

const cache = {};

let cacheMiddleware = (req, res, next) => {
  let key = req.originalUrl;
  cachedResult = cache[key];
  if (cachedResult) {
    res.status(200).send(cachedResult);
    return;
  } else {
    res.sendResponse = res.send;
    res.send = body => {
      cache[key] = body;
      res.sendResponse(body);
    };
    next();
  }
};

app.get("/posts", cacheMiddleware, (req, res) => {
  const tags = req.query.tags.split(",");
  let results = [];
  console.log(tags);
  for (let tag of tags) {
    let res = await axios.get(
      `https://hatchways.io/api/assessment/blog/posts?tag=${tag}`
    );
    results.push(...res.data.posts);
  }
  res.status(200).json({
    posts: results.filter((item, index) => results.indexOf(item) === index)
  });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

// What are good parts of the code?
// What are bad parts of the code?
// How could the caching be better? How does the caching work right now?
// How could it be more efficient?
