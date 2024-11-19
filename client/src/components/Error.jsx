

import React from 'react'

export default function Error({retry}) {
    
  return (

    <div className="mx-auto max-w-xs space-y-3 mt-10">

          <h1 className="text-center font-title font-bold text-textSecondaryLight dark:text-textSecondaryDark">Connection Failed!</h1>

          <p className="text-center font-semibold">Check your connection to the internet and try again.</p>

          <div className=" text-center">

            <span 
              onClick={() => retry()} 
              className="border border-textSecondaryLight dark:border-textSecondaryDark px-5 py-1 rounded-full font-semibold cursor-pointer"
            >
                Retry
            </span>

          </div>

        </div>

  )
}
