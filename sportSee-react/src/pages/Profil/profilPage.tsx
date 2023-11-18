import { Link } from "react-router-dom";
import { USER_MAIN_DATA } from "../../data/userMainData.json";
import { UserMainData } from "../../data/types";

const ProfilePage: React.FC = () => {
  return (
    <div className="profil_page">
      <h1 className="text-5xl mb-10">Users</h1>
      <ul className="flex gap-10">
        {USER_MAIN_DATA.map((user: UserMainData) => (
          <Link to={`/user/${user.id}`}>
            <li
              key={user.id}
              className="p-10 bg-blue-grey rounded-3xl text-white hover:bg-secondary"
            >
              {user.userInfos.firstName} {user.userInfos.lastName} - Score:{" "}
              {user.todayScore ?? user.score ?? "N/A"}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
