import React, { useMemo, useEffect, useRef, useState } from "react";

const Heatmap = (props) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const heatColors = ["bg-blue-900", "bg-blue-800", "bg-blue-700", "bg-blue-600", "bg-blue-500", "bg-blue-400"];
    
    const scrollContainerRef = useRef(null);
    
    // Forces a re-render if the parent mutates props.dateData instead of creating a new object
    const [, setUpdateTrigger] = useState(0);

    const allDates = useMemo(() => {
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 363; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            dates.push(d.toDateString());
        }
        return dates;
    }, []);

    const displayMonths = useMemo(() => {
        const months = [];
        allDates.forEach((dateString) => {
            const date = new Date(dateString);
            const monthName = monthNames[date.getMonth()];
            if (months.length === 0 || months[months.length - 1] !== monthName) {
                months.push(monthName);
            }
        });
        return months;
    }, [allDates]);

    const getHeatColor = (dateStr) => {
        try {
            const dateData = JSON.parse(localStorage.getItem(dateStr));
            
            if (!dateData || Object.keys(dateData).length === 0) return "bg-gray-800";

            let pendCount = dateData.pending?.length || 0;
            let compCount = dateData.completed?.length || 0;

            if (!pendCount && !compCount) return "bg-gray-800";
            if (!pendCount) return "bg-blue-400";
            if (!compCount) return "bg-gray-800";

            const score = Math.min(Math.round((compCount / (pendCount + compCount)) * 5), 5);
            return heatColors[score];
        } catch (e) {
            return "bg-gray-800";
        }
    };

    // Auto-scroll to the far right on initial load
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, []);

    // Listen for changes to the parent's data and force a visual refresh
    useEffect(() => {
        setUpdateTrigger(prev => prev + 1);
    }, [props.dateData, props.date]);

    return (
        <div ref={scrollContainerRef} className="max-[1300px]:w-9/10 max-[1300px]:overflow-x-scroll scroll-smooth hide-scrollbar">
            <div className="w-fit border border-gray-700 rounded-4xl mt-5 mb-50 h-fit flex flex-col p-10 bg-gray-900 text-white">
                
                <div className="head flex justify-between w-full mb-2 text-sm text-gray-400 px-1">
                    {displayMonths.map((month, i) => (
                        <div key={`${month}-${i}`}>{month}</div>
                    ))}
                </div>

                <div className="body">
                    <div className="dayBoxes w-fit grid grid-rows-7 grid-flow-col gap-1">
                        {allDates.map((date) => (
                            <div
                                title={new Date(date).toDateString()} // Explicitly format the date for the hover tooltip
                                key={date}
                                date-value={date}
                                className={`
                                    ${getHeatColor(date)} 
                                    rounded-sm w-4 h-4 cursor-pointer transition-colors duration-200 hover:ring-2 hover:ring-gray-400
                                    ${date === props.date ? "border-2 border-white ring-2 ring-white" : ""}
                                `}
                                onClick={() => props.setDate(date)}
                            />
                        ))}
                    </div>

                    <div className="heatScale flex items-center justify-end w-full mt-6 space-x-2 text-gray-400">
                        <span className="text-xs">Less</span>
                        <div className="boxes flex space-x-1">
                            <div className="rounded-sm bg-gray-800 w-4 h-4" title="0 Contributions"></div>
                            {heatColors.map((color, i) => (
                                <div key={i} className={`rounded-sm ${color} w-4 h-4`}></div>
                            ))}
                        </div>
                        <span className="text-xs">More</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Heatmap;