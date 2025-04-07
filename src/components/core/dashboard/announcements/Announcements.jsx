import React, { use, useEffect, useState } from 'react'
import LayoutOuter from '../../../common/LayoutOuter'
import LayoutHead from '../../../common/LayoutHead'
import { Link } from 'react-router-dom'
import { fetchAllAnnouncements } from '../../../../services/operations/announcementAPI'
import { Spinner } from '../../../common/Spinner'
import AnnouncementsTable from './AnnouncementsTable'
import { ROLE } from '../../../../utils/constants'

function Announcements() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(data)

    async function fetchAnnouncements() {
        setLoading(true);
        const response = await fetchAllAnnouncements();
        setData(response)
        setLoading(false);
    }

    useEffect(() => {
        fetchAnnouncements();
    }, [])

    return (
        <LayoutOuter>
            <LayoutHead>
                <div className='flex w-full justify-between items-center'>
                    <h1 className='text-3xl font-bold text-blue-900'>Announcements</h1>
                    <div className='flex gap-3'>
                        <Link to={"/dashboard/announcements/newAnnouncement"}>
                            <button className='bg-blue-900 text-white rounded-xl px-3 py-1 hover:bg-blue-950 cursor-pointer'>Make Announcement</button>
                        </Link>
                    </div>
                </div>
            </LayoutHead>
            <div className='px-6 flex flex-col items-start justify-center gap-4 py-4'>
                {
                    loading || !data
                        ? <Spinner />
                        : <AnnouncementsTable announcements={data} />
                }
            </div>
        </LayoutOuter>
    )
}

export default Announcements
