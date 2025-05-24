// File: src/services/patientService.ts

// getPatientProfile: Gọi API lấy thông tin hồ sơ bệnh nhân
export const getPatientProfile = async (userId: string) => {
  const token = localStorage.getItem("token");
//   console.log(token);
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

// updatePatientProfile: Gọi API cập nhật hồ sơ bệnh nhân
export const updatePatientProfile = async (data: any, userId: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/patient-profile?userId=${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update patient profile");
  return await response.json();
};

// setVipStatus: Gọi API cập nhật trạng thái VIP
export const setVipStatus = async (userId: number) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:5000/set-vip?userId=${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Failed to set VIP status: ${response.status} - ${err}`);
  }

  return await response.json();
};
