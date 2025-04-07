import js from "@eslint/js";
import { apiConnector } from "../apiconnector";
import { announcementEndpoints } from "../apis";
import toast from "react-hot-toast";

const {
    CREATE_ANNOUNCEMENT_API,
    FETCH_ALL_ANNOUNCEMENTS_API
} = announcementEndpoints;

export const createAnnouncement = async (data, token) => {

    try {
        const response = await apiConnector(
            "POST",
            CREATE_ANNOUNCEMENT_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        console.log('create annnouncement response:', response)
        return response?.data?.data;

    } catch (error) {
        console.log("CREATE ANNOUNCEMENT ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}


export const fetchAllAnnouncements = async () => {
    try {
        const response = await apiConnector(
            "GET",
            FETCH_ALL_ANNOUNCEMENTS_API
        )

        console.log(response)

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }
        console.log('create annnouncement response:', response)
        return response?.data?.data;

    } catch (error) {
        console.log("GET ALL ANNOUNCEMENT ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}
