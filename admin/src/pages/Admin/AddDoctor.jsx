import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';




const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General Physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
     

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImg) {
                return toast.error("Image Not Selected")
            }

            const formData = new FormData()
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            //console log formdata

            formData.forEach((value,key)=>{
                console.log(`${key}:${value}`);
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
            if (data.success) {
                toast.success(data.message) 
                setDocImg(false)
                setName(" ") 
                setEmail('') 
                setPassword('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('') 
            }else{
                toast.error(data.message)
            }
            

            
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
        
    }




    return (
        <form onSubmit={onSubmitHandler} className="p-6 max-w-5xl mx-auto bg-white rounded-md shadow-sm text-sm text-gray-800 space-y-6">
            <p className="text-xl font-semibold text-gray-800 mb-4">Add Doctor</p>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Upload Image */}
                <div className="flex flex-col items-center gap-3">
                    <label htmlFor="doc-img" className="cursor-pointer">
                        <img
                            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                            alt=""
                            className="w-20 h-20 object-cover rounded-full border border-gray-300"
                        />
                    </label>

                    <input
                        onChange={(e) => setDocImg(e.target.files[0])}
                        type="file"
                        id="doc-img"
                        hidden
                    />

                    <p className="text-center text-sm text-gray-600 leading-tight">
                        Upload Doctor <br /> Picture
                    </p>
                </div>


                {/* Form Inputs */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <p className="mb-1">Doctor Name</p>
                            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>

                        <div>
                            <p className="mb-1">Doctor Email</p>
                            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email' required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>

                        <div>
                            <p className="mb-1">Doctor Password</p>
                            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='password' required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>

                        <div>
                            <p className="mb-1">Experience</p>
                            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="w-full border border-gray-300 rounded-md px-3 py-2">
                                <option value="1 year">1 Year</option>
                                <option value="2 year">2 Year</option>
                                <option value="3 year">3 Year</option>
                                <option value="4 year">4 Year</option>
                                <option value="5 year">5 Year</option>
                                <option value="6 year">6 Year</option>
                                <option value="7 year">7 Year</option>
                                <option value="8 year">8 Year</option>
                                <option value="9 year">9 Year</option>
                                <option value="10 year">10 Year</option>
                                <option value="11 year">11 Year</option>
                                <option value="12 year">12 Year</option>
                            </select>
                        </div>

                        <div>
                            <p className="mb-1">Fees</p>
                            <input onChange={(e)=>setFees(e.target.value)} value={fees} type="number" placeholder='fees' required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <p className="mb-1">Speciality</p>
                            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="w-full border border-gray-300 rounded-md px-3 py-2">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div>
                            <p className="mb-1">Education</p>
                            <input onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" placeholder='Education' required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>

                        <div>
                            <p className="mb-1">Address</p>
                            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" placeholder='adrress 1' required className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2" />
                            <input onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" placeholder='adrress 2' required className="w-full border border-gray-300 rounded-md px-3 py-2" />
                        </div>
                    </div>
                </div>

                {/* About Doctor & Button */}
            </div>

            <div>
                <p className="mb-1">About Doctor</p>
                <textarea onChange={(e)=>setAbout(e.target.value)} value={about} placeholder='write about doctor' rows={5} required className="w-full border border-gray-300 rounded-md px-3 py-2"></textarea>
            </div>

            <button type="submit" className='bg-primary text-white text-sm px-10 py-2 rounded-full'>
                Add Doctor
            </button>
        </form>
    )
}

export default AddDoctor
