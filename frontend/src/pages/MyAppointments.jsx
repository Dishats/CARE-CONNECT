import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";


const MyAppointments = () => {
  const { backendUrl , token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([])
  const getUserAppointments = async () => {
    try {
      const {data}= await axios.get(backendUrl + '/api/user/appointments', {
  headers: { token }
});

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
   
  const cancelAppointment = async(appointmentId) =>{
    try {
      console.log(appointmentId);
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }



  useEffect(()=>{
      if (token) {
        getUserAppointments()
      }
  },[token])
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center sm:text-left">
        My Appointments
      </p>
      <div className="space-y-4 sm:space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            {/* Doctor Image */}
            <img
              src={item.docData.image}
              alt="Doctor"
              className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0"
            />

            {/* Doctor Details */}
            <div className="flex-1 sm:ml-4 text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-700">{item.docData.name}</p>
              <p className="text-gray-500">{item.docData.speciality}</p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold text-black">Address:</span> {item.docData.address.line1},{" "}
                {item.docData.address.line2}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold text-black">Date & Time:</span> {item.slotDate} | {item.slotTime}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col space-y-2 mt-4 sm:mt-0 sm:flex-row sm:space-y-0 sm:space-x-3">
              <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 hover:text-white">
                Pay Online
              </button>
              <button onClick={()=>cancelAppointment(item._id)} className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 hover:text-white">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
