export const CALORIES_PROMPT: string = `Based on Weight, Height, Gender, Goal give me calories and proteins need daily. Consider Age as 28 in JSON format and follow the schema: 
    {
        calories: <>,
        proteins: <>
    }
    And note don't give any explanation or description. Ensure the output only in above JSON format.`;
