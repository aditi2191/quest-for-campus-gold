
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import UserStats from '@/components/UserStats';
import { getAllUsers, getUserData, UserData } from '@/utils/gameUtils';

const LavaLeaderboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [pointsToNextRank, setPointsToNextRank] = useState<{
    points: number;
    username: string;
  } | null>(null);
  
  // Load user data and leaderboard
  useEffect(() => {
    const storedUid = localStorage.getItem('ember-quest-user');
    
    if (storedUid) {
      const currentUserData = getUserData(storedUid);
      setUserData(currentUserData);
      
      // Get all users for leaderboard
      const users = getAllUsers();
      
      // Sort by points (highest first) then by timestamp (earliest first for ties)
      const sortedUsers = users.sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        // If points are tied, the user who joined earlier gets higher rank
        const aTimestamp = a.joinedAt || 0;
        const bTimestamp = b.joinedAt || 0;
        return aTimestamp - bTimestamp;
      });
      
      setAllUsers(sortedUsers);
      
      // Find current user's rank
      const rank = sortedUsers.findIndex(user => user.uid === storedUid);
      setCurrentUserRank(rank !== -1 ? rank + 1 : null);
      
      // Calculate how many points needed to beat the next person
      if (rank > 0) {
        setPointsToNextRank({
          points: sortedUsers[rank - 1].points - currentUserData.points,
          username: sortedUsers[rank - 1].uid
        });
      }
    } else {
      // Still show leaderboard even if not logged in
      const users = getAllUsers();
      const sortedUsers = users.sort((a, b) => {
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        const aTimestamp = a.joinedAt || 0;
        const bTimestamp = b.joinedAt || 0;
        return aTimestamp - bTimestamp;
      });
      setAllUsers(sortedUsers);
    }
  }, []);
  
  // Trophy icons for top 3
  const rankIcons = [
    <Trophy key={1} className="h-5 w-5 text-amber-400" />,
    <Medal key={2} className="h-5 w-5 text-slate-400" />,
    <Award key={3} className="h-5 w-5 text-amber-600" />
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-stone-900 text-amber-200">
      <Header userData={userData} onLogout={userData ? () => {
        localStorage.removeItem('ember-quest-user');
        window.location.href = '/';
      } : undefined} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex items-center">
            <Link to="/" className="mr-4">
              <Button variant="outline" size="icon" className="border-amber-700 h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="font-pixel text-2xl text-amber-500">Lava Leaderboard</h1>
          </div>
          
          {userData && (
            <div className="mb-8">
              <UserStats userData={userData} />
            </div>
          )}
          
          <div className="bg-stone-800 border-2 border-amber-700 rounded-lg p-6 mb-8">
            <h2 className="font-pixel text-xl text-amber-500 mb-6 text-center">
              The Tribe's Mightiest Cave Dwellers
            </h2>
            
            {allUsers.length > 0 ? (
              <div className="overflow-hidden rounded-md border border-amber-700">
                <table className="w-full">
                  <thead className="bg-amber-900/20">
                    <tr>
                      <th className="py-3 px-4 text-left font-pixel text-amber-400">Rank</th>
                      <th className="py-3 px-4 text-left font-pixel text-amber-400">Name</th>
                      <th className="py-3 px-4 text-left font-pixel text-amber-400">Role</th>
                      <th className="py-3 px-4 text-right font-pixel text-amber-400">Embers</th>
                      <th className="py-3 px-4 text-right font-pixel text-amber-400">Badges</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user, index) => (
                      <tr 
                        key={user.uid}
                        className={`border-t border-amber-900/20 ${userData && user.uid === userData.uid ? 'bg-amber-500/10' : ''}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            {index < 3 ? rankIcons[index] : 
                              <span className="text-amber-300">{index + 1}</span>
                            }
                          </div>
                        </td>
                        <td className="py-3 px-4 font-pixel">
                          {user.uid}
                          {userData && user.uid === userData.uid && 
                            <span className="ml-2 text-xs text-amber-500">(You)</span>
                          }
                        </td>
                        <td className="py-3 px-4 text-amber-300">{user.role}</td>
                        <td className="py-3 px-4 text-right font-pixel text-amber-500">
                          {user.points}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {user.badges.length > 0 ? (
                            <span className="badge">
                              {user.badges.length}
                            </span>
                          ) : (
                            <span className="text-amber-300 text-sm">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-amber-300 italic py-8">
                The tribe awaits its first brave cave dweller!
              </div>
            )}
          </div>
          
          {userData && currentUserRank !== null && pointsToNextRank && (
            <div className="bg-amber-500/10 border-2 border-amber-500 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-pixel text-amber-300">Your Standing</h3>
                  <p className="text-amber-300">
                    Rank: <span className="font-pixel">{currentUserRank}</span> of {allUsers.length}
                  </p>
                </div>
                <div className="text-right">
                  {pointsToNextRank.points > 0 && (
                    <p className="text-amber-300">
                      ⚠️ You need <span className="font-pixel text-amber-500">{pointsToNextRank.points}</span> more embers to dethrone <span className="font-pixel">{pointsToNextRank.username}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LavaLeaderboard;
