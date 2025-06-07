import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const {userData,setUserData,token,backendUrl,loadUserProfileData,} = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  if (!userData) return <div>Loading...</div>;

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setUserData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  // Handle Save
  const updateUserProfileData = async () => {
  try {
    const formData = new FormData();
    formData.append("name", userData.name || "");
    formData.append("phone", userData.phone || "");
    formData.append("gender", userData.gender || "");
    formData.append("dob", userData.dob || "");
    // Append address fields as separate fields
    formData.append("address", JSON.stringify(userData.address));
    if (imageFile) formData.append("image", imageFile);

    const { data } = await axios.post(
      backendUrl + '/api/user/update-profile',
      formData,
      {
        headers: {
          token, // or Authorization: `Bearer ${token}` depending on your backend
          // 'Content-Type' is automatically set to multipart/form-data by axios when using FormData
        }
      }
    );

    if (data.success) {
      toast.success("Profile updated!");
      setIsEdit(false);
      setImageFile(null);
      setPreviewUrl("");
      loadUserProfileData();
    } else {
      toast.error(data.message || "Update failed");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};


 

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        {isEdit ? (
          <label className="cursor-pointer">
            <span className="block mb-2 text-gray-700">Change Profile Image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <img
              src={previewUrl || userData.image}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
        )}
        <div className="mt-4 text-center">
          {isEdit ? (
            <input
              type="text"
              className="border rounded-md p-2 w-full text-center"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="text-xl font-semibold">{userData.name}</p>
          )}
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div>
        <p className="text-lg font-semibold text-gray-700">Contact Information</p>
        <div className="mt-2 space-y-2">
          <p className="text-gray-500">
            <span className="font-semibold text-black">Email:</span> {userData.email}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold text-black">Phone:</span>{" "}
            {isEdit ? (
              <input
                type="text"
                className="border rounded-md p-2"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              userData.phone
            )}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold text-black">Address:</span>{" "}
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="border rounded-md p-2 w-full mb-2"
                  value={userData.address?.line1 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  className="border rounded-md p-2 w-full"
                  value={userData.address?.line2 || ""}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              `${userData.address?.line1 || ""}, ${userData.address?.line2 || ""}`
            )}
          </p>
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      <div>
        <p className="text-lg font-semibold text-gray-700">Basic Information</p>
        <div className="mt-2 space-y-2">
          <p className="text-gray-500">
            <span className="font-semibold text-black">Gender:</span>{" "}
            {isEdit ? (
              <select
                className="border rounded-md p-2"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              userData.gender
            )}
          </p>
          <p className="text-gray-500">
            <span className="font-semibold text-black">Birthday:</span>{" "}
            {isEdit ? (
              <input
                type="date"
                className="border rounded-md p-2"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              userData.dob
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        {isEdit ? (
          <>
            <button
              onClick={updateUserProfileData}
              className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 mr-2"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setImageFile(null);
                setPreviewUrl("");
                loadUserProfileData(); // Reset changes
              }}
              className="px-6 py-2 bg-gray-400 text-white rounded-md shadow-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
