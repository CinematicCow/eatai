import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import type { FormData } from '../types/formData';

const MODEL_NAME = 'gemini-pro';
const API_KEY = process.env.GEMINI_KEY;

async function run(data: FormData): Promise<string> {
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048
	};

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
		}
	];

	const parts = [
		{
			text: `Generate 1 recipes that meet the following criteria and return raw markdown:
            Total budget: Rs${data.budget}
            Location: ${data.location}
            Dietary preferences: ${data.dPreferences}
            Dietary restrictions: ${data.dRestrictions}
            Cuisine preferences (optional): ${data.cPreferences ? data.cPreferences : 'None'}
            Structure the recipes as follows:
            ### Recipe name: [descriptive name]
            #### Cooking time: [estimated cooking time]
            #### Servings: [number of servings]
            #### Ingredients:
            - [ingredient 1] ([quantity])  
            - [ingredient 2] ([quantity])...
            #### Instructions: 
            - [Step 1] 
            - [Step 2]...
            #### Estimated cost per serving: [estimated cost]
            #### Additional considerations:
            - [consideration 1]
            - [consideration 2]...

            Prioritize recipes that use locally available ingredients.
            Suggest substitutions for ingredients that may be difficult to find or expensive.
            Provide clear and concise instructions that are easy to follow.
            Include tips and variations to adapt the recipes to different tastes and preferences.`
		}
	];

	const result = await model.generateContent({
		contents: [{ role: 'user', parts }],
		generationConfig,
		safetySettings
	});

	const response = result.response;
	return response.text();
}

export { run };
