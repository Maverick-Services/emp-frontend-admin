import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchAllEmployees } from "../../../services/operations/userAPI";
import { Spinner } from "../../common/Spinner";
import LayoutProvider from "../../common/LayoutProvider";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Employees = () => {
  const { token, loading, setLoading } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    setLoading(true);
    const result = await fetchAllEmployees(token);
    if (result) {
      setEmployees(result);
      console.log(result)
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading || !employees) return <Spinner />;

  return (
    <LayoutProvider heading={"All Employees"}>
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full"
      >
        {employees && employees.length === 0 ? (
          <motion.p
            variants={cardVariants}
            className="text-gray-600 text-lg text-center col-span-full"
          >
            No Employees added yet
          </motion.p>
        ) : (
          employees?.map((em) => (
            <motion.div
              key={em?._id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full max-w-[350px] flex-1 flex justify-center"
            >
              <Link to={`/dashboard/users/${em?._id}`} className="w-full">
                <div className="bg-white rounded-lg shadow-md">
                  <img src="/m1.jpg" alt="img" className="rounded-t-lg" />
                  <div className="py-3 px-3 text-center">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">{em?.name}</h2>
                    <p className="text-gray-500 capitalize">{em?.role}</p>
                  </div>
                  {/* <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-2 transition-all hover:shadow-xl min-h-[230px] h-auto">
                    <h3 className="text-lg font-semibold text-gray-800 break-words whitespace-normal">
                      Name: {em?.name}
                    </h3>
                    <p className="text-gray-600 break-words whitespace-normal">
                      {em?.email}
                    </p>
                    <p className="text-gray-600">Mobile No: {em?.phoneNo}</p>
                    <p className="text-gray-600">Team: {em?.team?.teamName}</p>
                    <p className="text-gray-600">
                      Tasks Assigned:{" "}
                      <span className="font-semibold text-[#1C398E]">
                        {em?.tasks?.length}
                      </span>
                    </p>
                  </div> */}
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </LayoutProvider>
  );
};

export default Employees;
