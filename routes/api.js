const express = require('express');
const router = express.Router();
const axios = require('axios');
const MonkeyLearn = require('monkeylearn');
const Twit = require('twit');

// router.get('/api/passwords', (req, res) => {
//   res.json('Hi welcome!');
// });

// Obtaining News Articles
router.post('/news', async (req, res) => {
  try {
    const queryToBeSearched = req.body.msg;
    // NewsAPI Fetching
    let config = {
      headers: {
        Cookie: '__cfduid=dbdf5e69aca6bbdc4dd657b7e5e5f1d661599108067',
      },
    };
    const newsArticleRaw = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&q=${queryToBeSearched}&apiKey=${process.env.NEWSAPI_API}`,
      config
    );

    res.json({ msg: newsArticleRaw.data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Sentimental Analysis and Word Extraction Process
router.post('/analysis', async (req, res) => {
  try {
    const newsArticleContent = req.body.msg;
    //   MonkeyLearn Sentimental Analysis Processing
    const ml = new MonkeyLearn(process.env.MONKEYLEARN_API);
    let model_id = 'cl_pi3C7JiL';
    let newsContent = [newsArticleContent];
    resultSentiment = await ml.classifiers.classify(model_id, newsContent);

    // console.log(resultSentiment.body[0].classifications);

    // TODO: Needs to take out quotes and double quotes before going in. "response": {"topics": [{"label": "Government",}]} <---what we want. and only top 5
    // TextRazor Keyword Extractor
    const qs = require('qs');
    let data = qs.stringify({
      'extractors': 'topics',
      'text': newsArticleContent,
    });

    let config = {
      method: 'post',
      url: 'https://api.textrazor.com',
      headers: {
        'x-textrazor-key': process.env.RAZORTEXT_API,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    let resultExtract = await axios(config);

    // console.log(resultExtract.data.response.topics.slice(0,10));

    res.json({
      status: true,
      dataSentiment: resultSentiment.body[0].classifications,
      dataExtract: resultExtract.data.response.topics.slice(0, 10),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Tweets Processing
router.post('/tweets', async (req, res) => {
  try {
    const keyWord = req.body.msg;
    // console.log(keyWord);
    let T = new Twit({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token: process.env.ACCESS_TOKEN,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET,
      timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
      strictSSL: true, // optional - requires SSL certificates to be valid.
    });

    // var stream = T.stream('statuses/filter', { track: 'mango' });

    // stream.on('tweet', function (tweet) {
    //   console.log(tweet);
    // });

    T.get(
      'search/tweets',
      { q: `${keyWord} since:2020-01-01`, count: 5 },
      function (err, data, response) {
        console.log(data);
        res.json(data);
      }
    );
    // res.json({
    //   status: true,
    //   dataSentiment: resultSentiment.body[0].classifications,
    //   dataExtract: resultExtract.data.response.topics.slice(0, 10),
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
