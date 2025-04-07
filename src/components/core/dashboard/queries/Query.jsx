import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addQueryReply, closeQuery, fetchCompleteDetailsOfQuery } from '../../../../services/operations/queryAPI'
import { AuthContext } from '../../../../Context/AuthContext'
import { Spinner } from '../../../common/Spinner'
import { STATUS } from '../../../../utils/constants'
import { formattedDate, formattedFullDate } from '../../../../utils/dateFormatter'
import { BiSolidSend } from "react-icons/bi";


function Query() {
    const navigate = useNavigate();
    const { queryId } = useParams()
    const { admin, token } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [closeQueryLoading, setCloseQueryLoading] = useState(false)
    const [messageSendLoading, setMessageSendLoading] = useState(false)
    const [error, setError] = useState('')
    const [query, setQuery] = useState(null)
    const [message, setMessage] = useState('')

    const fetchQueryDetails = async () => {
        setLoading(true)
        const result = await fetchCompleteDetailsOfQuery({ queryId })

        if (result) {
            console.log(result)
            setQuery(result)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchQueryDetails();
    }, [])

    const addReply = async () => {
        setMessageSendLoading(true)
        const data = {
            queryId: queryId,
            adminId: admin?._id,
            role: admin?.role,
            message: message,
        }

        const result = await addQueryReply(data, token)

        if (result) {
            setQuery(result)
        }

        setMessage('');
        setMessageSendLoading(false);

    }

    const handleCloseQuery = async (queryId) => {
        setCloseQueryLoading(true)
        const data = {
            queryId: queryId,
            status: STATUS.RESOLVED
        }

        const result = await closeQuery(data, token)

        if (result) {
            setQuery(result)
        }

        setCloseQueryLoading(false)
    }

    if (loading || !query) {
        return <Spinner />
    }


    return (
        <div className='bg-[#F3F6FE] h-screen flex flex-col overflow-y-auto pb-4'>
            <div className='w-full pb-3 pt-5 px-5 bg-[#F3F6FE] flex justify-between items-center'>
                <h1 className='text-3xl font-bold text-blue-900 pb-2'>Query: {query?.subject}</h1>
                <div className='flex gap-3'>
                    <p
                        className={`flex items-center justify-center rounded-full px-3 ${query?.status === STATUS.PENDING ? "bg-red-200 text-red-700 " : "bg-green-200 text-green-700 "}`}
                    >{query?.status}</p>
                    {query?.status === STATUS.PENDING &&
                        <button
                            className='bg-blue-900 text-white rounded-xl px-3 py-1 hover:bg-blue-950 cursor-pointer'
                            onClick={() => handleCloseQuery(query?._id)}
                        >
                            {closeQueryLoading ? "Closing..." : "Close Query"}
                        </button>
                    }
                    <button className='bg-blue-900 text-white rounded-xl px-3 py-1 hover:bg-blue-950 cursor-pointer'
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                </div>
            </div>
            <div className='h-full flex flex-col gap-3 flex-1 overflow-y-auto px-4'>
                <div className=' bg-white px-4 py-4 rounded-xl flex flex-col gap-2 shadow-sm'>
                    <p><strong>Raised By:</strong> {query?.raisedBy?.name || query?.raisedBy?.teamName}</p>
                    <p><strong>Role:</strong>  {query?.role}</p>
                    <p><strong>Raised At:</strong> {formattedFullDate(query?.createdAt)}</p>
                    <p><strong>Description:</strong> {query?.description}</p>
                </div>
                <h2 className='text-blue-900 text-2xl font-bold pl-1'>Messages</h2>
                <div className='bg-white px-4 py-2 rounded-xl flex flex-col gap-2'>

                    {query?.replies.map((message) => (
                        message?.replyBy?.role === 'admin'
                            ? <div className='flex w-full justify-end' key={message?._id}>
                                <div className='max-w-2xl flex flex-col items-end'>
                                    <span className='font-semibold pr-2'>{message?.replyBy?.name}</span>
                                    <p className=' bg-green-300 rounded-xl p-3'>{message?.message}</p>
                                    <span className='text-gray-400 pr-2 font-semibold pt-0.5 text-sm'>{formattedFullDate(message?.replyBy?.createdAt)}</span>
                                </div>
                            </div>

                            : <div className='flex w-full' key={message?._id}>
                                <div className='max-w-2xl'>
                                    <h3 className='font-semibold'>{message?.replyBy?.name || message?.replyBy?.teamName}</h3>
                                    <p className=' bg-blue-300 rounded-xl p-3'>{message?.message}</p>
                                    <h4 className='text-gray-400 font-semibold pt-0.5 text-sm'>{formattedFullDate(message?.replyBy?.createdAt)}</h4>
                                </div>
                            </div>
                    ))}

                    {query?.status === STATUS.PENDING &&
                        <div className='sticky bottom-0 bg-white'>
                            <div className='w-full gap-2 flex justify-center pt-3 pb-3 sticky bottom-0'>
                                <input
                                    type="text"
                                    className='border flex-1 rounded-lg px-4 border-gray-500 outline-green-800' placeholder='Write a message...'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button
                                    className='bg-green-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-950 disabled:cursor-not-allowed'
                                    onClick={addReply}
                                    disabled={messageSendLoading || !message}
                                >
                                    {messageSendLoading ? "Sending..." : message ? <BiSolidSend size={25} /> : "Send"}
                                </button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Query
