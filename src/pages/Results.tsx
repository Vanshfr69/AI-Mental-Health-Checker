import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Brain, Heart, TrendingUp, AlertCircle, CheckCircle, Clock, Users } from 'lucide-react';
import { analyzeResponse } from '@/lib/gemini';

interface AnalysisResult {
  overallScore: number;
  mentalFitnessLevel: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention';
  strengths: string[];
  areas_for_improvement: string[];
  recommendations: string[];
  risk_factors: string[];
  summary: string;
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeResponses = async () => {
      try {
        // Extract answers from URL params
        const answers: Record<string, string> = {};
        for (let i = 0; i < 8; i++) {
          const answer = searchParams.get(`q${i}`);
          if (answer) {
            answers[`question_${i}`] = answer;
          }
        }

        if (Object.keys(answers).length === 0) {
          navigate('/assessment');
          return;
        }

        const result = await analyzeResponse(answers);
        setAnalysis(result);
      } catch (err) {
        setError('Failed to analyze your responses. Please try again.');
        console.error('Analysis error:', err);
      } finally {
        setLoading(false);
      }
    };

    analyzeResponses();
  }, [searchParams, navigate]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case 'Excellent': return 'default';
      case 'Good': return 'secondary';
      case 'Fair': return 'outline';
      case 'Needs Attention': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 shadow-medium gradient-card border-0 text-center max-w-md">
          <Brain className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-xl font-semibold mb-2">Analyzing Your Responses</h2>
          <p className="text-muted-foreground mb-4">
            Our AI is processing your assessment and generating personalized insights...
          </p>
          <Progress value={75} className="w-full" />
        </Card>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 shadow-medium gradient-card border-0 text-center max-w-md">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-xl font-semibold mb-2">Analysis Error</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => navigate('/assessment')} className="btn-hero">
            Retake Assessment
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="absolute left-6 top-8 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-4xl font-bold mb-2 text-foreground">Your Mental Health Report</h1>
          <p className="text-muted-foreground">
            Based on AI analysis of your responses
          </p>
        </div>

        {/* Overall Score */}
        <Card className="p-8 shadow-medium gradient-card border-0 mb-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
                <span className="text-3xl font-bold text-white">{analysis.overallScore}</span>
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Badge variant={getLevelBadgeVariant(analysis.mentalFitnessLevel)} className="text-sm">
                  {analysis.mentalFitnessLevel}
                </Badge>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Overall Mental Fitness Score</h2>
              <p className="text-muted-foreground max-w-2xl">
                {analysis.summary}
              </p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <Card className="p-6 shadow-soft gradient-card border-0">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-6 w-6 text-success mr-2" />
              <h3 className="text-xl font-semibold">Your Strengths</h3>
            </div>
            <div className="space-y-3">
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-sm">{strength}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Areas for Improvement */}
          <Card className="p-6 shadow-soft gradient-card border-0">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-warning mr-2" />
              <h3 className="text-xl font-semibold">Areas for Growth</h3>
            </div>
            <div className="space-y-3">
              {analysis.areas_for_improvement.map((area, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-sm">{area}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Risk Factors */}
        {analysis.risk_factors.length > 0 && (
          <Card className="p-6 shadow-soft gradient-card border-0 mt-8 border-l-4 border-l-destructive">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-destructive mr-2" />
              <h3 className="text-xl font-semibold">Areas Requiring Attention</h3>
            </div>
            <div className="space-y-3">
              {analysis.risk_factors.map((risk, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 mr-3 flex-shrink-0" />
                  <p className="text-sm">{risk}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Recommendations */}
        <Card className="p-6 shadow-soft gradient-card border-0 mt-8">
          <div className="flex items-center mb-4">
            <Heart className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-xl font-semibold">Personalized Recommendations</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {analysis.recommendations.map((recommendation, index) => (
              <div key={index} className="p-4 bg-primary/5 rounded-lg">
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button onClick={() => navigate('/assessment')} className="btn-secondary">
            <Clock className="mr-2 h-4 w-4" />
            Retake Assessment
          </Button>
          <Button className="btn-outline-premium">
            <Users className="mr-2 h-4 w-4" />
            Find Support Groups
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-muted/50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Important:</strong> This assessment is for informational purposes only and is not a substitute for professional medical advice. 
            If you're experiencing severe mental health symptoms, please consult with a qualified healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;