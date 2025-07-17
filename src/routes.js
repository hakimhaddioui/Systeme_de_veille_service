
import Index from "views/Index.js";
import Evaluations from "views/examples/Evaluations.js";
import Gares from "views/examples/Gares.js";
import Reporting from "views/examples/Reporting.js";
import Tables from "views/examples/UserEvaluations.js";
import Users from "views/examples/Users.js";
import RolesPermissions from "views/examples/RolesPermissions.js";



var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/Users",
    name: "Users",
    icon: "ni ni-single-02 text-yellow",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/Gares",
    name: "Gares",
    icon: "fa fa-train text-green",
    component: <Gares />,
    layout: "/admin",
  },
  {
    path: "/evaluations",
    name: "Evaluation Criteria",
    icon: "fa fa-check-circle text-yellow",
    component: <Evaluations />,
    layout: "/admin",
  },
  {
    path: "/UserEvaluations",
    name: "Evaluations",
    icon: "fa fa-clipboard-check text-red",
    component: <Tables />,
    layout: "/admin",
  },
    {
    path: "/reporting",
    name: "Reporting",
    icon: "fa fa-chart-line text-info",
    component: <Reporting />,
    layout: "/admin",
  },
  {
    path: "/rolespermissions",
    name: "Roles & Permissions",
    icon: "fa fa-shield-alt text-warning",
    component: <RolesPermissions />,
    layout: "/admin",
  },



];
export default routes;
