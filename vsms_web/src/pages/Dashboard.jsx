 
import { PubDashboard } from "./PubDashboard";
import NotFound from "./NotFound";
import { PromtDashboardPage } from "./PromtDashboard";

export const Dashboard = () => {
  return (
    localStorage.user_type == "PRO" ? <PromtDashboardPage /> : localStorage.user_type == "SUB" ? <PubDashboard /> : <NotFound />
  );
};
