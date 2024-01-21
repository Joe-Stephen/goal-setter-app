import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { profileUpdate } from "../../features/auth/authSlice";


function Profile() {
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(()=>{},[dispatch, user, user.profileUrl])


    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");


    const uploadImage = (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "zsfhd9xd")
        data.append("cloud_name", "df4qw5lvy")
        console.log("the formdata===",data)
        fetch("https://api.cloudinary.com/v1_1/df4qw5lvy/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
                console.log("Set URL ====",data.url);
                dispatch(profileUpdate(data.url))
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <h1>Profile Page</h1>
            {console.log(" the user in the profile page===",user)}
            <img src={user?.profileUrl ? user.profileUrl : ''} alt="profile" height="100px"/>
            <h4>{user.name}</h4>
            <h4>{user.email}</h4>
            <h3>Upload Profile Picture</h3>
            <form>
                <div className="form-group">
                    <img src={url ? url : ''} alt="profile" height='250px'/> <br />
                </div>
                <div className="form-group">
                    <input type="file" name="profile" id="profile" onChange= {(e)=> setImage(e.target.files[0])}/>
                </div>
                <div className="form-group">
                    <button className="btn" onClick={uploadImage}>Upload!</button>
                </div>
            </form>
        </div>
    )
}

export default Profile