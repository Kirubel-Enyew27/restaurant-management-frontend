import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaLock, FaPen, FaTimesCircle } from "react-icons/fa";
import Axios from "../../axiosInstance/axiosInstance";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userID, setUserID] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formState, setFormState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserID(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (userID) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const response = await Axios.get(`/v1/customer/${userID}`);
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [userID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["oldPassword", "newPassword", "confirmPassword"].includes(name)) {
      setFormState((prev) => ({ ...prev, [name]: value }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadProfilePic = async () => {
    setUploading(true);
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("profile_picture", selectedImage);

    try {
      const response = await Axios.patch(
        `/v1/customer/upload/${userID}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUser(response.data.data);
      alert("Profile picture updated!");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image.");
    } finally {
      setPreviewImage("");
      setSelectedImage(null);
      setUploading(false);
    }
  };

  const updateProfile = async () => {
    setUpdating(true);
    try {
      const response = await Axios.patch(`/v1/customer/update/${userID}`, user);
      setUser(response.data.data);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = formState;

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      await Axios.patch(`/v1/customer/password/${userID}`, {
        old_password: oldPassword,
        new_password: newPassword,
      });
      alert("Password updated!");
      setFormState({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setIsChangingPassword(false);
    } catch (err) {
      console.error("Error changing password:", err);
      alert("Failed to change password.");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>User not found</div>;

  return (
    <div className="profile-page">
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#e96b45",
        }}
      >
        Profile
      </h2>
      <div className="profile-info">
        <img
          src={
            previewImage ||
            `https://defeated-anatola-kiru-e1ff93d7.koyeb.app${
              user.ProfilePicture?.String
            }?t=${Date.now()}`
          }
          alt="User Profile"
        />

        {isEditing ? (
          <>
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
                ref={fileInputRef}
              />
              {previewImage && (
                <FaTimesCircle
                  className="clear-icon"
                  onClick={() => {
                    setPreviewImage("");
                    setSelectedImage(null);
                    fileInputRef.current.value = ""; // Clear input field
                  }}
                />
              )}
            </div>
            {selectedImage && (
              <button onClick={uploadProfilePic} className="upload-btn">
                {uploading ? "uploading..." : "Upload New Picture"}
              </button>
            )}
            <label>Username</label>
            <input
              type="text"
              name="Username"
              value={user.Username || ""}
              onChange={handleInputChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="Email"
              value={user.Email || ""}
              onChange={handleInputChange}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "15rem",
              }}
            >
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                <FaTimesCircle className="icons" /> Cancel
              </button>
              <button
                className="update-btn"
                onClick={updateProfile}
                disabled={updating}
              >
                <FaCheckCircle className="icons" />{" "}
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </>
        ) : isChangingPassword ? (
          <>
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={formState.oldPassword}
              onChange={handleInputChange}
            />
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formState.newPassword}
              onChange={handleInputChange}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleInputChange}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: "15rem",
              }}
            >
              <button
                className="cancel-btn"
                onClick={() => setIsChangingPassword(false)}
              >
                <FaTimesCircle className="icons" /> Cancel
              </button>
              <button
                className="update-btn"
                onClick={handleChangePassword}
                disabled={updating}
              >
                <FaCheckCircle className="icons" />{" "}
                {updating ? "Updating..." : "Save Password"}
              </button>
            </div>
          </>
        ) : (
          <div
            className="user-info"
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p>{user.Username}</p>
            <p>{user.Email}</p>
            <button onClick={() => setIsEditing(true)} disabled={isEditing}>
              <FaPen className="icons" /> Edit
            </button>
            <button
              onClick={() => setIsChangingPassword(true)}
              disabled={isChangingPassword}
            >
              <FaLock className="icons" /> Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
