import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Brain, Heart, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApiKeySettings from '@/components/ApiKeySettings';

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced Gemini AI analyzes your responses for personalized insights"
    },
    {
      icon: Heart,
      title: "Mental Wellness Focus",
      description: "Comprehensive assessment of your mental health and daily habits"
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Star,
      title: "Personalized Results",
      description: "Get tailored recommendations based on your unique profile"
    }
  ];

  return (
    <div className="min-h-screen">
      <ApiKeySettings />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Discover Your
              <br />
              <span className="animate-float inline-block">Mental Fitness</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Take our comprehensive AI-powered assessment to understand your mental well-being 
              and receive personalized recommendations for a healthier, happier you.
            </p>

            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <Button 
                onClick={() => navigate('/assessment')}
                className="btn-hero group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Start Your Assessment
                <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </Button>
              
              <Button variant="outline" className="btn-outline-premium">
                Learn More
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Why Choose Our Mental Fitness Assessment?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our advanced platform combines scientific methodology with AI intelligence 
              to provide you with the most accurate and helpful insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 group hover:scale-105 gradient-card border-0"
              >
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Take the first step towards better mental health. Our assessment takes just 5-10 minutes.
          </p>
          <Button 
            onClick={() => navigate('/assessment')}
            className="btn-hero"
          >
            Start Assessment Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;