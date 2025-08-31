import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 0,
      question: "How would you rate your overall sleep quality in the past week?",
      options: [
        { value: "excellent", label: "Excellent - I sleep 7-9 hours and wake up refreshed" },
        { value: "good", label: "Good - I usually sleep well with occasional interruptions" },
        { value: "fair", label: "Fair - I have some difficulty falling or staying asleep" },
        { value: "poor", label: "Poor - I frequently have trouble sleeping" }
      ]
    },
    {
      id: 1,
      question: "How often do you engage in physical exercise or movement?",
      options: [
        { value: "daily", label: "Daily - I exercise or move actively every day" },
        { value: "regular", label: "Regularly - 3-5 times per week" },
        { value: "occasional", label: "Occasionally - 1-2 times per week" },
        { value: "rarely", label: "Rarely - Less than once per week" }
      ]
    },
    {
      id: 2,
      question: "How do you typically handle stress in your daily life?",
      options: [
        { value: "healthy", label: "I use healthy coping strategies like meditation, exercise, or talking to others" },
        { value: "mixed", label: "I use a mix of healthy and unhealthy coping strategies" },
        { value: "unhealthy", label: "I tend to use unhealthy coping strategies (overeating, isolation, etc.)" },
        { value: "overwhelmed", label: "I feel overwhelmed and struggle to cope with stress" }
      ]
    },
    {
      id: 3,
      question: "How would you describe your social connections and relationships?",
      options: [
        { value: "strong", label: "Strong - I have meaningful relationships and feel well-supported" },
        { value: "adequate", label: "Adequate - I have some good relationships but could be stronger" },
        { value: "limited", label: "Limited - I have few close relationships" },
        { value: "isolated", label: "Isolated - I often feel lonely and disconnected" }
      ]
    },
    {
      id: 4,
      question: "How often do you feel anxious or worried throughout the day?",
      options: [
        { value: "rarely", label: "Rarely - I feel calm and in control most of the time" },
        { value: "sometimes", label: "Sometimes - I experience anxiety in specific situations" },
        { value: "often", label: "Often - I worry frequently about various things" },
        { value: "constantly", label: "Constantly - I feel anxious most of the day" }
      ]
    },
    {
      id: 5,
      question: "How satisfied are you with your work-life balance?",
      options: [
        { value: "very-satisfied", label: "Very satisfied - I maintain healthy boundaries" },
        { value: "satisfied", label: "Satisfied - Generally balanced with room for improvement" },
        { value: "unsatisfied", label: "Unsatisfied - Work often interferes with personal time" },
        { value: "very-unsatisfied", label: "Very unsatisfied - I feel constantly overwhelmed" }
      ]
    },
    {
      id: 6,
      question: "How often do you engage in activities you enjoy or find fulfilling?",
      options: [
        { value: "daily", label: "Daily - I make time for enjoyable activities every day" },
        { value: "weekly", label: "Weekly - I regularly engage in fulfilling activities" },
        { value: "monthly", label: "Monthly - I occasionally make time for enjoyable activities" },
        { value: "rarely", label: "Rarely - I struggle to find time for things I enjoy" }
      ]
    },
    {
      id: 7,
      question: "How would you rate your overall mood in the past two weeks?",
      options: [
        { value: "positive", label: "Mostly positive - I feel good about life most days" },
        { value: "neutral", label: "Neutral - I have ups and downs but generally stable" },
        { value: "low", label: "Often low - I frequently feel sad or unmotivated" },
        { value: "very-low", label: "Very low - I struggle with persistent sadness or emptiness" }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const canProceed = answers[currentQuestion] !== undefined;

  const handleNext = () => {
    if (isLastQuestion) {
      // Navigate to results with answers
      const searchParams = new URLSearchParams();
      Object.entries(answers).forEach(([key, value]) => {
        searchParams.append(`q${key}`, value);
      });
      navigate(`/results?${searchParams.toString()}`);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: value
    }));
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="absolute left-6 top-8 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-3xl font-bold mb-2 text-foreground">AI Mental Health Assessment</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>0%</span>
            <span>{Math.round(progress)}% Complete</span>
            <span>100%</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 shadow-medium gradient-card border-0 animate-slide-up">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            <RadioGroup
              value={answers[currentQuestion] || ''}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 text-base cursor-pointer leading-relaxed"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn-outline-premium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={canProceed ? "btn-hero" : "opacity-50 cursor-not-allowed"}
          >
            {isLastQuestion ? (
              <>
                Complete Assessment
                <CheckCircle className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {/* Encouragement */}
        <div className="text-center mt-8 p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary font-medium">
            Your responses are completely private and will be used only to generate your personalized insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;