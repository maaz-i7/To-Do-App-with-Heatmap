import { useState } from 'react'
import '../src/output.css'
import Heatmap from './components/Heatmap'
import Card from './components/Card'
import Navbar from './components/Navbar'

function App() {

  const getDateData = (date) => {
    let data = localStorage.getItem(date)
    if (data)
      return JSON.parse(data)

    data = {
      "pending": [],
      "completed": []
    }
    localStorage.setItem(date, JSON.stringify(data))
    return data
  }

  const today = (new Date()).toDateString();
  const [date, setDate] = useState(today)
  const [year, setYear] = useState((new Date()).getFullYear())
  const [dateData, setDateData] = useState(() => getDateData(date))

  return (
    <>
      <Navbar />
      <Card date={date} dateData={dateData} setDateData={setDateData} getDateData={getDateData} />
      <Heatmap date={date} setDate={setDate} dateData={dateData} />
    </>
  )
}

export default App