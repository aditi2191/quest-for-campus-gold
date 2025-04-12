
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { hasVisitedLocationToday, UserData } from '@/utils/gameUtils';

interface CaveEntranceProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  serviceType: 'feeding' | 'training';
  userData: UserData;
  onVisit: () => void;
  onLogVisit: () => void;
}

const CaveEntrance: React.FC<CaveEntranceProps> = ({
  id,
  name,
  description,
  icon,
  serviceType,
  userData,
  onVisit,
  onLogVisit
}) => {
  const hasVisitedToday = hasVisitedLocationToday(userData, serviceType, id);
  
  return (
    <Card className="bg-stone-800 border-2 border-amber-700 overflow-hidden hover:shadow-md hover:shadow-amber-900/20 transition-all">
      <CardHeader className="bg-amber-900/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="bg-stone-700 rounded-full p-3 text-2xl">
            {icon}
          </div>
          <div>
            <CardTitle className="font-pixel text-amber-400 text-lg">{name}</CardTitle>
            <CardDescription className="text-amber-300/80">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="text-sm text-amber-300/80">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
            <span>Earn 10 embers with each visit</span>
          </div>
          
          {hasVisitedToday ? (
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
              <span>Visited today</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-stone-500"></span>
              <span>Not visited today</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2">
        <Button 
          onClick={onVisit}
          className="w-full"
          variant="default"
        >
          Visit Cave (+10 embers)
        </Button>
        <Button 
          onClick={onLogVisit}
          className="w-full"
          variant="outline"
        >
          Log Visit Only
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaveEntrance;
