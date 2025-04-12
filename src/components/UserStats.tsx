
import React from 'react';
import { UserData } from '@/utils/gameUtils';
import { Shield, Award, FlameKindling } from 'lucide-react';

interface UserStatsProps {
  userData: UserData;
}

const UserStats: React.FC<UserStatsProps> = ({ userData }) => {
  return (
    <div className="p-4 bg-stone-800/40 rounded-lg">
      <h3 className="font-pixel text-xl text-amber-500 mb-4">Ember Scroll: {userData.uid}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-900/10 rounded-lg p-3 flex items-center space-x-3">
          <Shield className="h-6 w-6 text-amber-500" />
          <div>
            <div className="text-sm text-amber-300/80">Class</div>
            <div className="font-pixel text-amber-300">{userData.role}</div>
          </div>
        </div>
        
        <div className="bg-amber-500/10 rounded-lg p-3 flex items-center space-x-3">
          <FlameKindling className="h-6 w-6 text-amber-500" />
          <div>
            <div className="text-sm text-amber-300/80">Streak</div>
            <div className="font-pixel text-amber-300">{userData.streak} day{userData.streak !== 1 ? 's' : ''}</div>
          </div>
        </div>
        
        <div className="bg-amber-700/10 rounded-lg p-3 flex items-center space-x-3">
          <Award className="h-6 w-6 text-amber-500" />
          <div>
            <div className="text-sm text-amber-300/80">Badges</div>
            <div className="font-pixel text-amber-300">{userData.badges.length}</div>
          </div>
        </div>
      </div>
      
      {/* Badges Section */}
      {userData.badges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-pixel text-amber-300 mb-2">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {userData.badges.map((badge, index) => (
              <span key={index} className="bg-amber-900/30 text-amber-300 text-xs px-2 py-1 rounded font-pixel">
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Activity */}
      <div>
        <h4 className="font-pixel text-amber-300 mb-2">Recent Quests</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {[...userData.accessLogs.feeding, ...userData.accessLogs.training]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 5)
            .map((log, index) => (
              <div 
                key={index} 
                className="text-sm bg-amber-900/10 p-2 rounded border border-amber-900/20"
              >
                <div className="flex justify-between">
                  <span className="font-pixel">
                    {log.locationId}
                  </span>
                  <span className="text-amber-500 font-pixel">
                    +{log.points}
                  </span>
                </div>
                <div className="text-xs text-amber-300/60">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
            
          {[...userData.accessLogs.feeding, ...userData.accessLogs.training].length === 0 && (
            <div className="text-sm text-amber-300/60 italic">
              No quests completed yet. Visit locations to begin your journey!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
