
// Date utility functions
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

export const getTodayDate = (): string => {
  return formatDate(new Date());
};

// Streak calculation
export const calculateStreak = (
  lastAccessDate: string | null, 
  currentDate: string
): number => {
  if (!lastAccessDate) return 0;
  
  const last = new Date(lastAccessDate);
  const current = new Date(currentDate);
  
  // Reset day time to compare only dates
  last.setHours(0, 0, 0, 0);
  current.setHours(0, 0, 0, 0);
  
  // Calculate difference in days
  const diffTime = current.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If they played yesterday, continue streak
  if (diffDays === 1) {
    return 1; // Will be added to existing streak
  } 
  // If they played today already, maintain streak
  else if (diffDays === 0) {
    return 0; // No change to streak
  } 
  // If they missed a day, reset streak
  else {
    return -999; // Will reset streak to 0
  }
};

// Badge logic
export const checkBadges = (userData: UserData): string[] => {
  const newBadges: string[] = [];
  
  // Check feeding badges
  const uniqueFeedingVisits = new Set(
    userData.accessLogs.feeding.map(visit => visit.locationId)
  );
  
  if (uniqueFeedingVisits.size >= 3) {
    newBadges.push("Hungry Hunter");
  }
  
  // Check training badges
  const uniqueTrainingVisits = new Set(
    userData.accessLogs.training.map(visit => visit.locationId)
  );
  
  if (uniqueTrainingVisits.size >= 3) {
    newBadges.push("Mighty Hunter");
  }
  
  // Check streak badges
  if (userData.streak >= 5) {
    newBadges.push("Fire Keeper");
  }
  
  return newBadges.filter(badge => !userData.badges.includes(badge));
};

// Get user data with default values
export const getUserData = (uid: string): UserData => {
  const storedData = localStorage.getItem(`ember-quest-${uid}`);
  
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // Default user data with joined timestamp
  const newUserData = {
    uid,
    role: "Hunter", // default role
    streak: 0,
    points: 0,
    lastAccessed: null,
    badges: [],
    joinedAt: Date.now(), // Add timestamp for leaderboard tiebreaker
    accessLogs: {
      feeding: [],
      training: []
    }
  };
  
  // Save the new user data before returning it
  saveUserData(newUserData);
  return newUserData;
};

// Save user data
export const saveUserData = (userData: UserData): void => {
  localStorage.setItem(`ember-quest-${userData.uid}`, JSON.stringify(userData));
};

// Get all users for leaderboard
export const getAllUsers = (): UserData[] => {
  const users: UserData[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('ember-quest-')) {
      const userData = JSON.parse(localStorage.getItem(key) || '{}');
      users.push(userData);
    }
  }
  
  return users;
};

// Types
export interface UserData {
  uid: string;
  role: string;
  streak: number;
  points: number;
  lastAccessed: string | null;
  badges: string[];
  joinedAt?: number; // For leaderboard tiebreakers
  accessLogs: {
    feeding: Visit[];
    training: Visit[];
  };
}

export interface Visit {
  locationId: string;
  timestamp: string;
  points: number;
}

// Service data
export const feedingCaves = [
  {
    id: "mosspit",
    name: "Mosspit",
    description: "Wild berries and roots await",
    icon: "🍖"
  },
  {
    id: "riverfang",
    name: "Riverfang",
    description: "Fresh fish from the rapids",
    icon: "🐟"
  },
  {
    id: "stonegrill",
    name: "Stonegrill",
    description: "Hot rocks cook the finest meats",
    icon: "🔥"
  }
];

export const trainingCaves = [
  {
    id: "clawstone",
    name: "Clawstone Crater",
    description: "Build strength by lifting rocks",
    icon: "💪"
  },
  {
    id: "spearrange",
    name: "Bone Spear Range",
    description: "Practice accurate throwing skills",
    icon: "🏹"
  },
  {
    id: "tarfield",
    name: "Tarfield Trails",
    description: "Run through sticky pits for endurance",
    icon: "👣"
  }
];

// Visit location logic - now allowing multiple visits per day
export const visitLocation = (
  userData: UserData,
  serviceType: 'feeding' | 'training',
  locationId: string
): {
  userData: UserData;
  pointsEarned: number;
  newBadges: string[];
} => {
  const today = getTodayDate();
  const locations = serviceType === 'feeding' ? feedingCaves : trainingCaves;
  const location = locations.find(loc => loc.id === locationId);
  
  if (!location) {
    throw new Error("Location not found");
  }
  
  // Calculate streak
  let updatedStreak = userData.streak;
  if (userData.lastAccessed !== today) {
    const streakChange = calculateStreak(userData.lastAccessed, today);
    if (streakChange < 0) {
      updatedStreak = 0; // Reset streak
    } else {
      updatedStreak += streakChange;
    }
  }
  
  // Calculate points (with streak bonus)
  let pointsEarned = 10; // Base points
  if (updatedStreak >= 3) {
    pointsEarned *= 2; // Double points for 3+ day streak
  }
  
  // Create visit record
  const visit: Visit = {
    locationId,
    timestamp: new Date().toISOString(),
    points: pointsEarned
  };
  
  // Update user data
  const updatedUserData: UserData = {
    ...userData,
    streak: updatedStreak,
    points: userData.points + pointsEarned,
    lastAccessed: today,
    accessLogs: {
      ...userData.accessLogs,
      [serviceType]: [...userData.accessLogs[serviceType], visit]
    }
  };
  
  // Check for new badges
  const newBadges = checkBadges(updatedUserData).filter(
    badge => !userData.badges.includes(badge)
  );
  
  // Add new badges if any
  if (newBadges.length > 0) {
    updatedUserData.badges = [...updatedUserData.badges, ...newBadges];
  }
  
  // Save updated user data
  saveUserData(updatedUserData);
  
  return {
    userData: updatedUserData,
    pointsEarned,
    newBadges
  };
};

// Helper to check if a user has visited a location
export const hasVisitedLocation = (
  userData: UserData,
  serviceType: 'feeding' | 'training',
  locationId: string
): boolean => {
  return userData.accessLogs[serviceType].some(visit => visit.locationId === locationId);
};

// Helper to check if a user has visited a location today
export const hasVisitedLocationToday = (
  userData: UserData,
  serviceType: 'feeding' | 'training',
  locationId: string
): boolean => {
  const today = getTodayDate();
  return userData.accessLogs[serviceType].some(
    visit => visit.locationId === locationId && visit.timestamp.startsWith(today)
  );
};
