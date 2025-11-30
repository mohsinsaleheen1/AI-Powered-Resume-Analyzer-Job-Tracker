import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
const dotenv = require("dotenv");
dotenv.config();
const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
const aiAnalyzer = async () => {
  const contents = [
    { text: "Summarize this document" },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: Buffer.from(
          fs.readFileSync("content/343019_3_art_0_py4t4l_convrt.pdf")
        ).toString("base64"),
      },
    },
  ];
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
  console.log(response.text);
};
module.exports = aiAnalyzer;
