import Pending from "../components/icons/Pending";
import Completed from "../components/icons/Completed";
import InProgress from "../components/icons/InProgress";
import { QueryClient } from "@tanstack/react-query";

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
const defaultImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/task-management-fbb64.appspot.com/o/profile_images%2Fdefault-profile-img.png?alt=media&token=dbab22ee-13fe-4b80-b7a5-7209944a775a";

const queryClient = new QueryClient();

export { forCompleted, forInProgress, forPeding, queryClient, defaultImageUrl };
