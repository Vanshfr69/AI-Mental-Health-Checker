import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
        
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Mental Health
              <br />
              <span className="animate-float inline-block">Checker</span>
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
              
              <Button 
                variant="outline" 
                className="btn-outline-premium"
                onClick={() => window.open('https://github.com/', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                View Source Code
              </Button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
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

      {/* Footer / Created By Banner */}
      <footer className="py-8 px-6 bg-muted/30 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-1">AI Mental Health Checker</h3>
              <p className="text-sm text-muted-foreground">
                A project created to help people understand their mental wellness through AI-powered insights.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://github.com/', '_blank')}
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-4 w-4 mr-2" />
                Source Code
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://lovable.dev', '_blank')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Built with Lovable
              </Button>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 AI Mental Health Checker. This tool is for informational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;