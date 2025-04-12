
import React from 'react';
import { UserData } from '@/utils/gameUtils';
import { Shield, Award, Flame } from 'lucide-react';

interface UserStatsProps {
  userData: UserData;
}

const UserStats: React.FC<UserStatsProps> = ({ userData }) => {
  return (
    <div className="scroll p-4">
      <h3 className="font-uncial text-xl text-medieval-burgundy mb-4">Royal Scroll of {userData.uid}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-medieval-burgundy/10 rounded-lg p-3 flex items-center space-x-3">
          <Shield className="h-6 w-6 text-medieval-burgundy" />
          <div>
            <div className="text-sm text-medieval-brown/80">Class</div>
            <div className="font-medieval text-medieval-brown">{userData.role}</div>
          </div>
        </div>
        
        <div className="bg-medieval-gold/10 rounded-lg p-3 flex items-center space-x-3">
          <Flame className="h-6 w-6 text-medieval-gold" />
          <div>
            <div className="text-sm text-medieval-brown/80">Streak</div>
            <div className="font-medieval text-medieval-brown">{userData.streak} day{userData.streak !== 1 ? 's' : ''}</div>
          </div>
        </div>
        
        <div className="bg-medieval-navy/10 rounded-lg p-3 flex items-center space-x-3">
          <Award className="h-6 w-6 text-medieval-navy" />
          <div>
            <div className="text-sm text-medieval-brown/80">Badges</div>
            <div className="font-medieval text-medieval-brown">{userData.badges.length}</div>
          </div>
        </div>
      </div>
      
      {/* Badges Section */}
      {userData.badges.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medieval text-medieval-brown mb-2">Achievements</h4>
          <div className="flex flex-wrap gap-2">
            {userData.badges.map((badge, index) => (
              <span key={index} className="badge">
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Activity */}
      <div>
        <h4 className="font-medieval text-medieval-brown mb-2">Recent Quests</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {[...userData.accessLogs.feeding, ...userData.accessLogs.training]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 5)
            .map((log, index) => (
              <div 
                key={index} 
                className="text-sm bg-medieval-brown/5 p-2 rounded border border-medieval-brown/20"
              >
                <div className="flex justify-between">
                  <span className="font-medieval">
                    {log.locationId}
                  </span>
                  <span className="text-medieval-gold font-medieval">
                    +{log.points}
                  </span>
                </div>
                <div className="text-xs text-medieval-brown/60">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
            
          {[...userData.accessLogs.feeding, ...userData.accessLogs.training].length === 0 && (
            <div className="text-sm text-medieval-brown/60 italic">
              No quests completed yet. Visit locations to begin your journey!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
