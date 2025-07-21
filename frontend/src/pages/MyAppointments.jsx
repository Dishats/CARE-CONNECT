import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()



  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
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

  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await await axios.post(backendUrl + '/api/user/cancel-appointment', {
        appointmentId
      }, {
        headers: { token }
      });

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'appointment payment',
      description :'Appointment Payment',
      order_id : order.id,
      receipt : order.receipt,
      handler : async (response) => {
        console.log(response);
        

        try {
          const {data} = await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
          if (data.success) {
            getUserAppointments()
            navigate('/myappointments')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
          
        }

      }

    }
      const rzp = new window.Razorpay(options)
      rzp.open()

  }


  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)

      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
      getDoctorsData()
    }
  }, [token])
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
              {!item.cancelled && item.payment && <button className="sm:min-w-48 py-2 rounded text-stone-600 bg-indigo-50">payment done</button>}
              {!item.cancelled && !item.payment && <button onClick={() => appointmentRazorpay(item._id)} className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 hover:text-white">
                Pay Online
              </button>}
              {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 hover:text-white">
                Cancel Appointment
              </button>}
              {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-600 rounded text-red-600"> Appointment cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
