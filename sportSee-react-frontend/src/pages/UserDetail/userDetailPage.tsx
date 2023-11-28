import React, { useState, useEffect } from "react";
import { useDataSource } from "../../contexts/DataSourceContext";
// UserDetailPage.tsx
import { useParams } from "react-router-dom";
//data
import {
  USER_ACTIVITY,
  USER_PERFORMANCE,
  USER_AVERAGE_SESSIONS,
} from "../../data/userMainData.json";
//types
import { UserPerformance, UserAverageSessions } from "../../data/types";
//Components
import AverageSessionsChart from "../../components/Graphs/averageSessionsChart";
import ScoreChart from "../../components/Graphs/scoreChart";
import CustomRadarChart from "../../components/Graphs/radarChart";
import D3BarChart from "../../components/Graphs/barChart";
import KeyData from "../../components/KeyData/keyData";
//Key Data icons
import caloriesIcon from "../../assets/calories-icon.svg";
import proteinIcon from "../../assets/protein-icon.svg";
import glucidesIcon from "../../assets/carbs-icon.svg";
import lipidesIcon from "../../assets/fat-icon.svg";

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchUserData, userData } = useDataSource();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        try {
          await fetchUserData(parseInt(id));
        } catch (err) {
          setError("Failed to fetch user data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadData();
  }, [id, fetchUserData]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  // Replace direct data references with userData
  const userActivity = USER_ACTIVITY.find(
    (activity) => activity.userId === userData.id
  );
  const userPerformance = USER_PERFORMANCE.find(
    (performance: UserPerformance) => performance.userId === userData.id
  );
  const userAverageSessions = USER_AVERAGE_SESSIONS.find(
    (session: UserAverageSessions) => session.userId === userData.id
  );

  return (
    <div className="user_page">
      <h1 className="title">
        Bonjour{" "}
        <span className="first-name">{userData.userInfos.firstName}</span>
      </h1>
      <p className="subtitle">
        Félicitation! Vous avez explosé vos objectifs hier
      </p>

      <div className="user_info flex gap-[31px] flex-col-reverse xl:flex-row">
        <div className="user_info_left flex flex-col gap-[30px] xl:items-start items-center">
          {userActivity && <D3BarChart sessions={userActivity.sessions} />}
          <div className="user_info_left--bottom flex lg:flex-nowrap flex-wrap gap-[30px] h-[250px]">
            {userAverageSessions && (
              <AverageSessionsChart averageSessionsData={userAverageSessions} />
            )}
            {userPerformance && <CustomRadarChart userData={userPerformance} />}
            {userData && <ScoreChart userData={userData} />}
          </div>
        </div>
        <div className="user_info_right grid grid-cols-2 xl:grid-cols-1 gap-x-[30px] gap-y-[39px]">
          <KeyData
            dataIcon={caloriesIcon}
            dataNumber={userData.keyData.calorieCount + "kCal"}
            dataType="Calories"
          />
          <KeyData
            dataIcon={proteinIcon}
            dataNumber={userData.keyData.proteinCount + "g"}
            dataType="Proteines"
          />
          <KeyData
            dataIcon={glucidesIcon}
            dataNumber={userData.keyData.carbohydrateCount + "g"}
            dataType="Glucides"
          />
          <KeyData
            dataIcon={lipidesIcon}
            dataNumber={userData.keyData.lipidCount + "g"}
            dataType="Lipides"
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
