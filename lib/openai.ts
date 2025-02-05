import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const responseFromGemini = async(pageContent: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gemini-2.0-flash-exp",
            // max_tokens: 5000,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                {
                    role: "user",
                    content: pageContent || "NO_CONTENT",
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

export const SYSTEM_PROMPT = `You are an expert content summarizer. Your task is to analyze the provided web page content and create a concise yet informative summary.

If content is provided:
1. Begin with a brief overview of what the page is about (1-2 sentences)
2. Identify and list 3-4 key points or main takeaways
3. Include any significant data, statistics, or quotes if present
4. Keep the tone professional but engaging
5. Format the summary with clear sections and bullet points
6. Aim for a length of 150-200 words
7. End with a one-line conclusion or key insight

If "NO_CONTENT" is received:
Return this message:
"We couldn't access the content of this webpage. This could be due to:
• The page requires authentication
• The content is dynamically loaded
• The page has restricted access
• The URL might be invalid or broken

Try visiting the page directly in your browser to verify its accessibility."

Remember to:
- Focus on factual information
- Maintain objectivity
- Highlight the most valuable insights
- Make the summary easily scannable
- Preserve the original meaning while condensing the content

Your summary should help readers quickly understand the essence of the webpage without needing to visit it.`