import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Following from "../pages/Following"
import { HeaderOnly } from "../layouts";
import config from "../config";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profileUser, component: Profile, layout: HeaderOnly },
];


const privateRoutes = [];

export { publicRoutes, privateRoutes };
