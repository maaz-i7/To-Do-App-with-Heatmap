import React, { useEffect, useState } from "react";

const Heatmap = (props) => {

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const heatColors = ["bg-blue-900","bg-blue-800","bg-blue-700","bg-blue-600","bg-blue-500","bg-blue-400"];
    const [updateHeatColor, setUpdateHeatColor] = useState(false)
    
    const getDatesOfYear = (year) => {

        let dates = []
        let date = new Date(`1/1/${year}`)
        while (date.getFullYear() == year) {
            dates.push(date.toDateString())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }

    const getHeatColor = (date) => {

        const dateData = JSON.parse(localStorage.getItem(date))
        if(!dateData || dateData==={})
            return "bg-gray-800"

        let pendCount = dateData.pending.length
        let compCount = dateData.completed.length

        if(!pendCount && !compCount)
            return "bg-gray-800"

        if(!pendCount)
            return "bg-blue-400"

        if(!compCount)
            return "bg-gray-800"

        const score = Math.min(Math.round((compCount/(pendCount+compCount))*5), 5)
        return heatColors[score]
    }

    const [todayHeatColor, setTodayHeatColor] = useState(() => getHeatColor(props.date))

    useEffect(() => {
        setUpdateHeatColor(updateHeatColor ? false : true)
    }, [props.dateData, props.date])
    

    let allDates = getDatesOfYear(2026)

    return (
        <>
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
                                    className={`${getHeatColor(date)} rounded w-5 h-5 cursor-pointer ${date === props.date ? "border-2 border-white" : ""}`}
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
                            {
                                heatColors.map((color, i) => <div key={i} className={`box1 m-0.5 rounded ${heatColors[i]} w-5 h-5`}></div> )
                            }
                        </div>
                        <div className="text-[10px]">More</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Heatmap