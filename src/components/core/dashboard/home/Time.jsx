import { Bars } from 'react-loader-spinner';
import { FaClock } from "react-icons/fa6";
import useTime from '../../../../Hooks/useTime';
import { FaRegClock } from 'react-icons/fa';
import ClockLoader from "react-spinners/ClockLoader";


export default function Time() {
    const date = new Date;
    const { finalDate, realTime, timeLoading } = useTime({ date });

    return (
        <div
            className="flex-col h-full w-full text-center justify-center">
            {!timeLoading ?

                <div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg flex bg-white h-full w-full gap-5 justify-start items-center">
                    <div className='text-6xl bg-blue-50 rounded-full'>
                        <FaRegClock className='text-blue-700 p-4' />
                    </div>
                    <div className="flex flex-col justify-center text-left">
                        <h1 className="text-3xl font-extrabold text-blue-900">{realTime}</h1>
                        <h1 className="text-[16px] font-bold text-gray-900">{finalDate}</h1>
                    </div>
                </div>

                : <div className="spinner-container text-center w-full flex justify-center ">
                    {/* <Bars
                        height="60"
                        width="60"
                        color="black"
                        ariaLabel="custom-puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /> */}
                    <ClockLoader
                        color={"blue"}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }
        </div>
    );
}
