import React, { useEffect, useState } from "react";

const Heatmap = (props) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const getDatesOfYear = (year) => {

        let dates = []
        let date = new Date(`1/1/${year}`)
        while (date.getFullYear() == year) {
            dates.push(date.toDateString())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }

    let allDates = getDatesOfYear(2026)

    return (
        <div className="w-fit border border-gray-700 rounded-4xl mt-5 mb-5 h-fit flex flex-col p-10">
            <div className="head flex justify-around w-1/1">
                {
                    monthNames.map((month) => {
                        return <div key={month.toLowerCase()} >{month}</div>
                    })
                }
            </div>
            <div className="body mt-2">
                <span className="dayBoxes w-fit grid grid-rows-7 grid-flow-col gap-0.5">
                    {
                        allDates.map((date) => {
                            return <div
                                title={new Date(date).toDateString()} 
                                key={(new Date(date)).getTime()} 
                                date-value={date} 
                                className={`bg-gray-800 rounded w-5 h-5 cursor-pointer ${date===props.date ? "border-2 border-white" : ""}`}
                                onClick={() => {
                                    props.setDate(date)
                                }}>
                            </div>
                        })
                    }
                </span>
                <div className="heatScale flex items-center ml-auto w-fit mt-5">
                    <div className="text-[10px]">Less</div>
                    <div className="boxes flex">
                        <div className="box1 m-0.5 rounded bg-gray-800 w-5 h-5"></div>
                        <div className="box1 m-0.5 rounded bg-blue-900 w-5 h-5"></div>
                        <div className="box1 m-0.5 rounded bg-blue-800 w-5 h-5"></div>
                        <div className="box1 m-0.5 rounded bg-blue-700 w-5 h-5"></div>
                        <div className="box1 m-0.5 rounded bg-blue-600 w-5 h-5"></div>
                        <div className="box1 m-0.5 rounded bg-blue-500 w-5 h-5"></div>
                        <div className="box1 m-0.5 rounded bg-blue-400 w-5 h-5"></div>
                    </div>
                    <div className="text-[10px]">More</div>
                </div>
            </div>
        </div>
    )
}

export default Heatmap