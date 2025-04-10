import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../Context/AuthContext";
import LayoutProvider from "../../common/LayoutProvider";

export const Profile = () => {

  const { admin } = useContext(AuthContext);
  // console.log(admin)

  return (
    <LayoutProvider>
      <div className="w-full h-full flex lg:items-center justify-center">
        <motion.div
          className="w-fit sm:w-full flex flex-col gap-4 max-w-2xl bg-white shadow-lg rounded-2xl p-8 border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <motion.h1
            className="text-3xl font-bold sm:text-4xl sm:font-extrabold text-[#1C398E] pb-2 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            My Profile
          </motion.h1>

          {/* Profile Details */}
          <div className="space-y-4  flex flex-col gap-2">
            <ProfileItem label="Name" value={admin?.name} />
            <ProfileItem label="Email" value={admin?.email} />
            <ProfileItem label="Phone No" value={admin?.phoneNo} />
          </div>

          {/* Action Buttons */}
          {/* <motion.div
          className="flex justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FF9F1C] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-[#e38e1b] transition"
          >
            Logout
          </motion.button>
        </motion.div> */}
        </motion.div>
      </div>
    </LayoutProvider>
  );
};

// Profile Item Component
const ProfileItem = ({ label, value }) => {
  return (
    <motion.div
      className="flex max-sm:flex-col justify-between sm:items-center bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition border border-gray-300"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="text-lg font-semibold text-[#374151]">{label}:</h3>
      <p className="text-lg text-gray-900 font-medium">{value}</p>
    </motion.div>
  );
};

// export default Profile;
