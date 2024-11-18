


const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {

      colors:{

        bgLight:'#DAF1DE',
        textLight:'#0B2B26',
        textSecondaryLight:'#051F20',
        primaryLight:'#235347',
        secondaryLight:'#8EB69B',
        buttonLight:'#163832',

        bgDark:'#190019',
        textDark:'#dfb6b2',
        textSecondaryDark:'#FBE4D8',
        primaryDark:'#522B5B',
        secondaryDark:'#854F6C',
        buttonDark:'#2b124c',

      },

      fontFamily:{
        logo:["Comfortaa","sans-serif"],
        texting:["Kumbh Sans","serif"],
        title:["Montserrat","sans-serif"]
      }

    },
  },
  plugins: [
    flowbite.plugin(),
    require('tailwind-scrollbar'),
  ],
}