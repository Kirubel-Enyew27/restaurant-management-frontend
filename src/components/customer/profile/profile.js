import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaLock, FaPen, FaTimesCircle } from "react-icons/fa";
import Axios from "../../axiosInstance/axiosInstance";
import "./profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userID, setUserID] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview
    }
  };

  const uploadProfilePic = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("profilePic", selectedImage);

    try {
      const response = await Axios.patch(
        `/v1/customer/upload-profile-pic/${userID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser((prev) => ({
        ...prev,
        profilePic: response.data.data.profilePic,
      }));
      alert("Profile picture updated!");
      setPreviewImage("");
      setSelectedImage(null);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const updateProfile = async () => {
    setUpdating(true);
    try {
      const response = await Axios.patch(
        `/v1/customer/update/${userID}`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUser(response.data.data);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
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
            user.profilePic ||
            "https://lh4.googleusercontent.com/proxy/rxQrcISNW6c152TqWIA9iND_qakd02mJVLg8nSRrwxla5LSGonSX6tOxyhSbS9NWTuXZ4xXKJvzXPPfsfLxHEflyoqfrUDN3HMnLqJUpuE6y"
          }
          alt="User Profile"
        />

        {isEditing ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <button onClick={uploadProfilePic} className="upload-btn">
              Upload New Picture
            </button>
            <label>Username</label>
            <input
              type="text"
              name="Username"
              value={user.Username || ""}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="Email"
              value={user.Email || ""}
              onChange={handleChange}
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
            <button onClick={() => alert("Change password clicked")}>
              <FaLock className="icons" /> Change Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
