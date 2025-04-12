
import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Medal, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserData } from '@/utils/gameUtils';

interface HeaderProps {
  userData?: UserData;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userData, onLogout }) => {
  return (
    <header className="bg-medieval-burgundy text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Crown className="h-6 w-6 text-medieval-gold animate-gold-sparkle" />
          <Link to="/" className="font-uncial text-xl tracking-wider">
            Quest for Campus Gold
          </Link>
        </div>
        
        {userData && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Medal className="h-5 w-5 text-medieval-gold" />
                <span className="font-medieval">{userData.points} gold</span>
              </div>
              
              <div className="text-sm">
                <span className="font-medieval">{userData.role}</span>
                <span className="mx-1">•</span>
                <span className="font-medieval">{userData.uid}</span>
              </div>
            </div>
            
            {onLogout && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onLogout}
                className="text-white hover:text-medieval-gold hover:bg-medieval-burgundy/80"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="font-medieval text-xs">Logout</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
