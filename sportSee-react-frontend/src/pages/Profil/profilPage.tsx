import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USER_MAIN_DATA } from "../../data/userMainData.json"; // Mocked data
import { UserMainData } from "../../data/types";
import { useDataSource } from "../../contexts/DataSourceContext"; // Custom hook
import { fetchAllUsersIndividually } from "../../services/ApiCall";

const ProfilePage: React.FC = () => {
  const { dataSource, fetchUserData } = useDataSource();
  const [users, setUsers] = useState<UserMainData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // We show the list of users based on which data source we selected in Control Page
  useEffect(() => {
    const loadUsers = async () => {
      setError(null);
      try {
        if (dataSource === "mocked") {
          setUsers(USER_MAIN_DATA);
        } else {
          const apiUsers = await fetchAllUsersIndividually();
          setUsers(apiUsers);
        }
      } catch (e) {
        setError("Failed to fetch user data.");
      }
    };

    loadUsers();
  }, [dataSource]);

  return (
    <div className="profil_page">
      <h1 className="text-5xl mb-10">Users</h1>
      {error && (
        <div className="error-message text-[20px] text-[red]">{error}</div>
      )}
      <ul className="flex gap-10">
        {users.map((user) => (
          <Link
            to={`/user/${user.id}`}
            key={user.id}
            onClick={() => fetchUserData(user.id)}
          >
            <li className="p-10 bg-blue-grey rounded-3xl text-white hover:bg-secondary">
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
