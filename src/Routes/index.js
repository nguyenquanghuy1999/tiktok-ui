import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Following from "../pages/Following"
import Live from "../pages/Live";
import StretchLayout from '../layouts/StretchLayout/StretchLayout'
import config from "../config";
import Comment from "../pages/Comment";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profileUser, component: Profile, layout: StretchLayout },
    { path: config.routes.modalVideo, component: Comment, layout: null },
];


const privateRoutes = [];

export { publicRoutes, privateRoutes };
