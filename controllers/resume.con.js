const { GoogleGenAI } = require("@google/genai");
const multer = require("multer");
const path = require("path");
const pdf = require("pdf-parse");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "../public/uploads/"));
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 7,
  },
});
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
console.log("AI key", process.env.GEMINI_KEY);
const uploadFile = async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    const prompt = `
You are an AI resume expert.
Analyze the resume text below and return JSON with:
1. Resume Score (out of 100)
2. ATS Score
3. Match Percentage (with respect to the job description: ${
      req.body.jobDescription || "N/A"
    })
4. Missing Skills
5. Suggestions
6. Improved Resume Text
${data.text}
`;
    console.log(prompt);
    // Step 3: Call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: prompt }],
    });
    const aiResponse = response.candidates[0].content.parts[0].text;
    console.log("Results", aiResponse);
    return res.json({
      success: true,
      filename: req.file.filename,
      analysis: aiResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { upload, uploadFile };
