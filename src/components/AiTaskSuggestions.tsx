
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ListPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type AiSuggestion = {
  id: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
};

export function AiTaskSuggestions({ cardTitle, cardDescription }: { cardTitle: string; cardDescription?: string }) {
  const [suggestions, setSuggestions] = useState<AiSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateSuggestions = async () => {
    setIsLoading(true);
    try {
      // Simulated AI response - In a real app, this would call an AI API
      const mockSuggestions: AiSuggestion[] = [
        {
          id: '1',
          suggestion: `Break down "${cardTitle}" into smaller tasks`,
          priority: 'high'
        },
        {
          id: '2',
          suggestion: `Create documentation for ${cardTitle}`,
          priority: 'medium'
        },
        {
          id: '3',
          suggestion: `Schedule review meeting for ${cardTitle}`,
          priority: 'low'
        }
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">AI Task Suggestions</h3>
        <Button 
          onClick={generateSuggestions} 
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <ListPlus className="mr-2 h-4 w-4" />
              Generate Suggestions
            </>
          )}
        </Button>
      </div>

      {suggestions.length > 0 ? (
        <div className="space-y-2">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <p className="text-sm">{suggestion.suggestion}</p>
                  <span className={`text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                    {suggestion.priority}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {isLoading ? 'Generating suggestions...' : 'Click generate to get AI suggestions for this task.'}
        </p>
      )}
    </div>
  );
}
