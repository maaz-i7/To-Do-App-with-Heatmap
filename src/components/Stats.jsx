import React from "react";

const Stats = () => {
    return (
        <div className="Stats w-200 flex p-4 justify-around text-gray-500">
            <div className="year border border-gray-700 rounded-[30px] w-fit text-center p-8 flex flex-col items-center justify-center">
                <div className="text-[10px]">TASKS COMPLETED</div>
                <div className="text-[40px] font-bold text-white">20%</div>
                <div className="text-[10px] font-bold">THIS YEAR</div>
            </div>
            <div className="month border border-gray-700 rounded-[30px] w-fit text-center p-8 flex flex-col items-center justify-center">
                <div className="text-[10px]">TASKS COMPLETED</div>
                <div className="text-[40px] font-bold text-white">20%</div>
                <div className="text-[10px] font-bold">THIS MONTH</div>
            </div>
            <div className="today border border-gray-700 rounded-[30px] w-fit text-center p-8 flex flex-col items-center justify-center">
                <div className="text-[10px]">TASKS COMPLETED</div>
                <div className="text-[40px] font-bold text-white">20%</div>
                <div className="text-[10px] font-bold">TODAY</div>
            </div>
            <div className="streak border border-gray-700 rounded-[30px] w-fit text-center p-8 flex flex-col items-center justify-center">
                <div className="text-[10px]">STREAK 🔥</div>
                <div className="text-[40px] font-bold text-white">2</div>
                <div className="text-[10px] font-bold">DAYS</div>
            </div>
        </div>
    )
}

export default Stats