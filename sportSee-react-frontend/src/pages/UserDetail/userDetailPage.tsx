// UserDetailPage.tsx
import { useParams } from "react-router-dom";
//data
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_PERFORMANCE,
  USER_AVERAGE_SESSIONS,
} from "../../data/userMainData.json";
//types
import {
  UserMainData,
  UserPerformance,
  UserAverageSessions,
} from "../../data/types";
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
  const { id } = useParams();
  const user = USER_MAIN_DATA.find(
    (user: UserMainData) => user.id.toString() === id
  );

  if (!user) {
    return <div>User not found</div>;
  }

  const userActivity = USER_ACTIVITY.find(
    (activity) => activity.userId === user.id
  );

  const userPerformance = USER_PERFORMANCE.find(
    (performance: UserPerformance) => performance.userId === user.id
  );

  const userAverageSessions = USER_AVERAGE_SESSIONS.find(
    (session: UserAverageSessions) => session.userId === user.id
  );

  return (
    <div className="user_page">
      <h1>
        Bonjour <span className="first-name">{user.userInfos.firstName}</span>
      </h1>
      <p>Félicitation! Vous avez explosé vos objectifs hier</p>

      <div className="user_info flex gap-[31px]">
        <div className="user_info_left flex flex-col gap-[30px]">
          {userActivity && <D3BarChart sessions={userActivity.sessions} />}
          <div className="user_info_left--bottom flex  gap-[30px] h-[250px]">
            {userAverageSessions && (
              <AverageSessionsChart averageSessionsData={userAverageSessions} />
            )}
            {userPerformance && <CustomRadarChart userData={userPerformance} />}
            {user && <ScoreChart userData={user} />}
          </div>
        </div>
        <div className="user_info_right flex flex-col gap-y-[39px]">
          <KeyData
            dataIcon={caloriesIcon}
            dataNumber={user.keyData.calorieCount + "kCal"}
            dataType="Calories"
          />
          <KeyData
            dataIcon={proteinIcon}
            dataNumber={user.keyData.calorieCount + "g"}
            dataType="Proteines"
          />
          <KeyData
            dataIcon={glucidesIcon}
            dataNumber={user.keyData.calorieCount + "g"}
            dataType="Glucides"
          />
          <KeyData
            dataIcon={lipidesIcon}
            dataNumber={user.keyData.calorieCount + "g"}
            dataType="Lipides"
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
