
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { getUserData, saveUserData, visitLocation, trainingCaves } from '@/utils/gameUtils';
import LocationCard from '@/components/LocationCard';
import RewardModal from '@/components/RewardModal';
import { useToast } from '@/hooks/use-toast';

const AthleticsPage = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [userData, setUserData] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [rewardData, setRewardData] = useState({ locationName: '', pointsEarned: 0, newBadges: [] });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedUid = localStorage.getItem('ember-quest-user');
    if (!storedUid) {
      navigate('/');
      return;
    }
    
    setUid(storedUid);
    setUserData(getUserData(storedUid));
  }, [navigate]);
  
  const handleVisit = (location) => {
    try {
      const result = visitLocation(userData, 'training', location.id);
      setUserData(result.userData);
      setRewardData({
        locationName: location.name,
        pointsEarned: result.pointsEarned,
        newBadges: result.newBadges
      });
      setShowReward(true);
    } catch (error) {
      toast({
        title: "Visit Error",
        description: "Could not record your visit at this time.",
        variant: "destructive"
      });
      console.error(error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('ember-quest-user');
    navigate('/');
  };
  
  if (!userData) return <div>Loading...</div>;
  
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      <Header userData={userData} onLogout={handleLogout} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="font-uncial text-3xl text-medieval-burgundy mb-2">Training Grounds</h1>
            <p className="text-medieval-brown">Hone thy skills and build thy strength</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingCaves.map((location) => (
              <LocationCard
                key={location.id}
                id={location.id}
                name={location.name}
                description={location.description}
                icon={location.icon}
                serviceType="training"
                userData={userData}
                onVisit={() => handleVisit(location)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <RewardModal
        isOpen={showReward}
        onClose={() => setShowReward(false)}
        locationName={rewardData.locationName}
        pointsEarned={rewardData.pointsEarned}
        newBadges={rewardData.newBadges}
      />
    </div>
  );
};

export default AthleticsPage;
