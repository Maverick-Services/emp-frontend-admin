import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../../../utils/constants";
import { motion } from "framer-motion";
import { createTeam, editTeamDetails } from "../../../../services/operations/teamAPI";
import LayoutProvider from "../../../common/LayoutProvider";

export const AddTeam = ({ team, editTeam, employees, setShowTeamDetails, showTeamDetails }) => {
  const navigate = useNavigate();
  const { admin, token } = useContext(AuthContext);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editTeam) {
      setValue("teamName", team?.teamName);
      setValue("description", team?.description);
      setValue("teamLeader", team?.teamLeader?._id);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    console.log()
    return (
      team?.teamName !== currentValues?.teamName ||
      team?.description !== currentValues?.description ||
      team?.teamLeader?._id !== currentValues?.teamLeader
    );
  };

  const teamFormSubmitHandler = async (data) => {
    if (editTeam) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        let reqBody = {
          teamId: team?._id,
        };

        if (currentValues?.teamName !== team?.teamName) {
          reqBody = { ...reqBody, teamName: data?.teamName };
        }
        if (currentValues?.description !== team?.description) {
          reqBody = { ...reqBody, description: data?.description };
        }
        if (currentValues?.teamLeader !== team?.teamLeader?._id) {
          reqBody = { ...reqBody, teamLeader: data?.teamLeader };
        }

        // console.log("edit", reqBody);
        // const result = true;
        const result = await editTeamDetails(reqBody, token);
        if (result) {
          navigate("/dashboard/teams");
          return;
        }
      } else {
        alert("No Changes Made So far");
        return;
      }
    }

    data = {
      ...data,
      adminEmail: admin?.email,
    };
    // console.log(data);

    const response = await createTeam(data, token);
    if (response) {
      // console.log("Team created Successfully", response);
      navigate("/dashboard/teams");
    }
  };

  return (
    <LayoutProvider heading={editTeam ? "Edit Team" : "Add Team"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-8 mx-auto bg-white shadow-lg rounded-lg flex flex-col gap-6"
      >
        {/* Heading */}
        <div className="w-full flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1C398E]">{editTeam ? "Edit" : "Add"} Team</h1>
          <button
            onClick={() => setShowTeamDetails(!showTeamDetails)}
            className="bg-[#1C398E] text-white px-4 py-2 rounded-md hover:bg-[#142A6E] transition"
          >
            Cancel
          </button>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(teamFormSubmitHandler)}
        >
          {/* Team Name */}
          <div className="flex items-center gap-4">
            <label className="w-40 font-medium text-gray-700">Team Name</label>
            <input
              type="text"
              {...register("teamName", { required: true })}
              className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
            />
          </div>

          {/* Team Description */}
          <div className="flex items-center gap-4">
            <label className="w-40 font-medium text-gray-700">Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="flex-1 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
            />
          </div>

          {/* Team Leader */}
          {
            editTeam &&
            <div className="flex items-center gap-4">
              <label className="w-40 font-medium text-gray-700">Team Leader</label>
              <select
                // onChange={stepInputChangeHandler}
                {...register("teamLeader")}
                defaultValue={team?.teamLeader?._id ? team?.teamLeader?._id : ""}
                name="teamLeader"
                id="teamLeader"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#1C398E]"
              >
                <option value={""}>
                  Select Team Leader
                </option>
                {
                  employees &&
                  employees.map(em => {
                    return <option key={em?._id} value={em?._id}>
                      {em?.name}
                    </option>
                  })
                }
              </select>
            </div>
          }

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#1C398E] text-white py-3 rounded-md font-semibold hover:bg-[#142A6E] transition"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </LayoutProvider>
  );
};
