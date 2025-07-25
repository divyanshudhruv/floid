// GeminiRequest.ts
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY"; // replace with your actual key

export async function fetchGeminiResponse(
  prompt: string
): Promise<string | null> {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    return null;
  }
}
