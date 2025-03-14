import React from 'react'
import { assets } from '../assets/assetss'
const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONTACT <span className='text-gray-800 font-semibold'>US</span>
        </p>
      </div>
      <div>
        <img src={assets.contact_image} alt="" />
        <div>
          <p>Our OFFICE</p>
          <p>571403 PES College of Engineering <br /> Mandya ,Karnataka</p>
          <p> TEL : 0000000000 <br />Email:sample@gmail.com</p>
          <p>Careers at CARE-CONNECT</p>
          <p>contact us to prioritize your health</p>
          <button>Explore more</button>
        </div>
      </div>
    </div>
  )
}

export default Contact