const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
const API_KEY = process.env.API_KEY;
const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

app.post("/recipes", async (req, res) => {
  const ingredients = req.body.ingredients;
  const format = `
    {
      "title": String,
      "description" String,
      "ingredients": []String,
      "steps": []String,
    }
  `;
  const response = await openAIRequest(ingredients, format);

  if (!response) return res.send("No response from OpenAI");
  if (!response.data) return res.send("No data from OpenAI");
  if (response.data.choices.length < 1) return res.send("No recipe found");

  const recipe = response.data.choices[0].text;

  try {
    JSON.parse(recipe);
  } catch (e) {
    res.send("No recipe found");
  }

  res.send(recipe);
});

const openAIRequest = (ingredients, format) => {
  return openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Create a recipe using metric measurements that uses exculsively the following ingredients: " +
      ingredients +
      "in the following format: " +
      format,
    temperature: 0,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  });
};
