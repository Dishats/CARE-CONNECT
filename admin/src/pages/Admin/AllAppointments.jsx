import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Allappointments = () => {
  const { aToken, appointments, getAllAppointments , cancelAppointment} = useContext(AdminContext);
  const {calculateAge} = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="p-6 w-full">
      <p className="text-2xl font-semibold mb-6">All Appointments</p>

      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md">
        <div className="min-w-full">

          {/* Table Head */}
          <div className="grid grid-cols-7 w-full py-3 px-6 border-b border-gray-200 bg-gray-50 text-gray-600 text-sm font-semibold uppercase">
            <div>#</div>
            <div>Patient</div>
            <div>Age</div>
            <div>Date & Time</div>
            <div>Doctor</div>
            <div>Fees</div>
            <div>Actions</div>
          </div>

          {/* Table Body */}
          {appointments.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 w-full items-center py-4 px-6 border-b text-sm text-gray-800 hover:bg-gray-50"
            >
              {/* Index */}
              <div>{index + 1}</div>

              {/* Patient Info */}
              <div className="flex items-center space-x-2">
                <img
                  src={item.userData.image}
                  alt="User"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <p>{item.userData.name}</p>
              </div>

              {/* Age */}
              <div>{calculateAge(item.userData.dob)}</div>

              {/* Date & Time */}
              <div>
                {item.slotDate}
                <br />
                <span className="text-xs text-gray-500">{item.slotTime}</span>
              </div>

              {/* Doctor */}
              <div className="flex items-center space-x-2 text-sm">
  <img 
    className="w-8 h-8 object-cover rounded-full bg-indigo-300" 
    src={item.docData.image} 
    alt="Doctor"
  />
  <span className='text-sm'>{item.docData.name}</span>
</div>

              {/* Fees */}
              <div className='tetx-center'>₹{item.amount}</div>

              {/* Actions */}
              {item.cancelled ? <p className='text-red-600 text-xs font-medium'>Cancelled</p>
              :<div>
                <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}/>
              </div> }
              
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Allappointments;