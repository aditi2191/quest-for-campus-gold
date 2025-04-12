
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Wand2, Target } from "lucide-react";
import { getUserData, saveUserData } from '@/utils/gameUtils';
import { toast } from '@/hooks/use-toast';

interface UserRegistrationProps {
  onRegister: (uid: string) => void;
}

const UserRegistration: React.FC<UserRegistrationProps> = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('Knight');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        title: "Halt, traveler!",
        description: "Thou must provide a name for the quest records.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get default user data and update with chosen values
      const userData = getUserData(username);
      userData.role = role;
      
      // Save to local storage
      saveUserData(userData);
      
      toast({
        title: "Welcome, brave adventurer!",
        description: `${role} ${username}, thy quest begins now.`,
      });
      
      // Notify parent component
      onRegister(username);
    } catch (error) {
      toast({
        title: "A spell has gone awry!",
        description: "Could not register. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-medieval-brown bg-medieval-parchment">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-medieval-burgundy">Join the Quest</CardTitle>
        <CardDescription className="text-center text-medieval-brown">
          Register thy name in the royal scrolls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-medieval-brown">Choose thy title</Label>
            <Input
              id="username"
              placeholder="e.g., sir_aditi"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-medieval-brown bg-white/70"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-medieval-brown">Select thy class</Label>
            <RadioGroup value={role} onValueChange={setRole} className="flex justify-between pt-2">
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-4 rounded-full ${role === 'Knight' ? 'bg-medieval-burgundy text-white' : 'bg-slate-200'}`}>
                  <Shield className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Knight" id="knight" />
                  <Label htmlFor="knight" className="text-sm font-medieval">Knight</Label>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-4 rounded-full ${role === 'Mage' ? 'bg-medieval-navy text-white' : 'bg-slate-200'}`}>
                  <Wand2 className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Mage" id="mage" />
                  <Label htmlFor="mage" className="text-sm font-medieval">Mage</Label>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-4 rounded-full ${role === 'Archer' ? 'bg-medieval-forest text-white' : 'bg-slate-200'}`}>
                  <Target className="h-6 w-6" />
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Archer" id="archer" />
                  <Label htmlFor="archer" className="text-sm font-medieval">Archer</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full medieval-btn"
          >
            Begin Thy Quest
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserRegistration;
