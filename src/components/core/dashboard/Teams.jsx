import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { STATUS } from "../../../utils/constants";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllTeams } from "../../../services/operations/teamAPI";
import { Spinner } from "../../common/Spinner";
import LayoutProvider from "../../common/LayoutProvider";

const Teams = () => {
  const { token, loading, setLoading } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    setLoading(true);
    const result = await fetchAllTeams(token);
    if (result) {
      setTeams(result);
      console.log(result)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeams();
    // eslint-disable-next-line
  }, []);

  if (loading || !teams) return <Spinner />;

  return (
    <LayoutProvider heading={"Teams"}>
      <div className="w-full mx-auto flex flex-col justify-center gap-6">
        {/* Teams Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="w-full"
        >
          {teams && teams.length === 0 ? (
            <p className="text-center text-gray-500 text-lg col-span-full">
              No Teams created yet
            </p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-900 text-white uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">#</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Leader</th>
                  <th className="py-3 px-6 text-center">Tasks Assigned</th>
                  <th className="py-3 px-6 text-center">Tasks Completed</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {teams.map((ts, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6 font-medium">{ts?.teamName}</td>
                    <td className="py-3 px-6">{ts?.teamLeader?.name || "Not Assigned"}</td>
                    <td className="py-3 px-6 text-center">{ts?.tasks?.length || 0}</td>
                    <td className="py-3 px-6 text-center font-semibold text-green-500">
                      {ts?.tasks?.filter((t) => t?.status === STATUS.COMPLETED).length || 0}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <Link to={`/dashboard/teams/${ts?._id}`} className="w-full">
                        <button className="bg-blue-900 text-white text-xs px-4 py-2 rounded hover:bg-blue-800 transition cursor-pointer">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          )}
        </motion.div>
      </div>
    </LayoutProvider>
  );
};

export default Teams;

{/* <motion.div
  key={ts?._id}
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }}
  whileHover={{
    scale: 1.03,
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 },
  }}
  className="w-full h-auto flex flex-col"
>
  <Link to={`/dashboard/teams/${ts?._id}`} className="w-full">
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all min-h-[160px]">

      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {ts?.teamName}
      </h3>

      {ts?.teamLeader && (
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Team Leader:</span>{" "}
          {ts?.teamLeader?.name}
        </p>
      )}

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Team Members:</span>{" "}
        {ts?.members?.length || 0}
      </p>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium">Total Tasks:</span>{" "}
        {ts?.tasks?.length || 0}
      </p>

      <p className="text-sm text-gray-600 mt-auto">
        <span className="font-medium">Tasks Completed:</span>{" "}
        {ts?.tasks?.filter((t) => t?.status === STATUS.COMPLETED).length || 0}
      </p>
    </div>
  </Link>
</motion.div> */}