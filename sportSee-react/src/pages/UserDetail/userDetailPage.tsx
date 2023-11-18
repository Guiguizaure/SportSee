// UserDetailPage.tsx
import { useParams } from "react-router-dom";
import { USER_MAIN_DATA, USER_ACTIVITY } from "../../data/userMainData.json";
import { UserMainData } from "../../data/types";
import BarChart from "../../components/Graphs/barChart";

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

  return (
    <div className="user_page">
      <h1>
        Bonjour <span className="first-name">{user.userInfos.firstName}</span>
      </h1>
      <p>Félicitation! Vous avez explosé vos objectifs hier</p>

      <div className="user_info">
        <div className="user_info_left">
          {userActivity && <BarChart sessions={userActivity.sessions} />}
        </div>
        <div className="user_info_right"></div>
      </div>

      {/* <p>
        Name: {user.userInfos.firstName} {user.userInfos.lastName}
      </p>
      <p>Age: {user.userInfos.age}</p> */}
    </div>
  );
};

export default UserDetailPage;
