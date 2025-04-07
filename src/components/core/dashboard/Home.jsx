import React from 'react'
import LayoutProvider from '../../common/LayoutProvider'
import { FaRegClock, FaUser } from 'react-icons/fa'
import RevenueChart from './home/RevenueChart'
import { FiGrid } from 'react-icons/fi'
import Time from './home/Time'
import { MdOutlinePendingActions } from "react-icons/md";
import { MdBookmarkAdded } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import CustomPieChart from './home/PieChart'
import { FaCircle } from "react-icons/fa";


function Home() {
    return (
        <LayoutProvider heading={'Main Dashboard'}>
            <div className='flex flex-col gap-6 pb-4'>

                <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-6'>

                    <div className='bg-white rounded-2xl flex p-6 gap-3 items-center justify-center'>
                        <div className='text-6xl bg-blue-50 rounded-full'>
                            <FaUser className='text-blue-700 p-4' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-[#A9B4D3] text-sm font-semibold'>Employees</p>
                            <h2 className='text-2xl font-bold'>12</h2>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl flex p-6 gap-3 items-center justify-center'>
                        <div className='text-6xl bg-blue-50 rounded-full'>
                            <FiGrid className='text-blue-700 p-4' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-[#A9B4D3] text-sm font-semibold'>Teams</p>
                            <h2 className='text-2xl font-bold'>12</h2>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl flex p-6 gap-3 items-center justify-center'>
                        <Time />
                    </div>

                    <div className='bg-white rounded-2xl flex p-6 gap-3 items-center justify-center'>
                        <div className='text-6xl bg-blue-50 rounded-full'>
                            <AiOutlineFundProjectionScreen className='text-blue-700 p-4' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-[#A9B4D3] text-sm font-semibold'>Ongoing Projects</p>
                            <h2 className='text-2xl font-bold'>05</h2>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl flex p-6 gap-3 items-center justify-center'>
                        <div className='text-6xl bg-blue-50 rounded-full'>
                            <MdBookmarkAdded className='text-blue-700 p-4' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-[#A9B4D3] text-sm font-semibold'>Tasks Completed</p>
                            <h2 className='text-2xl font-bold'>27</h2>
                        </div>
                    </div>

                    <div className='bg-white rounded-2xl flex p-6 gap-3 items-center justify-center'>
                        <div className='text-6xl bg-blue-50 rounded-full'>
                            <MdOutlinePendingActions className='text-blue-700 p-4' />
                        </div>
                        <div className='flex-1'>
                            <p className='text-[#A9B4D3] text-sm font-semibold'>Pending Tasks</p>
                            <h2 className='text-2xl font-bold'>09</h2>
                        </div>
                    </div>


                </div>

                <div className='flex gap-6'>
                    <div className='bg-white rounded-2xl p-5 flex-1'>
                        <div className='text-2xl font-bold text-blue-900'>Revenue Chart</div>
                        <RevenueChart />
                    </div>

                    <div className='bg-white rounded-2xl p-5 w-[30%]'>
                        <div className='text-2xl font-bold text-blue-900'>Tasks</div>
                        <CustomPieChart />
                        <div className='flex w-full justify-evenly items-center'>
                            <div className='flex gap-2 items-center justify-center'>
                                <FaCircle className='text-[#4318FF]' />
                                <p className='font-semibold'>Completed</p>
                            </div>
                            <div className='flex gap-2 items-center justify-center'>
                                <FaCircle className='text-[#6AD2FF]' />
                                <p className='font-semibold'>Pending</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutProvider>
    )
}

export default Home
