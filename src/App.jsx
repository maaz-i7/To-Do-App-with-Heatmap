import { useState } from 'react'
import '../src/output.css'
import Heatmap from './components/Heatmap'
import Stats from './components/Stats'
import Card from './components/Card'
import Navbar from './components/Navbar'

function App() {

  const today = (new Date()).toDateString();
  const [date, setDate] = useState(today)
  const [year, setYear] = useState((new Date()).getFullYear() )

  return (
    <>
      <Navbar />
      <Stats />
      <Card date={date} />
      <Heatmap date={date} setDate={setDate} />
    </>
  )
}

export default App