import  { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { PencilIcon, CheckIcon } from "lucide-react";

// Giả sử bạn có sẵn helper cho fetch API
const getPatientProfile = async () => {
  const response = await fetch("/api/patient-profile");
  if (!response.ok) throw new Error("Failed to fetch patient profile");
  return await response.json();
};

const updatePatientProfile = async (data: any) => {
  const response = await fetch("/api/patient-profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update patient profile");
  return await response.json();
};

const PatientProfileUI = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [patientData, setPatientData] = useState({
    firstName: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
  });

  // Lấy dữ liệu thật từ server
  useEffect(() => {
    getPatientProfile()
      .then((data) => setPatientData(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        await updatePatientProfile(patientData); // Cập nhật dữ liệu lên server
        alert("Cập nhật thành công");
      } catch (err) {
        console.error(err);
        alert("Lỗi khi cập nhật dữ liệu");
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="mx-auto w-[1220px] h-screen">
      <div className="flex items-center justify-between mb-6 shadow-[0_6px_15px_rgba(0,0,0,0.15)] p-5 relative">
        <div className="flex items-center">
          <img
            src="https://cdn.dribbble.com/userupload/17410840/file/original-07a4b1c25e613420faf0f0aff1283311.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-semibold">{patientData.firstName}</h2>
            <p className="text-gray-500">📞 {patientData.phone}</p>
            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-lg">
              Active
            </span>
          </div>
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

      <div className="shadow-[0_6px_15px_rgba(0,0,0,0.15)] p-5">
        <div className="flex border-b mb-6">
          {["Personal Information", "Process"].map((tab, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 cursor-pointer text-lg font-semibold transition-colors duration-200 ${
                activeTab === index
                  ? "text-blue-600 "
                  : "text-gray-500 hover:text-blue-300"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        {activeTab === 0 ? (
          <div className="grid grid-cols-2 gap-6 mb-6">
            {Object.entries(patientData).map(([key, value]) => (
              <div key={key}>
                <strong>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </strong>
                {isEditing ? (
                  <InputText
                    value={value}
                    name={key}
                    onChange={handleChange}
                    className="w-full mt-1"
                  />
                ) : (
                  <p>{value}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-700">
            <p>Current process details go here...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfileUI;
