// ApiCall.tsx
import axios, { AxiosError } from "axios";
import {
  UserMainDataModel,
  UserActivityModel,
  UserAverageSessionsModel,
  UserPerformanceModel,
} from "./DataModel"; //
import {
  UserMainData,
  UserActivity,
  UserAverageSessions,
  UserPerformance,
} from "../data/types";

const api = axios.create({
  baseURL: "http://localhost:3000/user",
});

// Fetch User Info
export const getUserInfo = async (
  userId: number
): Promise<UserMainDataModel> => {
  try {
    const { data: apiResponse } = await api.get<{ data: UserMainData }>(
      `/${userId}`
    );
    return new UserMainDataModel(apiResponse.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Fetch User Activity
export const getUserActivity = async (
  userId: number
): Promise<UserActivityModel> => {
  try {
    const { data: apiResponse } = await api.get<{ data: UserActivity }>(
      `/${userId}/activity`
    );
    return new UserActivityModel(apiResponse.data);
  } catch (error) {
    console.error("Error fetching user activity data:", error);
    throw error;
  }
};

// Fetch User Average Sessions
export const getUserAverageSessions = async (
  userId: number
): Promise<UserAverageSessionsModel> => {
  try {
    const { data: apiResponse } = await api.get<{ data: UserAverageSessions }>(
      `/${userId}/average-sessions`
    );
    return new UserAverageSessionsModel(apiResponse.data);
  } catch (error) {
    console.error("Error fetching user average sessions data:", error);
    throw error;
  }
};

// Fetch User Performance
export const getUserPerformance = async (
  userId: number
): Promise<UserPerformanceModel> => {
  try {
    const { data: apiResponse } = await api.get<{ data: UserPerformance }>(
      `/${userId}/performance`
    );

    const performanceData = {
      ...apiResponse.data,
      data: apiResponse.data.data,
    };
    return new UserPerformanceModel(performanceData);
  } catch (error) {
    console.error("Error fetching user performance data:", error);
    throw error;
  }
};

//Find the number of user, to then display them on the profilePage
//Not pratical on a project with a lot of user, this is for the sake of the uni project
const USER_ID_RANGE = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

export const fetchAllUsersIndividually = async (): Promise<
  UserMainDataModel[]
> => {
  const users = [];
  for (const userId of USER_ID_RANGE) {
    try {
      const userData = await getUserInfo(userId);
      users.push(userData);
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion
      if (axiosError.response && axiosError.response.status === 404) {
        console.log(`User ID ${userId} not found, skipping.`);
      } else {
        console.error(`Error fetching data for user ID ${userId}:`, axiosError);
        throw error;
      }
    }
  }
  return users;
};
