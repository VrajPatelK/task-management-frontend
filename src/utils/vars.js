import Pending from "../components/icons/Pending";
import Completed from "../components/icons/Completed";
import InProgress from "../components/icons/InProgress";

var forPeding = { name: "pending", color: "#3742fa", icon: <Pending /> };
var forInProgress = {
  name: "in-progress",
  color: "#ffa502",
  icon: <InProgress />,
};
var forCompleted = {
  name: "completed",
  color: "#2ed573",
  icon: <Completed />,
};
var active_background = "#f5f6fa";

export { forCompleted, forInProgress, forPeding, active_background };
