import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancleAppointment, completeAppointment } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="m-5">
      <div className="flex flex-wrap gap-8 mb-12">
        {/* Earnings Card */}
        <div className="flex items-center px-8 py-7 bg-gradient-to-br from-indigo-100 via-white to-white rounded-2xl shadow-lg border border-gray-100 min-w-[220px]">
          <img src={assets.earning_icon} alt="Earnings" className="w-14 h-14 mr-6 drop-shadow" />
          <div>
            <p className="text-3xl font-extrabold text-indigo-700">{currency}{dashData.earnings}</p>
            <p className="text-base text-indigo-700 font-semibold opacity-80">Earnings</p>
          </div>
        </div>
        {/* Appointments Card */}
        <div className="flex items-center px-8 py-7 bg-gradient-to-br from-blue-100 via-white to-white rounded-2xl shadow-lg border border-gray-100 min-w-[220px]">
          <img src={assets.appointment_icon} alt="Appointments" className="w-14 h-14 mr-6 drop-shadow" />
          <div>
            <p className="text-3xl font-extrabold text-blue-600">{dashData.appointments}</p>
            <p className="text-base text-blue-600 font-semibold opacity-80">Appointments</p>
          </div>
        </div>
        {/* Patients Card */}
        <div className="flex items-center px-8 py-7 bg-gradient-to-br from-lime-100 via-white to-white rounded-2xl shadow-lg border border-gray-100 min-w-[220px]">
          <img src={assets.patients_icon} alt="Patients" className="w-14 h-14 mr-6 drop-shadow" />
          <div>
            <p className="text-3xl font-extrabold text-lime-600">{dashData.patients}</p>
            <p className="text-base text-lime-600 font-semibold opacity-80">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings Table */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-6">
          <img src={assets.list_icon} alt="List" className="w-7 h-7 mr-3" />
          <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div className="space-y-2">
          {dashData.latestAppointments.map((item, index) => (
            <div 
              key={item._id || index}
              className="flex items-center px-3 py-4 bg-white rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md"
            >
              <img
                src={item.userData?.image || assets.default_user}
                alt={item.userData?.name || "User"}
                className="w-11 h-11 rounded-full object-cover bg-gray-200 mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.userData?.name || "Unknown"}</div>
                <div className="text-xs text-gray-500">{item.slotDate || "No date"}</div>
              </div>
              <div className="flex flex-col items-end min-w-[95px]">
                {item.cancelled ? (
                  <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-600">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">
                    Completed
                  </span>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancleAppointment(item._id)}
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-5 h-5 cursor-pointer hover:opacity-70"
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      src={assets.tick_icon}
                      alt="Complete"
                      className="w-5 h-5 cursor-pointer hover:opacity-70"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
