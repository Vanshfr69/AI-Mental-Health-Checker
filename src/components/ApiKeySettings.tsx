import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Key, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ApiKeySettings = () => {
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    setHasApiKey(!!storedKey);
    if (storedKey) {
      setApiKey(storedKey.slice(0, 8) + '...' + storedKey.slice(-4));
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey || apiKey.length < 10) {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid Gemini API key.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('gemini_api_key', apiKey);
    setHasApiKey(true);
    setIsOpen(false);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved securely.",
    });
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setHasApiKey(false);
    setIsOpen(false);
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed. Mock analysis will be used.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`fixed top-4 right-4 z-50 ${hasApiKey ? 'bg-success/10 border-success text-success' : 'bg-warning/10 border-warning text-warning'}`}
        >
          {hasApiKey ? <Check className="h-4 w-4 mr-2" /> : <Key className="h-4 w-4 mr-2" />}
          {hasApiKey ? 'API Connected' : 'Setup AI'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Gemini API Configuration
          </DialogTitle>
          <DialogDescription>
            Connect your Gemini API key for AI-powered mental health insights.
          </DialogDescription>
        </DialogHeader>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-primary">Get your free API key:</p>
              <p className="text-muted-foreground mt-1">
                Visit <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a> to get your free Gemini API key.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder={hasApiKey ? "API Key is set" : "Enter your Gemini API key..."}
              value={hasApiKey ? '' : apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={hasApiKey}
            />
          </div>

          <div className="flex space-x-2">
            {hasApiKey ? (
              <>
                <Button onClick={handleRemoveApiKey} variant="destructive" className="flex-1">
                  Remove Key
                </Button>
                <Button onClick={() => setIsOpen(false)} className="flex-1">
                  Close
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsOpen(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveApiKey} className="flex-1">
                  Save Key
                </Button>
              </>
            )}
          </div>
        </div>

        {!hasApiKey && (
          <div className="text-xs text-muted-foreground text-center pt-2">
            Without an API key, you'll receive mock analysis results.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySettings;