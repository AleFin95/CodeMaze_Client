import React, { useEffect, useState } from 'react'



const ProfileInfo = () => {
const [profileInfo, setProfileInfo] = useState([])

useEffect(()=> {
    const fetchData = async () => {
        try{
            const access_token = localStorage.getItem("access_token");
            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            };
        const response = await fetch(
            `https://codemaze-api.onrender.com/users/profile`,
            options
        );

        if (response.status ===200) {
            const data = await response.json();
            setProfileInfo(data)
            console.log(data)
        }else{
        throw new Error('Failed to fetch profile info');
        }
    }catch (error) {
        console.error(error)
    }
    };

    fetchData();

}, []);



  return (
    <h1>ProfileInfo</h1>
  )
}

export default ProfileInfo