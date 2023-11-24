import meditationIcon from "../../assets/meditation.svg";
import swimIcon from "../../assets/swim.svg";
import bikeIcon from "../../assets/bike.svg";
import exerciseIcon from "../../assets/exercise.svg";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul className="">
          <li>
            <a href="#">
              <img className="logo" src={meditationIcon} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img className="logo" src={swimIcon} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img className="logo" src={bikeIcon} alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              {" "}
              <img className="logo" src={exerciseIcon} alt="" />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
