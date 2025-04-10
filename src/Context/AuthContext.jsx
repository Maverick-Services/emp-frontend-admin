import { createContext, useEffect, useState } from "react";
import { teamsData, users } from "../data/dummy";

export const AuthContext = createContext();

function AuthContextProvider({children}){

    const [admin, setAdmin] = useState(
        localStorage?.getItem("user") ? JSON.parse(localStorage?.getItem("user")) : null
    )
    const [employees, setEmployees] = useState(users);
    const [teams, setTeams] = useState(teamsData);
    const [team, setTeam] = useState(null);
    const [editTeam, setEditTeam] = useState(false);
    const [user, setUser] = useState(null);
    const [editUser, setEditUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(
        localStorage?.getItem("token") ? localStorage?.getItem("token") : null
    )

    useEffect(()=>{
        token && localStorage.setItem("token",token);
        // setToken(localStorage.getItem("token"));
    },[token]);
    
    useEffect(()=>{
        admin && localStorage.setItem("user",JSON.stringify(admin));
        // setTeam(JSON.parse(localStorage.getItem("team")));
    },[admin]);

    let values = {
        admin, setAdmin,
        employees, setEmployees,
        teams, setTeams,
        team, setTeam,
        editTeam, setEditTeam,
        user, setUser,
        editUser, setEditUser,
        loading, setLoading,
        token, setToken
    }

    return <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;