import doctorModel from "../models/doctorModel.js"
import bcrypt from "bcryptjs"

import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"

// ✅ Change Availability
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: 'Availability changed' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// ✅ Get All Doctors
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password', '-email']);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// ✅ Doctor Login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

// ✅ Get Doctor Appointments
const appointmetsDoctor = async (req, res) => {
  try {
    const docId = req.doctor._id; // Comes from auth middleware
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// ✅ Mark Appointment Completed
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.doctor._id;  // Only docId is from middleware
    const { appointmentId } = req.body;  // ✅ Get appointmentId from body

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true });
      return res.json({ success: true, message: 'Appointment Completed' });
    } else {
      return res.json({ success: false, message: 'Mark not completed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// ✅ Cancel Appointment
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.doctor._id;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId.toString() === docId.toString()) {
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
      return res.json({ success: true, message: 'Appointment Cancelled' });
    } else {
      return res.json({ success: false, message: 'Cancel failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
// api for dashboard data for doctor panel 
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.doctor._id;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    let patients = [];

    appointments.forEach((item) => {
      if (item.isCompleted && item.payment) {
        earnings += item.amount;
      }

      if (!patients.includes(item.userId.toString())) {
        patients.push(item.userId.toString());
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get doctor profile 
const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctor._id;
    const profileData = await doctorModel.findById(docId).select('-password')
    res.json({ success: true, profileData })
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
const updateProfile = async (req, res) => {
  try {
    const docId = req.doctor._id; // get ID from token middleware
    const { fees, address, available } = req.body; // get updated data from frontend

    const updatedProfile = await doctorModel.findByIdAndUpdate(
      docId,
      { fees, address, available },
      { new: true }
    );

    res.json({ success: true, message: 'Profile updated successfully', profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ✅ Export All
export { 
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmetsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateProfile
}
