
import axiosInstance from "../api/axiosInstance";

export const updateMyProfile = async (profileData) => {
  const response = await axiosInstance.put(
    "/auth/update-user-info",
    profileData
  );

  return response.data;
};

export const updateMyProfilePicture = async (avatar) => {
  const response = await axiosInstance.put(
    "/auth/update-user-profile-picture",
    { avatar }
  );

  return response.data;
};
