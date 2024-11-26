

import React from 'react'
import campus1 from "../assets/campus1.jpeg"

export default function About() {

  return (
    
    <section className="w-full ">

      <div 
        className="h-[60vh] w-full  bg-black" 
        style={{
          backgroundImage: `url(${campus1})`,
          backgroundPosition:"center",
          backgroundSize:"cover"
        }}
      >

        {/* about us */}
        <div className="section w-full h-full bg-gradient-to-b from-primaryLight/60 via-bgLight/80 to-bgLight dark:from-primaryDark/60 dark:via-bgDark/80 dark:to-bgDark/95 space-y-20">

            <h2 className=" title text-center">About us</h2>

            <p className="text-center text-base max-w-2xl mx-auto text-textSecondaryLight dark:text-textSecondaryDark ">
               Welcome to the COOPING, your go-to source for the latest news, insights, and stories from our vibrant campus community.
               We are dedicated to showcasing the diverse experiences, achievements, and perspectives of our students, faculty, and many other things.
            </p>

        </div>

      </div>

      {/* what we can offer */}
      <div className="section max-w-3xl mx-auto space-y-5">

          <h2 className=" title2">What we offer</h2>

          <ul className="list-desc space-y-4 ">

            <li className=""><b className="title3">Campus News:</b> Stay updated on the latest happenings at campus. From major events and announcements to new programs and initiatives, we keep you informed about what’s going on in our community.</li> 

            <li className=""><b className="title3">Student Stories :</b> Hear directly from our students about their academic journeys, extracurricular activities, and personal growth. From study tips to campus life hacks, our student contributors share their unique experiences and advice.</li>

            <li className=""><b className="title3">Faculty Insights:</b> Gain valuable knowledge from our esteemed faculty members who are experts in their fields. Read about their latest research, innovative teaching methods, and contributions to their disciplines.</li>

            <li className=""><b className="title3">Opinion Pieces:</b> Engage with thought-provoking articles on current issues, written by members of our university community. These pieces offer diverse perspectives and encourage meaningful discussions.</li>
          
          </ul> 

      </div>

      {/* join conversation */}
      <div className="section max-w-3xl mx-auto space-y-5">

        <h2 className="title2">Join the Conversation</h2>

          <p className="text-base">
               We invite you to explore our site, leave comments, and share your thoughts. Your feedback is invaluable to us as we strive to create a vibrant and inclusive online community.
             Thank you for visiting the COOPING. Together, let’s celebrate the spirit of learning, discovery, and innovation that defines our community.
          </p>

      </div>

    </section>

  )

}
