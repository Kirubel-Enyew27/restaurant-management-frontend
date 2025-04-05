import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Axios from '../../axiosInstance/axiosInstance';
import "./profile.css";

const ProfilePage = () => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [userID, setUserID] = useState("");
    const [isEditing, setIsEditing] = useState(false);

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
           const response = await Axios.patch(`/v1/customer/update/${userID}`, user, {
                headers: { "Content-Type": "application/json" },
            });
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
            <h1>Profile Page</h1>
            <div className="profile-info">
                <img src={user.profilePic || "https://via.placeholder.com/150"} alt="User Profile" />
                <button onClick={() => setIsEditing(true)} disabled={isEditing}>
                    Edit
                </button>

                {isEditing ? (
                    <>
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

                        <button onClick={updateProfile} disabled={updating}>
                            {updating ? "Updating..." : "Save Changes"}
                        </button>
                    </>
                ) : (
                    <div style={{margin:"0px"}}>
                        <p><strong>Username:</strong> {user.Username}</p>
                        <p><strong>Email:</strong> {user.Email}</p>
                    </div>
                )}
                <button onClick={() => alert("Change password clicked")}>Change Password</button>
            </div>
        </div>
    );
};

export default ProfilePage;
