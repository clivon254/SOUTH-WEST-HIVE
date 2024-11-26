

import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { MdChevronRight } from 'react-icons/md'

export default function FAQ() {

  const [openItems ,setOpenItems] = useState([])

  const items = [
    { 
      title: 'How do some one become a writer',
      content: 'Send as an email through our contact us page and we will get back to you with in 24hrs for further instructions'
     },
    { 
      title: 'Does somene get paid to when he/she is a writer', 
      content: 'No.You are not paid to become when you are a writer,but their some previlages like attending our events for free'
     },
    { title: 'Question 3', content: 'Answer to question 3.' },
    { title: 'Question 4', content: 'Answer to question 4.' },
    { title: 'Question 5', content: 'Answer to question 5.' },
  ]

  // toggle Item
  const toggleItem = (index) => {

    setOpenItems((prevOpenItems) => {

      if(prevOpenItems.includes(index))
      {
        return prevOpenItems.filter(item => item !== index)
      }
      else
      {
        return [...prevOpenItems ,index]
      }

    })
  }

  return (
    
    <section className="section space-y-10">

      <h2 className="title text-center">FAQs</h2>

      <div className="w-full space-y-3 max-w-5xl mx-auto">

        {items.map((item, index) => (

          <div className="py-4 w-full border-b border-zinc-500 dark:border-zinc-300 transtion-all ease-in-out duration-300">

            <div 
              onClick={() => toggleItem(index)}
              className="flex items-center justify-between cursor-pointer"
            >

              <p className="text-base xl:text-xl font-semibold">{item.title}?</p>

              <span className="">
                {openItems.includes(index) ? (<FaChevronUp/>) : (<FaChevronDown />)}
              </span>

            </div>

            {openItems.includes(index) && (

              <div className="p-3">

                <p className="text-sm xl:text-base">-{item.content}</p>
                
              </div>

            )}

          </div>

        ))}
      </div>

    </section>

  )

}
