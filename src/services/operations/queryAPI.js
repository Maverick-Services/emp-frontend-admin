import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector"
import { queryEndPoints } from "../apis";

const {
    ADD_REPLY_API,
    FETCH_ALL_QUERIES_API,
    FETCH_COMPLETE_QUERY_DETAILS_API,
    UPDATE_QUERY_STATUS_API
} = queryEndPoints;

export const fetchAllQueries = async (token) => {

    try {
        const response = await apiConnector(
            "GET",
            FETCH_ALL_QUERIES_API,
            null,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        // console.log("FETCH ALL QUERIES RESPONSE:- ", response)
        // toast.success(response?.data?.message)
        return response?.data?.data;

    } catch (error) {
        console.log("FETCH ALL QUERIES ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const fetchCompleteDetailsOfQuery = async (data, token) => {
    try {
        const response = await apiConnector(
            "POST",
            FETCH_COMPLETE_QUERY_DETAILS_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        console.log("FETCH COMPLETE QUERY DETAILS RESPONSE:- ", response)
        return response?.data?.data;

    } catch (error) {
        console.log("FETCH COMPLETE QUERY DETAILS ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const addQueryReply = async (data, token) => {

    try {
        const response = await apiConnector(
            "POST",
            ADD_REPLY_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )

        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        // toast.success(response?.data?.message)
        return response?.data?.data;

    } catch (error) {
        console.log("ADD QUERY REPLY ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;
    }
}

export const closeQuery = async (data, token) => {
    try {
        const response = await apiConnector(
            'POST',
            UPDATE_QUERY_STATUS_API,
            data,
            {
                "Authorization": `Bearer ${token}`
            }
        )
        if (!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        return response?.data?.data;
    } catch (error) {
        console.log("CLOSE QUERY ERROR:- ", error)
        toast.error(error?.response?.data?.message || error?.message)
        return null;

    }
}