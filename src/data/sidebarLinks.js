import { FiUserPlus, FiGrid, } from 'react-icons/fi';
import { IoHome } from 'react-icons/io5';
import { FaUser, FaUserFriends } from "react-icons/fa";
import { MdLibraryAddCheck } from "react-icons/md";
import { HiHandRaised } from "react-icons/hi2";
import { GrAnnounce } from "react-icons/gr";


export const sideBarLinks = [
    {
        name: "Home",
        path: "/dashboard/home",
        icon: IoHome
    },
    {
        name: "Employees",
        path: "/dashboard/users",
        icon: FaUserFriends
    },
    {
        name: "Teams",
        path: "/dashboard/teams",
        icon: FiGrid
    },
    {
        name: "Create User",
        path: "/dashboard/addUser",
        icon: FiUserPlus
    },
    {
        name: "Create Team",
        path: "/dashboard/addTeam",
        icon: MdLibraryAddCheck
    },
    {
        name: "Queries",
        path: "/dashboard/queries",
        icon: HiHandRaised
    },
    {
        name: "Announcements",
        path: "/dashboard/announcements",
        icon: GrAnnounce
    },
    {
        name: "Profile",
        path: "/dashboard/profile",
        icon: FaUser
    },
];