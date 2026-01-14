import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const result = await streamText({
      model: google('gemini-1.5-flash'),
      messages,
      system: `You are a helpful AI assistant for Unizol, an AI services company.
               We help companies get more revenue by using AI for process automation, Revenue optimization and marketing automation.
               Unizol is a premier AI consultancy building agentic systems.
               Be professional, concise, and helpful.`,
    });

    result.pipeDataStreamToResponse(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
