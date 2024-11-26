

import React, { useState } from 'react'
import icon1 from "../assets/01.png"
import icon2 from "../assets/02.png"
import icon3 from "../assets/03.png"
import icon4 from "../assets/04.png"


export default function Contact() {
    
    const contactList = [
        {
            imageUrl:icon1,
            title:"Location Address",
            desc:'Ushirika road ,Karen'
        },
        {
            imageUrl:icon2,
            title:"phone number",
            desc:'+254 57 429 010'
        },
        {
            imageUrl:icon3,
            title:"send email",
            desc:'cooping@gmail.com'
        },
        {
            imageUrl:icon4,
            title:"Our website",
            desc:'www.cooping.com'
        }
    ]

    const [formData, setFormData] = useState({})

    // handleSubmit
    const handleSubmit = () => {}

    // handleChange
    const handleChange = () => {}

  return (

    <section className="section space-y-20">

        {/* upper level */}
        <div className="space-y-10">

            {/* title */}
            <div className="space-y-5">

                <h2 className="title3 text-center">Get in touch</h2>

                <h2 className="title2 text-center">We are always eager to hear you</h2>

            </div>

            <div className="w-full">

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Map */}
                    <div className="col-span-2 w-full h-[400px] md:h-full  border-4 border-primaryLight dark:border-primaryDark rounded-md">

                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24306.04129006211!2d36.70835083476563!3d-1.3664598000000054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f051fc223e6c9%3A0x46afe71d2e294614!2sCooperative%20University%20of%20Kenya%2C%20Karen!5e1!3m2!1sen!2ske!4v1727415304114!5m2!1sen!2ske" 
                            className="w-full h-full rounded-md"
                        />

                    </div>

                    {/* icons */}
                    <div className="space-y-3">
                        {contactList.map((val,i) => (

                            <div key={i} className="flex gap-x-5 items-center p-2">

                                <img 
                                    src={val.imageUrl} 
                                    alt="" 
                                    className="" 
                                />

                                <div className="">

                                    <h6 className="text-xl font-semibold">{val.title}</h6>

                                    <p className="text-sm">{val.desc}</p>

                                </div>

                            </div>

                        ))}
                    </div>

                </div>

            </div>

        </div>

        {/* lower level */}
        <div className="">

            {/**/}
            <div className="space-y-10">

                <div className="">

                    <h2 className="title3 text-center">contact us</h2>

                    <h2 className="title2 text-center">Fill the form below so can get to know your needs better</h2>

                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input 
                            type="text" 
                            name="name"
                            placeholder='name'
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                        />

                        <input 
                            type="email" 
                            name="email"
                            placeholder='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                        />

                        <input 
                            type="text" 
                            name="phone"
                            placeholder='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            className="input"
                        />

                        <input 
                            type="text" 
                            name="subject"
                            placeholder='subject'
                            value={formData.subject}
                            onChange={handleChange}
                            className="input"
                        />

                    </div>

                    <textarea 
                        name="message" 
                        className="input w-full"
                        placeholder='type message ....'
                        value={formData.message}
                        onChange={() => handleChange()}
                    />

                    <button 
                      type="submit" 
                       className="btn rounded-md w-full"
                    >
                        Submit
                    </button>

                </form>

            </div>

        </div>

    </section>

  )

}
