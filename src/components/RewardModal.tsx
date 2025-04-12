
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coins, Award } from 'lucide-react';

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationName: string;
  pointsEarned: number;
  newBadges: string[];
}

// Medieval quotes for reward modals
const medievalQuotes = [
  "Huzzah! Thy efforts have been rewarded!",
  "By the king's decree, thou hast earned gold!",
  "A worthy quest completed, brave adventurer!",
  "The kingdom shall hear of thy deeds!",
  "Fortune smiles upon thee today!",
  "Thy journey grows more legendary with each step!"
];

const RewardModal: React.FC<RewardModalProps> = ({ 
  isOpen, 
  onClose, 
  locationName, 
  pointsEarned,
  newBadges 
}) => {
  // Get a random quote
  const randomQuote = medievalQuotes[Math.floor(Math.random() * medievalQuotes.length)];
  
  useEffect(() => {
    // Play sound effect when opened
    if (isOpen) {
      // This would be where we'd play a sound if we had one
      console.log("Playing reward sound");
    }
  }, [isOpen]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-medieval-parchment border-2 border-medieval-brown sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-uncial text-xl text-medieval-burgundy">
            {locationName}
          </DialogTitle>
          <DialogDescription className="text-center text-medieval-brown italic">
            {randomQuote}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Points earned */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Coins className="h-8 w-8 text-medieval-gold animate-gold-sparkle" />
            <span className="font-medieval text-2xl text-medieval-brown">+{pointsEarned} gold</span>
          </div>
          
          {/* New badges */}
          {newBadges.length > 0 && (
            <div className="mt-4 space-y-3">
              <h4 className="font-medieval text-center text-medieval-navy">New Achievement Unlocked!</h4>
              
              <div className="flex flex-col items-center space-y-2">
                {newBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2 badge px-3 py-2">
                    <Award className="h-5 w-5" />
                    <span>{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="medieval-btn w-full">
            Continue Quest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardModal;
