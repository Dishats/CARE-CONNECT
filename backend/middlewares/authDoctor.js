// middlewares/authDoctor.js
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';

const authDoctor = async (req, res, next) => { 
  try {
    const token = req.headers.dtoken;
// 
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, login again' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await doctorModel.findById(decoded.id).select('-password');
    
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    req.doctor = doctor; // ✅ Attach full doctor to request
    next();
  } catch (error) {
    console.error('Auth Error:', error);
    res.status(401).json({ success: false, message: 'Unauthorized: ' + error.message });
  }
};

export default authDoctor;
