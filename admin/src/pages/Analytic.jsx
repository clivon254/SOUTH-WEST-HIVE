

import React, { useContext, useEffect, useState } from 'react'
import Graph from '../components/Graph'
import { StoreContext } from '../context/store'

export default function Analytic() {  

  

  const {stats,days,setDays,fetchStats} = useContext(StoreContext)

  console.log(stats)

  // handleChange
  const handleChange = (e) => {

    setDays(e.target.value)
  }

  useEffect(() => {

    fetchStats()

  },[days])

  return (

    <section className="section space-y-10">

      <div className="flex items-center justify-between">

       <h1 className="title2">Analytics</h1>

        <select 
            onChange={handleChange}
            value={days} 
            className="input"
          >

          <option value="28">28 Days</option>

          <option value="7">7 Days</option>

          <option value="90">90 Days</option>

          <option value="365">365 Days</option>

        </select>

      </div>

      {/* graphs */}
      <div className=" ">

        {/*users  */}
        <div className="space-y-5">

          <h2 className="text-xl font-semibold">Users stats from {days} days</h2>

          <Graph dt={stats?.usersStatsAdmin}/>

        </div>

        {/* articles veiws users  */}
        <div className="space-y-5">

          <h2 className="text-xl font-semibold">Articles veiws stats from {days} days</h2>

          <Graph dt={stats?.veiwStatsAdmin}/>

        </div>

      </div>

    </section>

  )
  
}
