

import React from 'react'

export default function Divider({label}) {

  return (

    <div className="w-full flex items-center my-2">

        <div className="flex-1 border-t border-zinc-500 dark:border-zinc-200"/>

        <div className="mx-4 text-base font-bold">{label}</div>

        <div className="flex-1 border-t border-zinc-500 dark:border-zinc-200"/>

    </div>

  )

}
