interface AnalysisResult {
  overallScore: number;
  mentalFitnessLevel: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  strengths: string[];
  areas_for_improvement: string[];
  recommendations: string[];
  risk_factors: string[];
  summary: string;
}

// For now, we'll use a mock analysis until the user provides their Gemini API key
const mockAnalyzeResponse = (answers: Record<string, string>): AnalysisResult => {
  // Simple scoring based on answers
  let score = 70; // Base score
  
  // Analyze sleep quality
  if (answers.question_0 === 'excellent') score += 10;
  else if (answers.question_0 === 'good') score += 5;
  else if (answers.question_0 === 'poor') score -= 10;

  // Analyze exercise
  if (answers.question_1 === 'daily') score += 10;
  else if (answers.question_1 === 'regular') score += 5;
  else if (answers.question_1 === 'rarely') score -= 10;

  // Analyze stress management
  if (answers.question_2 === 'healthy') score += 10;
  else if (answers.question_2 === 'overwhelmed') score -= 15;

  // Analyze social connections
  if (answers.question_3 === 'strong') score += 10;
  else if (answers.question_3 === 'isolated') score -= 15;

  // Analyze anxiety levels
  if (answers.question_4 === 'rarely') score += 10;
  else if (answers.question_4 === 'constantly') score -= 20;

  // Analyze work-life balance
  if (answers.question_5 === 'very-satisfied') score += 5;
  else if (answers.question_5 === 'very-unsatisfied') score -= 10;

  // Analyze fulfilling activities
  if (answers.question_6 === 'daily') score += 5;
  else if (answers.question_6 === 'rarely') score -= 5;

  // Analyze overall mood
  if (answers.question_7 === 'positive') score += 10;
  else if (answers.question_7 === 'very-low') score -= 20;

  // Ensure score stays within bounds
  score = Math.max(0, Math.min(100, score));

  // Determine fitness level
  let mentalFitnessLevel: AnalysisResult['mentalFitnessLevel'];
  if (score >= 85) mentalFitnessLevel = 'Excellent';
  else if (score >= 70) mentalFitnessLevel = 'Good';
  else if (score >= 50) mentalFitnessLevel = 'Fair';
  else mentalFitnessLevel = 'Needs Attention';

  // Generate insights based on answers
  const strengths: string[] = [];
  const areas_for_improvement: string[] = [];
  const recommendations: string[] = [];
  const risk_factors: string[] = [];

  // Sleep analysis
  if (answers.question_0 === 'excellent' || answers.question_0 === 'good') {
    strengths.push('You maintain good sleep hygiene and quality rest');
  } else {
    areas_for_improvement.push('Sleep quality could be improved for better mental health');
    recommendations.push('Establish a consistent bedtime routine and create a sleep-friendly environment');
  }

  // Exercise analysis
  if (answers.question_1 === 'daily' || answers.question_1 === 'regular') {
    strengths.push('You maintain an active lifestyle with regular physical activity');
  } else {
    areas_for_improvement.push('Increasing physical activity could boost your mental well-being');
    recommendations.push('Start with 10-15 minutes of daily movement and gradually increase');
  }

  // Stress management
  if (answers.question_2 === 'healthy') {
    strengths.push('You have developed healthy coping mechanisms for stress');
  } else if (answers.question_2 === 'overwhelmed') {
    risk_factors.push('High stress levels with inadequate coping strategies may impact mental health');
    recommendations.push('Consider learning stress management techniques like meditation or deep breathing');
  }

  // Social connections
  if (answers.question_3 === 'strong') {
    strengths.push('You have strong social support networks');
  } else if (answers.question_3 === 'isolated') {
    risk_factors.push('Social isolation can significantly impact mental health');
    recommendations.push('Try to reach out to one person each week and consider joining social activities');
  }

  // Anxiety levels
  if (answers.question_4 === 'constantly') {
    risk_factors.push('Persistent anxiety may require professional support');
    recommendations.push('Consider speaking with a mental health professional about anxiety management');
  } else if (answers.question_4 === 'rarely') {
    strengths.push('You maintain good emotional regulation and low anxiety levels');
  }

  // Mood analysis
  if (answers.question_7 === 'very-low') {
    risk_factors.push('Persistent low mood may indicate depression and should be addressed');
    recommendations.push('Please consider reaching out to a mental health professional for support');
  } else if (answers.question_7 === 'positive') {
    strengths.push('You maintain a positive outlook and good emotional well-being');
  }

  // Default recommendations if none added
  if (recommendations.length === 0) {
    recommendations.push('Continue maintaining your current positive mental health practices');
    recommendations.push('Consider adding mindfulness or meditation to your routine');
  }

  const summary = score >= 85 
    ? "You demonstrate excellent mental fitness with strong habits and coping strategies."
    : score >= 70 
    ? "You show good mental fitness with some areas for potential improvement."
    : score >= 50
    ? "Your mental fitness is fair, with several opportunities for enhancement."
    : "Your responses suggest you may benefit from additional support and improved self-care strategies.";

  return {
    overallScore: score,
    mentalFitnessLevel,
    strengths,
    areas_for_improvement,
    recommendations,
    risk_factors,
    summary
  };
};

export const analyzeResponse = async (answers: Record<string, string>): Promise<AnalysisResult> => {
  // Check if user has provided Gemini API key
  const apiKey = localStorage.getItem('gemini_api_key');
  
  if (!apiKey) {
    // Show message about needing API key and use mock response
    console.log('Using mock analysis. Add your Gemini API key for AI-powered insights.');
    return mockAnalyzeResponse(answers);
  }

  try {
    // Prepare the prompt for Gemini
    const prompt = `
    You are a mental health assessment AI. Analyze the following responses to a mental fitness questionnaire and provide insights in JSON format.

    User Responses:
    ${Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join('\n')}

    Please provide a comprehensive analysis in the following JSON format:
    {
      "overallScore": (number 0-100),
      "mentalFitnessLevel": ("Excellent" | "Good" | "Fair" | "Needs Attention"),
      "strengths": ["strength1", "strength2", ...],
      "areas_for_improvement": ["area1", "area2", ...],
      "recommendations": ["recommendation1", "recommendation2", ...],
      "risk_factors": ["risk1", "risk2", ...] (if any concerning patterns),
      "summary": "Brief summary of overall mental fitness"
    }

    Focus on being supportive, constructive, and encouraging while providing actionable insights.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI analysis');
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const analysisResult = JSON.parse(jsonMatch[0]);
    return analysisResult;

  } catch (error) {
    console.error('Error with Gemini API:', error);
    // Fallback to mock analysis
    return mockAnalyzeResponse(answers);
  }
};