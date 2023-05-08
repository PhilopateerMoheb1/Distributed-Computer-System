import React, { useEffect, useState } from "react";
import axios from 'axios';
 
function  ImageUpload(props){

    const [selectedImage, setSelectedImage] = React.useState('');

 
    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
 
        fileReader.onload = (event) => {
            setSelectedImage(event.target.result)
            props.callback(event.target.result);
        }
        
    }
 
    return(
        <div>
            <div className="form-group mb-3">
                <label className="text-white">Select File</label>
                <input type="file" className="form-control" name="image" onChange={onFileChange} required/>
            </div>
        </div>
    )
}
 
export default ImageUpload;