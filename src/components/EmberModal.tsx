
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Flame, Award } from 'lucide-react';

interface EmberModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  pointsEarned: number;
  newBadges: string[];
  sassModeActive?: boolean;
}

// Prehistoric sass quotes
const sassyQuotes = [
  "You again? Hungry like a raptor, huh?",
  "No pain, no dino gains. Move those prehistoric buns!",
  "Riverfang's root stew > your sad fridge.",
  "Getting stronger or just avoiding your cave chores?",
  "Oh look who's back for more punishment!",
  "Tracking your visits won't make you faster. Actually running will.",
  "Another meal? The sabertooths eat less than you!",
  "Training again? I admire your persistence, if not your form.",
  "Your dedication would impress the elders if they weren't napping.",
  "Well, at least you're keeping track of how slow your progress is!"
];

// Prehistoric encouragement quotes
const encouragementQuotes = [
  "The tribe honors thy dedication!",
  "By the ancient flames, thou hast earned embers!",
  "A worthy quest completed, brave cave dweller!",
  "The tribe shall hear of thy deeds!",
  "The spirits smile upon thee today!",
  "Thy journey grows more legendary with each step!"
];

const EmberModal: React.FC<EmberModalProps> = ({ 
  isOpen, 
  onClose, 
  locationName, 
  pointsEarned,
  newBadges,
  sassModeActive = false
}) => {
  // Get a random quote
  const getRandomQuote = () => {
    if (sassModeActive) {
      return sassyQuotes[Math.floor(Math.random() * sassyQuotes.length)];
    }
    return encouragementQuotes[Math.floor(Math.random() * encouragementQuotes.length)];
  };
  
  const randomQuote = getRandomQuote();
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-stone-800 border-2 border-amber-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-pixel text-xl text-amber-500">
            {locationName}
          </DialogTitle>
          <DialogDescription className="text-center text-amber-300 italic">
            {randomQuote}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Points earned */}
          {!sassModeActive && pointsEarned > 0 && (
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Flame className="h-8 w-8 text-amber-500 animate-pulse" />
              <span className="font-pixel text-2xl text-amber-300">+{pointsEarned} embers</span>
            </div>
          )}
          
          {sassModeActive && (
            <div className="text-center text-amber-300 mb-4">
              <p>Visit logged. No embers earned.</p>
              <p className="text-xs mt-2 italic">Just keeping track of your journey...</p>
            </div>
          )}
          
          {/* New badges */}
          {newBadges.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-pixel text-center text-amber-400">New Achievement Unlocked!</h4>
              
              <div className="flex flex-col items-center space-y-2">
                {newBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-stone-700 rounded-full px-3 py-2">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span className="text-amber-300">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Continue Quest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmberModal;
