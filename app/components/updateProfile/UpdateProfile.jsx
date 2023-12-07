import React, { useState, useEffect } from 'react';
import styles from "./UpdateProfile.module.css"
import { TbCameraPlus } from 'react-icons/tb'
import { Grid, Typography } from "@mui/material";
import axios from "axios"
import jwt_decode from "jwt-decode";


const UpdateProfile = () => {
    const [profilePic, setProfilePic] = useState('person-combination.svg')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const savedProfilePic = localStorage.getItem('profilePic');
        if (savedProfilePic) {
            setProfilePic(savedProfilePic);
        }
        console.log("useEffect is runnig")
        let email = localStorage.getItem("email")
        fetch(`https://blessed-server-fb134c82a307.herokuapp.com/getUser/${email}`)
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
                } else {
                    console.log("Response is not found")
                }
                console.log("data: " + res.data.user);

            }).then((data) => {
                // setUsername(res.data.user)
                // setEmail(res.data.user)
                console.log("data ==>", data)
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error fetching username: ', error);
            });
    }, []);

    console.log(username, email)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
            localStorage.setItem('profilePic', URL.createObjectURL(file));
        }
    };


    return (
        <Grid className={styles.sidebar} id="Profile">
            <Grid className={styles.profile}>
                <img src={profilePic} alt="profliePic" id="photo" />
                <input
                    className={styles.file}
                    type="file"
                    name=""
                    id="file"
                    accept="image/jpeg, image/jpeg, image/png"
                    onChange={handleFileChange}
                />
                <label htmlFor="file" className={styles.uploadbtn}>
                    <TbCameraPlus className={styles.camera} />
                </label>
                <h2>Name {username.name}</h2>
            </Grid>
            <Grid className={styles.info}>
                <h3>Your Email:</h3>
                <p>{email.email}</p>
            </Grid>
        </Grid>
    );
}

export default UpdateProfile;