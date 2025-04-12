
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import CaveEntrance from '@/components/CaveEntrance';
import EmberModal from '@/components/EmberModal';
import { trainingCaves, getUserData, UserData, visitLocation } from '@/utils/gameUtils';

const TrainingGround = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [rewardData, setRewardData] = useState<{
    isOpen: boolean;
    locationName: string;
    pointsEarned: number;
    newBadges: string[];
    sassModeActive: boolean;
  }>({
    isOpen: false,
    locationName: '',
    pointsEarned: 0,
    newBadges: [],
    sassModeActive: false
  });
  
  // Load user data
  useEffect(() => {
    const storedUid = localStorage.getItem('ember-quest-user');
    
    if (storedUid) {
      setUserData(getUserData(storedUid));
    }
  }, []);
  
  const handleVisitLocation = (locationId: string, locationName: string, isSassMode: boolean = false) => {
    if (!userData) return;
    
    if (isSassMode) {
      // Just show the modal with sassy message, no points
      setRewardData({
        isOpen: true,
        locationName,
        pointsEarned: 0,
        newBadges: [],
        sassModeActive: true
      });
      return;
    }
    
    const result = visitLocation(userData, 'training', locationId);
    
    // Update local state
    setUserData(result.userData);
    
    // Show reward modal if points were earned
    if (result.pointsEarned > 0) {
      setRewardData({
        isOpen: true,
        locationName,
        pointsEarned: result.pointsEarned,
        newBadges: result.newBadges,
        sassModeActive: false
      });
    }
  };
  
  const handleLogVisit = (locationId: string, locationName: string) => {
    // For self-tracking without earning points
    handleVisitLocation(locationId, locationName, true);
  };
  
  const handleCloseRewardModal = () => {
    setRewardData(prev => ({ ...prev, isOpen: false }));
  };
  
  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col bg-stone-900">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-pixel text-xl mb-4 text-amber-400">You must register to access this page</h2>
            <Link to="/">
              <Button>Return to Ember Totem</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-stone-900 text-amber-200">
      <Header userData={userData} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="icon" className="border-amber-700 h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="font-pixel text-2xl text-amber-500">Training Grounds</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trainingCaves.map((location) => (
              <CaveEntrance
                key={location.id}
                id={location.id}
                name={location.name}
                description={location.description}
                icon={location.icon}
                serviceType="training"
                userData={userData}
                onVisit={() => handleVisitLocation(location.id, location.name)}
                onLogVisit={() => handleLogVisit(location.id, location.name)}
              />
            ))}
          </div>
          
          <div className="mt-10 bg-stone-800 border-2 border-amber-700 rounded-lg p-6">
            <h2 className="font-pixel text-xl text-amber-500 mb-3">Trainer's Roar</h2>
            <p className="text-amber-300 mb-4">
              Strong cave dwellers of the tribe! Sharpen thy skills at our training grounds. 
              Visit each area to earn embers and power. Those who master all areas shall be honored with the title "Mighty Hunter".
            </p>
            <p className="text-amber-300 italic">
              — Master of Training
            </p>
          </div>
        </div>
      </main>
      
      <EmberModal
        isOpen={rewardData.isOpen}
        onClose={handleCloseRewardModal}
        locationName={rewardData.locationName}
        pointsEarned={rewardData.pointsEarned}
        newBadges={rewardData.newBadges}
        sassModeActive={rewardData.sassModeActive}
      />
    </div>
  );
};

export default TrainingGround;
