import "./SidePanel.css";
import { SidebarData } from "../SidebarData/SidebarData";
function SidePanel() {
  console.log("title");
  return (
    <div className="SidePanel">
      <ul className="sidebarlists">
        {SidebarData
          ? SidebarData.map((item) => {
              return (
                <li
                  className="row"
                  key={item.id}
                  onClick={() => (window.location.pathname = item.link)}
                >
                  <h3>{item.title}</h3>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
export default SidePanel;
