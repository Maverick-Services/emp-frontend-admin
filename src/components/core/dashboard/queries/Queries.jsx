import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LayoutOuter from '../../../common/LayoutOuter'
import LayoutHead from '../../../common/LayoutHead'
import LayoutContent from '../../../common/LayoutContent'
import { AuthContext } from '../../../../Context/AuthContext'
import { formattedFullDate } from '../../../../utils/dateFormatter'
import { ROLE, STATUS } from '../../../../utils/constants'
import { Spinner } from '../../../common/Spinner'
import { fetchAllQueries } from '../../../../services/operations/queryAPI'

function Queries() {
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState(ROLE.TEAM)
    const { token, user } = useContext(AuthContext)
    const [allQueries, setAllQueries] = useState([])
    const [filteredQueries, setFilteredQueries] = useState([]);

    const fetchQueries = async () => {
        setLoading(true);
        const result = await fetchAllQueries(token);
        setAllQueries(result);
        setLoading(false);
    };

    useEffect(() => {
        fetchQueries();
    }, [])

    useEffect(() => {
        if (role && allQueries.length > 0) {
            setFilteredQueries(allQueries.filter(qr => qr?.role === role));
        }
    }, [role, allQueries]);

    if (loading || !allQueries) {
        return <Spinner />
    }

    return (
        <LayoutOuter>
            <LayoutHead>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='text-3xl font-bold text-blue-900'>Queries</h1>
                    <div className='flex gap-3'>
                        <div className='flex gap-2 items-center justify-center bg-white px-3 py-1 rounded-lg shadow-sm'>
                            <label htmlFor="role" className='font-semibold text-blue-900'>Filter: </label>
                            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} className='outline-none'>
                                <option value={ROLE.EMPLOYEE} >Employee</option>
                                <option value={ROLE.TEAM} >Team</option>
                            </select>
                        </div>
                        <p className='px-3 py-1 font-semibold'><span className='bg-red-200 text-red-700 rounded-full px-2 py-1'>{filteredQueries?.filter(qr => qr?.status === STATUS.PENDING).length}</span> Pending</p>
                        <p className='px-3 py-1 font-semibold'><span className='bg-green-200 text-green-700 rounded-full px-2 py-1'>{filteredQueries?.filter(qr => qr?.status === STATUS.RESOLVED).length}</span> Resolved</p>

                    </div>
                </div>

            </LayoutHead>
            <LayoutContent>
                <div className='flex flex-col gap-4'>

                    {
                        filteredQueries &&
                            filteredQueries.length <= 0 ? <p>No Queries yet... </p>
                            : filteredQueries.map((qr, index) => (
                                <Link to={`/dashboard/queries/${qr?._id}`} key={index}>
                                    <div className='flex w-full justify-center items-center gap-3 bg-white px-3 py-3 hover:border-purple-800 border-2 border-white transition-all ease-in-out duration-300 rounded-xl'>
                                        <h2 className='font-semibold'>{qr?.raisedBy?.name || qr?.raisedBy?.teamName}</h2>
                                        <p className='flex-1'>{qr?.subject}</p>
                                        <p>{formattedFullDate(qr?.createdAt)}</p>
                                        <p
                                            className={`rounded-full px-3
                                            ${qr?.status === STATUS.PENDING ? "bg-red-200 text-red-700 " : "bg-green-200 text-green-700 "}`}
                                        >{qr?.status}</p>
                                    </div>
                                </Link>
                            ))
                    }

                </div>
            </LayoutContent>
        </LayoutOuter>
    )
}

export default Queries
