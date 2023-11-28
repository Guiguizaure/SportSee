// types.tsx

// USER MAIN
export interface UserMainData {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore?: number; // Optional
  score?: number; // Optional
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

// USER ACTIVITY
export interface UserActivity {
  userId: number;
  sessions: Session[];
}
export interface Session {
  day: string;
  kilogram: number;
  calories: number;
}

// USER AVERAGE SESSIONS
export interface UserAverageSessions {
  userId: number;
  sessions: AverageSession[];
}
export interface AverageSession {
  day: number;
  sessionLength: number;
}

// USER PERFORMANCE
export interface UserPerformance {
  userId: number;
  kind: PerformanceKind;
  data: PerformanceData[];
}
export interface PerformanceKind {
  [key: number]: string;
}
export interface PerformanceData {
  value: number;
  kind: number; // You might want to map this to more specific types or enums depending on usage
}
