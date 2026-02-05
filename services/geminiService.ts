
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateWorkflowSim = async (industry: string, productDescription: string) => {
  const prompt = `
    Act as the VeriPura Multi-Agent AI Engine. 
    You are validating a document for a ${industry} transaction.
    Product: ${productDescription}

    Based on the VeriPura platform architecture, simulate the output of these 6 agents:
    1. Product Classification Agent (HS Code assignment)
    2. Requirement Mapper Agent (What documents are needed?)
    3. Document Extraction Agent (Simulate OCR data extraction from a generic certificate)
    4. Validation Agent (Compliance checks vs standards like MRLs, GMP, REACH)
    5. Anomaly Detection Agent (Looking for suspicious patterns)
    6. Confidence Scoring Agent (Final score 0-100% and route to HITM if < 85%)

    Return a JSON object following this schema.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          classification: { type: Type.STRING },
          hsCode: { type: Type.STRING },
          requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
          extractionData: { type: Type.STRING },
          validationResult: { type: Type.STRING },
          anomalyFound: { type: Type.BOOLEAN },
          anomalyDetail: { type: Type.STRING },
          confidenceScore: { type: Type.NUMBER },
          needsHITM: { type: Type.BOOLEAN }
        },
        required: ["classification", "hsCode", "requirements", "confidenceScore"]
      }
    }
  });

  return JSON.parse(response.text);
};
