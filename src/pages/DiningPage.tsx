
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import LocationCard from '@/components/LocationCard';
import RewardModal from '@/components/RewardModal';
import { diningLocations, getUserData, UserData, visitLocation } from '@/utils/gameUtils';

const DiningPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [rewardData, setRewardData] = useState<{
    isOpen: boolean;
    locationName: string;
    pointsEarned: number;
    newBadges: string[];
  }>({
    isOpen: false,
    locationName: '',
    pointsEarned: 0,
    newBadges: []
  });
  
  // Load user data
  useEffect(() => {
    const storedUid = localStorage.getItem('current-quest-user');
    
    if (storedUid) {
      setUserData(getUserData(storedUid));
    }
  }, []);
  
  const handleVisitLocation = (locationId: string, locationName: string) => {
    if (!userData) return;
    
    const result = visitLocation(userData, 'dining', locationId);
    
    // Update local state
    setUserData(result.userData);
    
    // Show reward modal if points were earned
    if (result.pointsEarned > 0) {
      setRewardData({
        isOpen: true,
        locationName,
        pointsEarned: result.pointsEarned,
        newBadges: result.newBadges
      });
    }
  };
  
  const handleCloseRewardModal = () => {
    setRewardData(prev => ({ ...prev, isOpen: false }));
  };
  
  if (!userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-medieval text-xl mb-4">You must register to access this page</h2>
            <Link to="/">
              <Button className="medieval-btn">Return to Homepage</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header userData={userData} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="icon" className="border-medieval-brown h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="font-uncial text-2xl text-medieval-burgundy">Royal Dining Halls</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diningLocations.map((location) => (
              <LocationCard
                key={location.id}
                id={location.id}
                name={location.name}
                description={location.description}
                icon={location.icon}
                serviceType="dining"
                userData={userData}
                onVisit={() => handleVisitLocation(location.id, location.name)}
              />
            ))}
          </div>
          
          <div className="mt-10 bg-medieval-parchment border-2 border-medieval-brown rounded-lg p-6">
            <h2 className="font-medieval text-xl text-medieval-burgundy mb-3">The Great Hall Decree</h2>
            <p className="text-medieval-brown mb-4">
              Hear ye, hear ye! By royal decree, all subjects of the kingdom are entitled to one visit per dining hall per day.
              Each visit shall be rewarded with 10 gold pieces. Those who maintain a streak of three days shall receive double gold!
            </p>
            <p className="text-medieval-brown italic">
              — Signed with the Royal Seal
            </p>
          </div>
        </div>
      </main>
      
      <RewardModal
        isOpen={rewardData.isOpen}
        onClose={handleCloseRewardModal}
        locationName={rewardData.locationName}
        pointsEarned={rewardData.pointsEarned}
        newBadges={rewardData.newBadges}
      />
    </div>
  );
};

export default DiningPage;
