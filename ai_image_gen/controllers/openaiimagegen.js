// we can integrate this on workerthreads and socketio for realtime
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateimage = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: req.params.inputdata,
      n: 1,
      size: "512x512",
    });
    const imageurl = response.data.data[0].url;
    console.log(imageurl);
    res.json({ imageurl });
    res.send("image generated");
    res.end();
  } catch (error) {
    console.error("Error generating image:", error);

    let errorMessage = "An error occurred while generating the image.";

    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
};

module.exports = {
  generateimage,
};
