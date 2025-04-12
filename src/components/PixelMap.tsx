
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Drumstick, Dumbbell, FlameKindling } from 'lucide-react';

const PixelMap = ({ userData }: { userData: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Link to="/feeding" className="block">
        <Card className="bg-stone-800 border-2 border-amber-700 h-full hover:shadow-lg hover:shadow-amber-500/20 transition-transform hover:translate-y-[-5px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 p-5 bg-amber-900/30 rounded-full">
              <Drumstick size={40} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-pixel text-amber-400 mb-2">Feeding Zones</h3>
            <p className="text-amber-300">Visit ancient feeding grounds and gather sustenance for your tribe</p>
            
            <div className="mt-4 text-xs text-amber-400">
              <span className="flex items-center justify-center gap-1">
                <FlameKindling size={16} />
                <span>+10 embers per visit</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/training" className="block">
        <Card className="bg-stone-800 border-2 border-amber-700 h-full hover:shadow-lg hover:shadow-amber-500/20 transition-transform hover:translate-y-[-5px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 p-5 bg-amber-900/30 rounded-full">
              <Dumbbell size={40} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-pixel text-amber-400 mb-2">Training Grounds</h3>
            <p className="text-amber-300">Train your primal skills and become stronger with each visit</p>
            
            <div className="mt-4 text-xs text-amber-400">
              <span className="flex items-center justify-center gap-1">
                <FlameKindling size={16} />
                <span>+10 embers per visit</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
      
      <Link to="/leaderboard" className="block">
        <Card className="bg-stone-800 border-2 border-amber-700 h-full hover:shadow-lg hover:shadow-amber-500/20 transition-transform hover:translate-y-[-5px]">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 p-5 bg-amber-900/30 rounded-full">
              <FlameKindling size={40} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-pixel text-amber-400 mb-2">Lava Leaderboard</h3>
            <p className="text-amber-300">See how your ember count stacks against other cave dwellers</p>
            
            <div className="mt-4 text-xs text-amber-400">
              <span className="flex items-center justify-center gap-1">
                <span className="font-pixel">{userData?.points || 0}</span>
                <span>your current embers</span>
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default PixelMap;
