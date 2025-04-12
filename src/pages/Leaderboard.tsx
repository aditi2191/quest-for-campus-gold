
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import { getAllUsers, getUserData, UserData } from '@/utils/gameUtils';

const Leaderboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  
  // Load user data and leaderboard
  useEffect(() => {
    const storedUid = localStorage.getItem('current-quest-user');
    
    if (storedUid) {
      const currentUserData = getUserData(storedUid);
      setUserData(currentUserData);
      
      // Get all users for leaderboard
      const users = getAllUsers();
      
      // Sort by points (highest first)
      const sortedUsers = users.sort((a, b) => b.points - a.points);
      setAllUsers(sortedUsers);
      
      // Find current user's rank
      const rank = sortedUsers.findIndex(user => user.uid === storedUid);
      setCurrentUserRank(rank !== -1 ? rank + 1 : null);
    } else {
      // Still show leaderboard even if not logged in
      const users = getAllUsers();
      const sortedUsers = users.sort((a, b) => b.points - a.points);
      setAllUsers(sortedUsers);
    }
  }, []);
  
  // Trophy icons for top 3
  const rankIcons = [
    <Trophy key={1} className="h-5 w-5 text-yellow-500" />,
    <Medal key={2} className="h-5 w-5 text-gray-400" />,
    <Award key={3} className="h-5 w-5 text-amber-700" />
  ];
  
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
            <h1 className="font-uncial text-2xl text-medieval-gold">Royal Leaderboard</h1>
          </div>
          
          <div className="bg-medieval-parchment border-2 border-medieval-brown rounded-lg p-6 mb-8">
            <h2 className="font-medieval text-xl text-medieval-burgundy mb-6 text-center">
              The Kingdom's Most Valiant Questers
            </h2>
            
            {allUsers.length > 0 ? (
              <div className="overflow-hidden rounded-md border border-medieval-brown">
                <table className="w-full">
                  <thead className="bg-medieval-brown/20">
                    <tr>
                      <th className="py-3 px-4 text-left font-medieval text-medieval-brown">Rank</th>
                      <th className="py-3 px-4 text-left font-medieval text-medieval-brown">Name</th>
                      <th className="py-3 px-4 text-left font-medieval text-medieval-brown">Class</th>
                      <th className="py-3 px-4 text-right font-medieval text-medieval-brown">Gold</th>
                      <th className="py-3 px-4 text-right font-medieval text-medieval-brown">Badges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user, index) => (
                      <tr 
                        key={user.uid}
                        className={`border-t border-medieval-brown/20 ${userData && user.uid === userData.uid ? 'bg-medieval-gold/10' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {index < 3 ? rankIcons[index] : 
                              <span className="text-medieval-brown">{index + 1}</span>
                            }
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medieval">
                          {user.uid}
                          {userData && user.uid === userData.uid && 
                            <span className="ml-2 text-xs text-medieval-burgundy">(You)</span>
                          }
                        </td>
                        <td className="py-3 px-4 text-medieval-brown">{user.role}</td>
                        <td className="py-3 px-4 text-right font-medieval text-medieval-gold">
                          {user.points}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {user.badges.length > 0 ? (
                            <span className="badge">
                              {user.badges.length}
                            </span>
                          ) : (
                            <span className="text-medieval-brown text-sm">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-medieval-brown italic py-8">
                The kingdom awaits its first brave adventurer!
              </div>
            )}
          </div>
          
          {userData && currentUserRank !== null && (
            <div className="bg-medieval-gold/10 border-2 border-medieval-gold rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medieval text-medieval-brown">Your Standing</h3>
                  <p className="text-medieval-brown">
                    Rank: <span className="font-medieval">{currentUserRank}</span> of {allUsers.length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-medieval-brown">Next reward at:</p>
                  <p className="font-medieval text-medieval-gold">{userData.points + 10} gold</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
