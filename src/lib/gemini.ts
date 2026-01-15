import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

// Defaulting to "gemini-3-flash-preview" as requested (the latest high-performance 3 Flash model)
export const geminiModel = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

export async function generateInsight(prompt: string) {
    try {
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

export async function generateJSONInsight(prompt: string) {
    try {
        const result = await geminiModel.generateContent(prompt + ' Respond ONLY with a valid JSON object.');
        const response = await result.response;
        const text = response.text();
        // Basic JSON extraction in case there's markdown wrapping
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch (error) {
        console.error('Gemini JSON API Error:', error);
        throw error;
    }
}
