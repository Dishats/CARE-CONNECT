import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="m-8">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-8 mb-12">
        {/* Doctors Card */}
        <div className="flex items-center px-8 py-7 bg-gradient-to-br from-indigo-100 via-white to-white rounded-2xl shadow-lg border border-gray-100 min-w-[220px] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-indigo-200 cursor-pointer">
          <img src={assets.doctor_icon} alt="Doctors" className="w-14 h-14 mr-6 drop-shadow" />
          <div>
            <p className="text-3xl font-extrabold text-indigo-700">{dashData.doctors}</p>
            <p className="text-base text-indigo-700 font-semibold opacity-80">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center px-8 py-7 bg-gradient-to-br from-blue-100 via-white to-white rounded-2xl shadow-lg border border-gray-100 min-w-[220px] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-blue-200 cursor-pointer">
          <img src={assets.appointment_icon} alt="Appointments" className="w-14 h-14 mr-6 drop-shadow" />
          <div>
            <p className="text-3xl font-extrabold text-blue-600">{dashData.appointments}</p>
            <p className="text-base text-blue-600 font-semibold opacity-80">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center px-8 py-7 bg-gradient-to-br from-lime-100 via-white to-white rounded-2xl shadow-lg border border-gray-100 min-w-[220px] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-lime-200 cursor-pointer">
          <img src={assets.patients_icon} alt="Patients" className="w-14 h-14 mr-6 drop-shadow" />
          <div>
            <p className="text-3xl font-extrabold text-lime-600">{dashData.patients}</p>
            <p className="text-base text-lime-600 font-semibold opacity-80">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-6">
          <img src={assets.list_icon} alt="List" className="w-7 h-7 mr-3" />
          <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div className="space-y-4">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md"
            >
              <img
                src={item.docData.image}
                alt="Doctor"
                className="w-12 h-12 rounded-full object-cover bg-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {item.docData.name}
                </p>
                <p className="text-xs text-gray-500">{item.slotDate}</p>

                {item.cancelled ? <p className='text-red-600 text-xs font-medium'>Cancelled</p>
                              : item.isCompleted ? <p className='text-green-600 text-xs font-medium'>Completed</p>:
                              <div>
                                <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}/>
                              </div> }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;