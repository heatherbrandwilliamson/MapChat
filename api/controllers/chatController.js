const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const PromptBuilder = require('../models/promptbuilder');

const ChatController = {
  generateChat: async (req, res) => {

    const userinput = req.query.userinput;

    //const { buildingname, description } = req.query;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    if (!configuration.apiKey) {
      res.status(500).json({
        error: {
          message: "OpenAI API key not configured",
        }
      });
      return;
    }

    try {

      const promptBuilder = new PromptBuilder();

      const openai = new OpenAIApi(configuration);
    
      
      let messages = promptBuilder.constructPrompt(userinput)

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages, 
        })
      console.log(completion.data.choices[0].message);
      console.log(completion.data.choices[0].message.content);

      const chatResponse = completion.data.choices[0].message.content;
      return res.status(200).json({ pickupline: chatResponse }); 
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Failed to generate pick up line." });
    }
  },
};

module.exports = ChatController;