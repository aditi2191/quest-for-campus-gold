
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Castle, UtensilsCrossed, Medal } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UserData } from '@/utils/gameUtils';
import UserStats from './UserStats';

interface MedievalMapProps {
  userData: UserData;
}

const MedievalMap: React.FC<MedievalMapProps> = ({ userData }) => {
  const [showStats, setShowStats] = useState(false);
  
  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Background Map */}
      <div className="relative w-full aspect-[4/3] bg-medieval-parchment rounded-lg border-4 border-medieval-brown p-8">
        {/* Decorative map elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-medieval-brown rounded-full"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-medieval-brown rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-medieval-brown rounded-full"></div>
          
          {/* Paths */}
          <div className="absolute top-1/3 left-1/2 w-1/4 h-1 bg-medieval-brown"></div>
          <div className="absolute top-1/2 left-1/4 w-1 h-1/4 bg-medieval-brown"></div>
          <div className="absolute bottom-1/3 right-1/2 w-1/5 h-1 bg-medieval-brown"></div>
        </div>
        
        {/* Map Content */}
        <div className="relative h-full flex flex-col justify-between">
          <div className="text-center mb-6">
            <h2 className="font-uncial text-2xl text-medieval-brown">University Kingdom</h2>
            <p className="text-sm text-medieval-brown/80 italic">Anno domini MMXXIII</p>
          </div>
          
          <div className="flex justify-around">
            {/* Dining Area */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/dining"
                    className="group flex flex-col items-center space-y-2"
                  >
                    <div className="w-24 h-24 bg-medieval-burgundy/10 border-2 border-medieval-brown rounded-lg flex items-center justify-center group-hover:bg-medieval-burgundy/20 transition-colors duration-300">
                      <UtensilsCrossed className="w-12 h-12 text-medieval-burgundy group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="font-medieval text-medieval-brown text-lg">Dining Halls</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit royal dining halls to earn gold</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Athletics Area */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link 
                    to="/athletics"
                    className="group flex flex-col items-center space-y-2" 
                  >
                    <div className="w-24 h-24 bg-medieval-navy/10 border-2 border-medieval-brown rounded-lg flex items-center justify-center group-hover:bg-medieval-navy/20 transition-colors duration-300">
                      <Castle className="w-12 h-12 text-medieval-navy group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="font-medieval text-medieval-brown text-lg">Athletic Fields</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Train at athletic fields to earn gold</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Bottom Navigation */}
          <div className="flex justify-between mt-8">
            <Link 
              to="/leaderboard"
              className="flex items-center space-x-2 text-medieval-brown hover:text-medieval-gold transition-colors duration-300"
            >
              <Medal className="w-5 h-5" />
              <span className="font-medieval">Leaderboard</span>
            </Link>
            
            <button
              onClick={() => setShowStats(!showStats)}
              className="flex items-center space-x-2 text-medieval-brown hover:text-medieval-gold transition-colors duration-300"
            >
              <span className="font-medieval">{showStats ? 'Hide Stats' : 'Show Stats'}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats Panel */}
      {showStats && (
        <Card className="mt-6 border-medieval-brown">
          <CardContent className="pt-6">
            <UserStats userData={userData} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MedievalMap;
