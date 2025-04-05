
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const colorThemes = [
  { name: 'Blue (Default)', primary: '#3b82f6', accent: '#8b5cf6' },
  { name: 'Green', primary: '#10b981', accent: '#6366f1' },
  { name: 'Purple', primary: '#8b5cf6', accent: '#ec4899' },
  { name: 'Orange', primary: '#f97316', accent: '#8b5cf6' },
  { name: 'Pink', primary: '#ec4899', accent: '#3b82f6' }
];

const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const applyTheme = (primary: string, accent: string) => {
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--accent', accent);
    
    localStorage.setItem('customTheme', JSON.stringify({ primary, accent }));
    
    toast({
      title: "Theme Updated",
      description: "Your custom theme has been applied.",
    });
    
    setIsOpen(false);
  };

  // Load saved theme on component mount
  useState(() => {
    const savedTheme = localStorage.getItem('customTheme');
    if (savedTheme) {
      const { primary, accent } = JSON.parse(savedTheme);
      document.documentElement.style.setProperty('--primary', primary);
      document.documentElement.style.setProperty('--accent', accent);
    }
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 z-40 rounded-full h-12 w-12 shadow-lg"
          aria-label="Customize theme colors"
        >
          <Palette className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" side="top">
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Customize Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {colorThemes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => applyTheme(theme.primary, theme.accent)}
                className="flex flex-col items-center justify-center p-2 rounded-md border hover:border-primary transition-all"
                aria-label={`Apply ${theme.name} theme`}
              >
                <div className="flex gap-1 mb-1">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: theme.primary }}
                    aria-hidden="true"
                  />
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: theme.accent }}
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xs">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeCustomizer;
