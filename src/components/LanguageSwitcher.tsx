
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' }
];

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]);
  const { toast } = useToast();

  const toggleLanguage = () => {
    const nextLang = currentLang.code === 'en' ? languages[1] : languages[0];
    setCurrentLang(nextLang);
    
    toast({
      title: "Language Changed",
      description: `Switched to ${nextLang.name}`,
    });
    
    // In a real implementation, this would trigger content translations
    document.documentElement.lang = nextLang.code;
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 ${className}`}
      aria-label={`Change language to ${currentLang.code === 'en' ? 'Bahasa Melayu' : 'English'}`}
    >
      <span className="text-base" aria-hidden="true">{currentLang.flag}</span>
      <span className="text-xs">{currentLang.code.toUpperCase()}</span>
    </Button>
  );
};

export default LanguageSwitcher;
