import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Avatar } from "primereact/avatar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useToast } from "../../contexts/ToastContext";
import { getPatientProfile, setVipStatus, updatePatientProfile } from "./patientService";
import { createUser, User } from "./userModel";
import { motion } from "framer-motion";
import PracticeProgress from "./PracticeProgress";
import TopicProgress from "./TopicProgress";

// import { useAuth } from "../../contexts/auth_context";
export const getInitials = (fullName: string | undefined): string => {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0) + names[names.length - 1].charAt(0)
  ).toUpperCase();
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
  const toast = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId");
    // const { user } = useAuth();
    // const userId = user?.id;

    if (userId) {
      getPatientProfile(userId)
        .then((data) => setPatientData(data))
        .catch((err) => console.error(err));
    } else {
      const emptyUser: User = createUser();
      setPatientData(emptyUser);
      setOnlyCreate(true);
      setIsEditing(true);
    }
  }, [location.search]);

  const handleChange = (e: any) => {
    const { name, value } = e.target || e;
    setPatientData((prevData) => {
      if (!prevData) return prevData;
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
          toast.showSuccess("Cập nhật thông tin thành công");
        } catch (err) {
          console.error(err);
          toast.showError("Cập nhật thất bại");
          return;
        }
      } else {
        ///create
      }
    }

    setIsEditing(!isEditing);
  };

  const confirmtChangeStatus = () => {
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get("userId") as any;
    confirmDialog({
      message: `Bạn có chắc chắn muốn kích hoạt vip không`,
      header: `Xác nhận kích hoạt`,
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'Xác nhận',
      rejectLabel: 'Hủy',
      accept: () => setVipStatus(userId).then(() => {
        getPatientProfile(userId)
          .then((data) => setPatientData(data))
          .catch((err) => console.error(err));
        toast.showSuccess("Kích hoạt vip thành công");
      }).catch(() => {
        toast.showError("Kích hoạt vip thất bại");
      }),
    });
  };

  function upVip() {
    confirmtChangeStatus();
  }

  return (
    <>
      <ConfirmDialog />
      <motion.div
        className="mx-auto w-full max-w-4xl min-h-screen px-4 py-8 pb-28"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6 p-6 bg-white rounded-xl shadow-lg relative">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <Avatar
              label={getInitials(patientData?.fullName)}
              className="mr-4 ring-4 ring-indigo-200"
              size="xlarge"
            />
            <div>
              <h2 className="text-2xl font-semibold flex items-center">
                {patientData?.fullName}
                <span className="ml-3 bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                  {patientData?.enabled ? "Active" : "Inactive"}
                </span>
              </h2>
              <p className="text-gray-500 mt-1">📞 {patientData?.phone}</p>
              {patientData?.vip ? (
                <motion.span
                  className="mt-2 inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  VIP
                </motion.span>
              ) : (
                <motion.span
                  className="mt-2 inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200"
                  onClick={() => { upVip(); }}
                  whileHover={{ scale: 1.05 }}
                >
                  Bạn còn {patientData?.useNumber ?? 0} lần dùng thử, nâng cấp ngay !!!
                </motion.span>
              )}
            </div>
          </motion.div>

          <div className="flex space-x-2">
            <motion.div
              className={`${!isEditing || onlyCreate ? 'hidden' : 'p-2'} rounded-full hover:bg-gray-300 cursor-pointer`}
              onClick={() => { setIsEditing(!isEditing); }}
              whileHover={{ rotate: -10 }}
            >
              <XIcon size={20} className="text-gray-700" />
            </motion.div>

            <motion.div
              className="p-2 rounded-full hover:bg-gray-300 cursor-pointer"
              onClick={toggleEdit}
              whileHover={{ rotate: 10 }}
            >
              {isEditing ? (
                <CheckIcon size={20} className="text-green-600" />
              ) : (
                <PencilIcon size={20} className="text-gray-700" />
              )}
            </motion.div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {patientData && (
              <>
                {[
                  "fullName",
                  "job",
                  "phone",
                  "address",
                  "email",
                ].map((field) => (
                  <div key={field}>
                    <strong className="block text-gray-700">
                      {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:
                    </strong>
                    {field === "email" ? (
                      <p className="mt-1 text-gray-800">{(patientData as any)[field]}</p>
                    ) : isEditing ? (
                      <InputText
                        value={(patientData as any)[field] || ""}
                        name={field}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    ) : (
                      <p className="mt-1 text-gray-800">{(patientData as any)[field]}</p>
                    )}
                  </div>
                ))}

                <div>
                  <strong className="block text-gray-700">Gender:</strong>
                  {isEditing ? (
                    <Dropdown
                      name="gender"
                      value={patientData.gender}
                      options={genderOptions}
                      onChange={(e) => handleChange({ name: "gender", value: e.value })}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  ) : (
                    <p className="mt-1 text-gray-800">{patientData.gender}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <TopicProgress />
        <PracticeProgress />
      </motion.div>
    </>
  );
};

export default PatientProfileUI;
