
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import UserRegistration from '@/components/UserRegistration';
import MedievalMap from '@/components/MedievalMap';
import { getUserData } from '@/utils/gameUtils';

const Index = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  // Check for existing user on load
  useEffect(() => {
    const storedUid = localStorage.getItem('current-quest-user');
    
    if (storedUid) {
      setUid(storedUid);
      setUserData(getUserData(storedUid));
    }
  }, []);
  
  const handleRegistration = (newUid: string) => {
    localStorage.setItem('current-quest-user', newUid);
    setUid(newUid);
    setUserData(getUserData(newUid));
  };
  
  const handleLogout = () => {
    localStorage.removeItem('current-quest-user');
    setUid(null);
    setUserData(null);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header userData={userData} onLogout={userData ? handleLogout : undefined} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {!uid ? (
            <div className="py-8">
              <div className="text-center mb-8">
                <h1 className="font-uncial text-3xl md:text-4xl text-medieval-burgundy mb-4">
                  Quest for Campus Gold
                </h1>
                <p className="text-medieval-brown max-w-2xl mx-auto">
                  Embark on a noble quest across the university kingdom. Visit dining halls and athletic fields to earn gold, collect badges, and climb the royal leaderboard.
                </p>
              </div>
              
              <UserRegistration onRegister={handleRegistration} />
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="font-uncial text-2xl md:text-3xl text-medieval-burgundy">
                  Royal Map of the Kingdom
                </h1>
                <p className="text-medieval-brown">
                  Choose thy destination wisely, brave adventurer
                </p>
              </div>
              
              <MedievalMap userData={userData} />
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-medieval-brown py-4">
        <div className="container mx-auto px-4 text-center text-medieval-parchment">
          <p className="font-medieval text-sm">
            &copy; {new Date().getFullYear()} Kingdom University | Quest for Campus Gold
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
