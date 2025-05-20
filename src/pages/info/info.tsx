import { useEffect, useMemo, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { createUser, User } from "../customer/model";

// Giả sử bạn có sẵn helper cho fetch API
const getPatientProfile = async (userId: string) => {
  const token = localStorage.getItem("token");
  console.log(token)
  const response = await fetch(`http://localhost:5000/profile?userId=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to fetch profile: ${response.status} - ${err}`);
  }

  return await response.json();
};

const updatePatientProfile = async (data: any, userId: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/patient-profile?userId=${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update patient profile");
  return await response.json();
};

const PatientProfileUI = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState<User>();
  const location = useLocation();
  const [onlyCreate, setOnlyCreate] = useState(false);
  const genderOptions = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");

    if (userId) {
      getPatientProfile(userId)
        .then((data) => setPatientData(data))
        .catch((err) => console.error(err));
    } else {
      const emptyUser: User = createUser();
      setPatientData(emptyUser)
      setOnlyCreate(true)
      setIsEditing(true)
    }

  }, [location.search]);

  const handleChange = (e: any) => {
    const { name, value } = e.target || e;
    setPatientData((prevData) => {
      if (!prevData) return prevData; // Tránh lỗi khi prevData là undefined
      return { ...prevData, [name]: value } as User;
    });
  };

  const toggleEdit = async () => {
    if (isEditing) {
      const searchParams = new URLSearchParams(location.search);
      const userId = searchParams.get("userId");
      if (userId) {
        try {
          await updatePatientProfile(patientData, userId);
        } catch (err) {
          console.error(err);
          return
        }
      } else {
        ///create
      }
    }

    setIsEditing(!isEditing);
  };


  return (
    <div className="mx-auto w-[1220px] h-screen">
      <div className="flex items-center justify-between mb-6 shadow-md p-5 relative">
        <div className="flex items-center">
          <Avatar label={getInitials(patientData?.fullName)} className="mr-4" size="xlarge" />

          <div>
            <h2 className="text-2xl font-semibold">{patientData?.fullName}
              <span className="ml-2 bg-green-100 text-green-700 text-sm px-2 py-1 rounded-lg">
                {patientData?.enabled ? "Active" : "Inactive"}
              </span></h2>
            <p className="text-gray-500">📞 {patientData?.phone}</p>
            {
              patientData?.vip ? <span className="bg-yellow-100 text-yellow-700 text-sm px-2 py-1 rounded-lg hover:cursor-pointer">VIP</span>
                : <span className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-lg hover:cursor-pointer">Bạn còn {patientData?.useNumber ?? 0} lần dùng thử, nâng cấp ngay !!!</span>

            }
          </div>
        </div>
        <div className="flex">
          <div hidden={!isEditing || onlyCreate} className="cursor-pointer p-2 rounded-full hover:bg-gray-300" onClick={() => {
            setIsEditing(!isEditing);
          }}
          >
            <XIcon size={20} className="text-gray-700" />
          </div>

          <div
            onClick={toggleEdit}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-300"
          >
            {isEditing ? (
              <CheckIcon size={20} className="text-green-600" />
            ) : (
              <PencilIcon size={20} className="text-gray-700" />
            )}
          </div>
        </div>


      </div>

      <div className="shadow-md p-5">
        <div className="grid grid-cols-2 gap-6 mb-6">
          {patientData && (
            <>
              {["email", "job", "fullName", "phone", "address"].map((field) => (
                <div key={field}>
                  <strong>
                    {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                  </strong>
                  {isEditing ? (
                    <InputText
                      value={(patientData as any)[field] || ""}
                      name={field}
                      onChange={handleChange}
                      className="w-full mt-1"
                    />
                  ) : (
                    <p>{(patientData as any)[field]}</p>
                  )}
                </div>
              ))}
              <div>
                <strong>Gender:</strong>
                {isEditing ? (
                  <Dropdown
                    name="gender"
                    value={patientData.gender}
                    options={genderOptions}
                    onChange={(e) => handleChange({ name: "gender", value: e.value })}
                    className="w-full mt-1"
                  />
                ) : (
                  <p>{patientData.gender}</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientProfileUI;


export const getInitials = (fullName: string | undefined) => {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};
