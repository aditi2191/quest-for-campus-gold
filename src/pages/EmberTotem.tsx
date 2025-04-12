
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserRegistration from '@/components/UserRegistration';
import PixelMap from '@/components/PixelMap';
import { getUserData } from '@/utils/gameUtils';

const EmberTotem = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  // Check for existing user on load
  useEffect(() => {
    const storedUid = localStorage.getItem('ember-quest-user');
    
    if (storedUid) {
      setUid(storedUid);
      setUserData(getUserData(storedUid));
    }
  }, []);
  
  const handleRegistration = (newUid: string) => {
    localStorage.setItem('ember-quest-user', newUid);
    setUid(newUid);
    setUserData(getUserData(newUid));
  };
  
  const handleLogout = () => {
    localStorage.removeItem('ember-quest-user');
    setUid(null);
    setUserData(null);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-stone-900 text-amber-200">
      <Header userData={userData} onLogout={userData ? handleLogout : undefined} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {!uid ? (
            <div className="py-8">
              <div className="text-center mb-8">
                <h1 className="font-pixel text-3xl md:text-4xl text-amber-500 mb-4">
                  Quest for Campus Embers
                </h1>
                <p className="text-amber-300 max-w-2xl mx-auto">
                  Embark on a prehistoric journey across the university lands. Visit feeding zones and training grounds to earn embers, collect stone badges, and climb the lava leaderboard.
                </p>
              </div>
              
              <UserRegistration onRegister={handleRegistration} />
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="font-pixel text-2xl md:text-3xl text-amber-500">
                  Ancient Lands Map
                </h1>
                <p className="text-amber-300">
                  Choose thy destination, brave cave dweller
                </p>
              </div>
              
              <PixelMap userData={userData} />
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-stone-800 py-4">
        <div className="container mx-auto px-4 text-center text-amber-400">
          <p className="font-pixel text-sm">
            &copy; {new Date().getFullYear()} Prehistoric University | Quest for Campus Embers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EmberTotem;
