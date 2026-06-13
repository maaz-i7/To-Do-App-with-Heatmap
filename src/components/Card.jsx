import React, { useEffect, useRef, useState } from "react";

const Card = (props) => {

    // const getDateData = (date) => {
    //     let data = localStorage.getItem(date)
    //     if (data)
    //         return JSON.parse(data)

    //     data = {
    //         "pending": [],
    //         "completed": []
    //     }
    //     localStorage.setItem(date, JSON.stringify(data))
    //     return data
    // }

    const [addTaskVal, setAddTaskVal] = useState("")
    const [btnBgColor, setBtnBgColor] = useState("bg-blue-950")
    // const [dateData, setDateData] = useState(() => getDateData(props.date))

    useEffect(() => {
        const updatedData = props.getDateData(props.date)
        props.setDateData(updatedData)
    }, [props.date])

    useEffect(() => {
        localStorage.setItem(props.date, JSON.stringify(props.dateData))
    }, [props.dateData])

    const moveTask = (index, from, to) => {
        const value = props.dateData[from][index]
        let fromList = props.dateData[from].filter((_, i) => i !== index)
        let toList = [...props.dateData[to], value]
        props.setDateData({ ...props.dateData, [from]: fromList, [to]: toList })
    }

    const addTask = (task, type) => { 
        let tasksList = [...props.dateData[type], task] 
        props.setDateData({ ...props.dateData, [type]: tasksList }) 
    }

    const removeTaskAt = (index, type) => {
        let tasksList = props.dateData[type]
        tasksList = tasksList.filter((_, i) => i !== index)
        props.setDateData({ ...props.dateData, [type]: tasksList })
    }

    const inpRef = useRef()
    const btnRef = useRef()

    const Task = ({ taskName, id, icon }) => {
        return (<div className="tasks">
            <div className="cursor-pointer task flex items-center w-1/1 m-2 hover:bg-gray-800 p-2 rounded-[10px] max-[500px]:m-1 max-[500px]:p-1"
                onClick={() => {
                    const index = Number(id.slice(1));
                    if (id[0] == 'p')
                        moveTask(index, "pending", "completed")
                    else
                        moveTask(index, "completed", "pending")
                }}
            >
                <div className={`circle border-2 text-white text-[10px] ${icon ? "bg-gray-800" : ""} font-extrabold flex items-center justify-center group-hover:bg-amber-200 border-gray-500 rounded-[20px] w-5 h-5`}>{icon}</div>
                <div className="taskName ml-5">{taskName}</div>
                <div className="group w-7 p-1 flex items-center justify-center rounded cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-gray-800 ml-auto"
                    onClick={(e) => {
                        e.stopPropagation()
                        const index = Number(id.slice(1));
                        if (id[0] == 'p') {
                            removeTaskAt(index, "pending")
                        }
                        else {
                            removeTaskAt(index, "completed")
                        }
                    }}
                >
                    <svg
                        className="w-5 translate-y-0.5 fill-gray-500 group-hover:fill-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                    >
                        <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z" />
                    </svg>
                </div>
            </div>
        </div>)
    }

    return (
        <div className="Card w-200 m-10 h-200 p-15 rounded-[50px] border border-gray-700 max-[1000px]:w-9/10 max-[500px]:p-6">
            <div className="date font-bold text-[30px] max-[500px]:mt-4 max-[500px]:text-center">{props.date}</div>
            <div className="addTask mt-8 rounded-[25px] border border-gray-700 p-2 flex">
                <input ref={inpRef} className="w-full p-3 outline-none max-[500px]:p-1" value={addTaskVal} type="text" placeholder="Add Task"
                    onChange={(e) => {
                        setAddTaskVal(e.target.value)
                        setBtnBgColor(e.target.value ? "bg-blue-500" : "bg-blue-950")
                    }}
                    onKeyDown={(e) => { 
                        if (e.key == "Enter") {
                            addTask(inpRef.current.value, "pending") 
                            setAddTaskVal("")
                            setBtnBgColor("bg-blue-950")
                        }
                    }}
                />
                <button disabled={!inpRef.current?.value} ref={btnRef} className={`${btnBgColor=="bg-blue-500" ? "cursor-pointer" : ""} ml-5 transition-all ${btnBgColor} p-2 w-20 rounded-2xl`}
                    onClick={() => { 
                        addTask(inpRef.current.value, "pending") 
                        setAddTaskVal("")
                        setBtnBgColor("bg-blue-950")
                    }}
                >Add</button>
            </div>
            <div className="status flex flex-col">
                <div className={`pending w-1/1 mt-5 ${props.dateData.pending.length ? "" : "hidden"}`}>
                    <div className="head flex text-red-300">
                        {props.dateData.pending.length>0 && <div className="name">PENDING</div>}
                        {props.dateData.pending.length>0 && <div className="count ml-1">({props.dateData.pending.length})</div>}
                    </div>
                    <div className="h-50 overflow-y-auto overflow-x-hidden pl-6 pr-6 mt-4">
                        {
                            props.dateData.pending.map((task, i) => {
                                return (<Task key={i} icon={""} id={'p' + i} taskName={task} />)
                            })
                        }
                    </div>
                </div>
                {
                    !props.dateData.pending.length && !props.dateData.completed.length ? <div className="self-center text-gray-400 mb-20 mt-20">Yayy! No Tasks for today!</div> : ""
                }
                <div className="completed w-1/1 mt-5">
                    <div className="head flex text-green-300">
                        {props.dateData.completed.length>0 && <div className="name">COMPLETED</div>}
                        {props.dateData.completed.length>0 && <div className="count ml-1">({props.dateData.completed.length})</div>}
                    </div>
                    <div className="h-50 overflow-y-auto overflow-x-hidden pl-6 pr-6 mt-4">
                        {
                            props.dateData.completed.map((task, i) => {
                                return <Task key={i} icon={"✓"} id={'c' + i} taskName={task} />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card