
import React from 'react';
import { Link } from 'react-router-dom';
import { FlameKindling, Medal, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { UserData } from '@/utils/gameUtils';

interface HeaderProps {
  userData?: UserData;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userData, onLogout }) => {
  return (
    <header className="bg-stone-800 text-amber-200 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FlameKindling className="h-6 w-6 text-amber-500 animate-pulse" />
          <Link to="/" className="font-pixel text-xl tracking-wider">
            Quest for Campus Embers
          </Link>
        </div>
        
        {userData && (
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Medal className="h-5 w-5 text-amber-500" />
                <span className="font-pixel">{userData.points} embers</span>
              </div>
              
              <div className="text-sm">
                <span className="font-pixel">{userData.role}</span>
                <span className="mx-1">•</span>
                <span className="font-pixel">{userData.uid}</span>
              </div>
            </div>
            
            {onLogout && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onLogout}
                className="text-amber-200 hover:text-amber-500 hover:bg-stone-700"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="font-pixel text-xs">Logout</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
