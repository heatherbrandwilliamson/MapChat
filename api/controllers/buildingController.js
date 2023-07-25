require("dotenv").config();
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const PromptBuilder = require("../models/promptbuilder");


const BuildingController = {
    generateExcuse: async (req, res) => {
      const promptBuilder = new PromptBuilder();
      try {
        const buildingName = req.query.buildingName; // Check if this value is not empty
        
  
        let messages = promptBuilder.constructPrompt(buildingName);
  
        const configuration = new Configuration({
          apiKey: process.env.OPENAI_API_KEY,
        });
  
        const openai = new OpenAIApi(configuration);
        const chatCompletion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages, 
        });
  
        console.log(chatCompletion.data.choices[0].message.content);
        return res
          .status(200)
          .json({ excuse: chatCompletion.data.choices[0].message.content });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to generate pick up line." });
      }
    },
  }; 
  
module.exports = BuildingController;