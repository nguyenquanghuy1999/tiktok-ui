import Home from "../Pages/Home";
import Following from "../Pages/Following";
import Profile from "../Pages/Profile";
import { HeaderOnly } from "../Components/Layouts";

const publicRoutes = [
    { path: "/", component: Home },
    { path: "/following", component: Following },
    { path: "/profile", component: Profile, layout: HeaderOnly },
];


const privateRoutes = [];

export { publicRoutes, privateRoutes };
