import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData , backendUrl} = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()

      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className="bg-[#fafaff] min-h-screen w-full flex flex-col items-center py-10 px-5">
      <div className="max-w-5xl w-full flex flex-row gap-10 items-start">
        {/* Image on left */}
        <div className="flex-shrink-0">
          <img
            src={profileData.image}
            alt=""
            className="w-60 h-60 object-cover rounded-xl shadow-md bg-[#e4e6fb]"
          />
        </div>
        {/* Box on right */}
        <div className="flex-1 bg-white rounded-[24px] shadow-xl py-10 px-12">
          <p className="font-extrabold text-2xl text-gray-900 mb-2">
            {profileData.name}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <p className="text-gray-700 font-semibold">
              {profileData.degree} - {profileData.speciality}
            </p>
            <button className="bg-gray-100 text-gray-700 font-semibold rounded px-2 py-1 text-xs border border-gray-200">
              {profileData.experience} Years
            </button>
          </div>
          <div className="mb-6">
            <p className="font-semibold mb-1 text-gray-700">About:</p>
            <p className="text-gray-600">{profileData.about}</p>
          </div>
          <p className="mb-4 text-base text-gray-700 font-medium">
            Appointment fee :
            <span className="font-bold text-black">
              {currency}
              {isEdit ? (
                <input
                  type="number"
                  className="border border-gray-300 rounded px-2 py-1 w-24 ml-2"
                  value={profileData.fees ?? ''}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>
          <div className="mb-4 w-full">
            <p className="font-semibold text-gray-700">Address:</p>
            <p className="text-gray-600">
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-5">
            <input onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
              type="checkbox"
              checked={profileData.available}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded accent-blue-600"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>
          {
            isEdit
              ? <button onClick={updateProfile} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition mt-1 shadow">
                save
              </button>
              : <button onClick={() => setIsEdit(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition mt-1 shadow">
                Edit
              </button>
          }


        </div>
      </div>
    </div>
  )
}

export default DoctorProfile