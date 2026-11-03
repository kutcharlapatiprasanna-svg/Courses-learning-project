
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import {
  updateMyProfile,
  updateMyProfilePicture,
} from "../../services/profileService";

import "./ProfileSettings.css";

const DEFAULT_PROFILE_IMAGE =
  "https://i.pravatar.cc/150?img=47";

const getProfileImageSource = (profile) =>
  profile?.profilePicture ||
  profile?.avatar ||
  profile?.image;

// GET PROFILE IMAGE URL
const getProfileImage = (profile) => {
  const image = getProfileImageSource(profile);

  if (typeof image === "string") {
    return image;
  }

  if (typeof image === "object" && image !== null) {
    return (
      image.url ||
      image.secure_url ||
      DEFAULT_PROFILE_IMAGE
    );
  }

  return DEFAULT_PROFILE_IMAGE;
};

const hasProfileImage = (profile) => {
  const image = getProfileImageSource(profile);

  if (typeof image === "string") {
    return Boolean(image);
  }

  if (typeof image === "object" && image !== null) {
    return Boolean(image.url || image.secure_url);
  }

  return false;
};

const getUpdatedUser = (response) =>
  response?.user ||
  response?.data?.user ||
  response?.data ||
  {};

// READ SELECTED IMAGE AS BASE64 DATA URL
const readImageAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);

    reader.onerror = () =>
      reject(
        reader.error ||
        new Error("Unable to read the selected image.")
      );

    reader.readAsDataURL(file);
  });

export default function ProfileSettings() {
  const { user, updateUser } = useAuth();

  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");

  const [selectedImage, setSelectedImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(
    () => getProfileImage(user)
  );

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // SELECT IMAGE FROM COMPUTER
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      event.target.value = "";
      return;
    }

    try {
      const imageDataUrl = await readImageAsDataUrl(file);

      setSelectedImage(imageDataUrl);
      setPreviewImage(imageDataUrl);
    } catch {
      setError("Unable to read the selected image.");
      event.target.value = "";
    }
  };

  // SAVE PROFILE
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setLoading(true);

      const profileResponse = await updateMyProfile({
        name: name.trim(),
      });

      let updatedUser = getUpdatedUser(profileResponse);
      let pictureUser = null;

      if (selectedImage) {
        const pictureResponse =
          await updateMyProfilePicture(selectedImage);

        pictureUser = getUpdatedUser(pictureResponse);

        updatedUser = {
          ...updatedUser,
          ...pictureUser,
        };
      }

      const finalUser = {
        ...updatedUser,
        ...(selectedImage && !hasProfileImage(pictureUser)
          ? { avatar: { url: selectedImage } }
          : {}),
        name: updatedUser.name || name.trim(),
      };

      // UPDATE AUTH CONTEXT (NAVBAR AVATAR READS FROM THIS)
      updateUser(finalUser);

      setPreviewImage(getProfileImage(finalUser));

      setSelectedImage(null);

      setMessage(
        profileResponse?.message ||
        "Profile updated successfully."
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-settings-page">

      <div className="profile-settings-card">

        {/* PAGE HEADER */}

        <div className="profile-settings-header">
          <h2>Profile Settings</h2>

          <p>
            Update your account information and profile photo.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* PROFILE IMAGE */}

          <div className="profile-image-section">

            <img
              src={previewImage}
              alt="Profile"
              className="profile-settings-avatar"
              onError={(event) => {
                event.currentTarget.src =
                  DEFAULT_PROFILE_IMAGE;
              }}
            />

            <div className="profile-image-controls">

              <label
                htmlFor="profile-image-upload"
                className="upload-image-button"
              >
                Choose Profile Image
              </label>

              <input
                id="profile-image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

              <small>
                PNG, JPG or JPEG. Maximum size: 5 MB.
              </small>

            </div>
          </div>

          {/* NAME */}

          <div className="profile-form-group">

            <label htmlFor="profile-name">
              Full Name
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
              required
            />

          </div>

          {/* EMAIL */}

          <div className="profile-form-group">

            <label htmlFor="profile-email">
              Email Address
            </label>

            <input
              id="profile-email"
              type="email"
              value={user?.email || ""}
              readOnly
            />

          </div>

          {/* ROLE */}

          <div className="profile-form-group">

            <label htmlFor="profile-role">
              Account Role
            </label>

            <input
              id="profile-role"
              type="text"
              value={user?.role || "User"}
              readOnly
            />

          </div>

          {/* ERROR MESSAGE */}

          {error && (
            <p className="profile-error">
              {error}
            </p>
          )}

          {/* SUCCESS MESSAGE */}

          {message && (
            <p className="profile-success">
              {message}
            </p>
          )}

          {/* ACTION BUTTONS */}

          <div className="profile-settings-actions">

            <button
              type="button"
              className="profile-cancel-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="profile-save-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
  