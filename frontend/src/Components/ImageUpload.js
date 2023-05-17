import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
 
function  ImageUpload(props){

    const [selectedImage, setSelectedImage] = React.useState('');

 
    const onFileChange = (e) => {
        let files = e.target.files;
        console.log(files);
        if(files[0].type.slice(0,5) !== "image"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Only image files are allowed",
              })
            e.target.value="";
        }
        else{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(files[0]);
    
            fileReader.onload = (event) => {
                setSelectedImage(event.target.result)
                props.callback(event.target.result);
            }
        }
    }
 
    return(
        <div>
            <div className="form-group mb-3">
                <label className="text-white">Select File</label>
                <input type="file" className="form-control" name="image" accept="image/*" onChange={onFileChange} required/>
            </div>
        </div>
    )
}
 
export default ImageUpload;