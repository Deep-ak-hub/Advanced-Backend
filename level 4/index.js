import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();

const port = 5000;

app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/ai", async (req, res, next) => {
  const {input} = req.body;
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: input
  });

  return res.status(200).json({"ai: ": response.text})
});

app.get("/", (req, res, next) => {
  return res.json({ message: "hello from level 4" });
});

app.listen(port, () => {
  console.log("server started");
});
