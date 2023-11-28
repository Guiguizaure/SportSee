// DataModel.tsx
import {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
  Session,
  AverageSession,
  PerformanceData,
  PerformanceKind,
} from "../data/types";

export class UserMainDataModel {
  id: number;
  userInfos: UserMainData["userInfos"];
  todayScore: number;
  keyData: UserMainData["keyData"];

  constructor(data: UserMainData) {
    this.id = data.id;
    this.userInfos = data.userInfos;
    this.todayScore = data.todayScore ?? data.score ?? 0;
    this.keyData = data.keyData;
  }
}

export class UserActivityModel {
  userId: number;
  sessions: Session[];

  constructor(data: UserActivity) {
    this.userId = data.userId;
    this.sessions = data.sessions;
  }
}

export class UserAverageSessionsModel {
  userId: number;
  sessions: AverageSession[];

  constructor(data: UserAverageSessions) {
    this.userId = data.userId;
    this.sessions = data.sessions;
  }
}

export class UserPerformanceModel {
  userId: number;
  kind: PerformanceKind;
  data: PerformanceData[];

  constructor(data: UserPerformance) {
    this.userId = data.userId;
    this.kind = data.kind;
    this.data = data.data;
  }

  // Method to get the string representation of the performance kind
  getPerformanceKind(kindId: number): string {
    return this.kind[kindId] || "Unknown";
  }
}
