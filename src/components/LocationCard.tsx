
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserData, hasVisitedLocationToday } from '@/utils/gameUtils';
import { CheckCircle } from 'lucide-react';

interface LocationCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  serviceType: 'dining' | 'athletics';
  userData: UserData;
  onVisit: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  id, 
  name, 
  description, 
  icon, 
  serviceType,
  userData,
  onVisit
}) => {
  const visitedToday = hasVisitedLocationToday(userData, serviceType, id);
  
  return (
    <Card className={`border-2 ${visitedToday ? 'border-medieval-gold bg-medieval-parchment/80' : 'border-medieval-brown bg-medieval-parchment/50'} transition-all duration-300 hover:shadow-md`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="font-medieval text-lg text-medieval-brown">{name}</CardTitle>
            <CardDescription className="text-medieval-brown/70 italic">{description}</CardDescription>
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {visitedToday && (
          <div className="flex items-center space-x-2 text-medieval-forest mb-2">
            <CheckCircle className="h-4 w-4" />
            <span className="text-sm font-medieval">Visited today</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onVisit}
          disabled={visitedToday}
          className={visitedToday 
            ? "w-full bg-medieval-gold/70 text-medieval-brown cursor-not-allowed" 
            : "w-full medieval-btn"
          }
        >
          {visitedToday ? "Already Visited" : "Visit Location"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;
