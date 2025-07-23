import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancleAppointment } = useContext(DoctorContext)
  const { calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-5">All Appointments</h2>
      <div className="overflow-x-auto">
        <div className="min-w-[900px] bg-white shadow rounded-xl">
          {/* Table Header */}
          <div className="grid grid-cols-7 bg-gray-100 py-3 px-4 font-semibold border-b border-gray-200 text-gray-700 uppercase text-center tracking-wide">
            <span>#</span>
            <span>Patient</span>
            <span>Payment Status</span>
            <span>Age</span>
            <span>Date & Time</span>
            <span>Fees</span>
            <span>Action</span>
          </div>

          {/* Table Rows */}
          {appointments.reverse().map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 items-center py-3 px-4 border-b border-gray-100 text-center text-sm hover:bg-gray-50 transition"
            >
              <span>{index + 1}</span>
              <span className="flex items-center gap-2 justify-center">
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="font-medium">{item.userData.name}</span>
              </span>
              <span
                className={`font-medium ${item.payment ? 'text-green-600' : 'text-yellow-600'
                  }`}
              >
                {item.payment ? 'ONLINE PAYMENT' : 'CASH'}
              </span>
              <span>{calculateAge(item.userData.dob)}</span>
              <span>
                {item.slotDate}, {item.slotTime}
              </span>
              <span>
                {currency}
                {item.amount}
              </span>
              {
                item.cancelled ? <p className='text-red-800 font-medium'>Cancelled</p>
                  : item.isCompleted ? <p className='text-green-800 font-medium'>Completed</p>
                    : <span className="flex gap-3 justify-center">
                      <img onClick={() => cancleAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-5 h-5 cursor-pointer hover:opacity-80"
                      />
                      <img onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Approve"
                        className="w-5 h-5 cursor-pointer hover:opacity-80"
                      />
                    </span>
              }

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments
