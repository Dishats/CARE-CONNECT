import React, { useState } from "react";
import { assets } from "../assets/assetss";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "richardjameswap@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2000-01-20",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={userData.image}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
        />
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
                  value={userData.address.line1}
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
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              `${userData.address.line1}, ${userData.address.line2}`
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
          <button
            onClick={() => setIsEdit(false)}
            className="px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
          >
            Save
          </button>
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
