//#### IMPORTANT:--
//#### rafce
//#### only arrow function: nfn
//#### useState hook is like variable to store data
//#### To use localStorage, we have to add useEffect hook.
//#### useEffect Hook is to eliminate the side-effects of using class-based components.
//#### For example, tasks like updating the DOM, fetching data from API end-points, and
//#### setting up subscriptions or timers, etc can be lead to unwarranted side-effects.
//#### npm run start:dev

import React, { useState } from "react";
import noimage from "../../images/no-image.jpg"; // Tell webpack this JS file uses this image
import imageCompression from "browser-image-compression";
import "../stylesheets/Imagecompress.css"; // Import regular stylesheet

const ImageCompressor = () => {
  // step:1 :--- set initial state for users == blank array.
  const [orgImage, setOrgImage] = useState("");
  const [orgImageFile, setOrgImageFile] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [orgFileSize, setOrgFileSize] = useState("");

  // step:2 :- create handler (all info related to uploding image...)
  const handle = (e) => {
    const imageFile = e.target.files[0];
    setOrgImage(imageFile);
    setOrgImageFile(URL.createObjectURL(imageFile));
    setFileName(imageFile.name);
    setOrgFileSize(imageFile.size);
  };

  // console.log(orgImageFile+ "-one");
  console.log(orgFileSize+ "-two");

  // step:3 :- create handler for handleCompressImage
  const handleCompressImage = (e) => {
    e.preventDefault();

    // 1 nits // reffrence from npm browser-image-compression
    const options = {
      maxSizeMB: 1,
      //maxWidthOrHeight: 1920, // maxsize set
      maxWidthOrHeight: 500, // maxsize set
      useWebWorker:true,
    }

    if(options.maxSizeMB >= orgImage/1024){
      alert("image is to small, can't be compressed....");
      return 0
    }

    let output;
    imageCompression(orgImage,options).then( (x) => {
      output = x;
      const downloadLink = URL.createObjectURL(output);
      setCompressedImage(downloadLink); } 
    )
    console.log(compressedImage + " ", "compressedImage" );

    // 2 nits

  }

  
  return (
    <div className="container ImageCompressorPage">
      <div className="py-4">
        <h1 className="h4">JPG Image Compressor App </h1>
        <div className="shadow mt-3 p-2">
          <div className="row d-flex align-content-center flex-wrap justify-content-center ImageCompRow">
            <div className="col-lg-5 col-md-5 col-sm-12 col-12">

              {/* 1: preview image condition, if image select then preview otherwise else noimage show */}
              {
                orgImageFile ? ( <> <img src={orgImageFile} className="orgimg img-fluid shadow border" alt="original_image"/>  </> ) : ( <img src={noimage} className="orgimg img-fluid shadow border p-2" alt="noimage" /> )
              }

              {/* 1a: original image size is */}
              {
                orgImageFile ? ( <> <h5 className="mt-3 text-center"><span className="badge badge-warning p-2">Original Image size is :- {orgFileSize+" KB"} </span> </h5>  </> ) : ( <h5 className="mt-3 text-center"><span className="badge badge-warning p-2">Original Image size is :- Please select image. </span></h5>   )
              }

              <div className="uploadOrgimg">
                <div className="uploadOrgimgFilesize">
                  {/* <span className="badge badge-pill badge-warning">{imageFile.size}</span> */}
                </div>
                <div className="input-group pt-2 inputDnD">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Upload image</span>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input form-control-file"
                      id="inputFile" 
                      data-title="Drag and drop a file"
                      onChange={ (e) => handle(e) }
                    />
                    <label className="custom-file-label" htmlFor="inputFile">Choose file </label>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-12 d-flex align-content-center flex-wrap justify-content-center">
              <div className="d-flex align-content-center flex-wrap justify-content-center">
                {/* 2: preview Compress button condition, if image selected then preview Download btn otherwise hide */}
                {
                  orgImageFile && (<> <button onClick={ (e) => {handleCompressImage(e)} } type="button" className="btn btn-warning compressBtn">Compress image </button>  </>) 
                }

                {/* 3: preview Download button condition, if image selected then preview Download btn otherwise hide */}
                {
                  compressedImage && (<> <button type="button" className="btn btn-success downloadBtn"> <a href={compressedImage} download={fileName}> Download image </a> </button>  </>) 
                }
              </div>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 col-12">
              {/* 4: preview compressed Image condition, if compressed image show then preview otherwise else noimage show */}
              {
                compressedImage ? (<> <img src={compressedImage} className="compressimg img-fluid shadow border" alt="compress_image"/>  </> ) : ( <img src={noimage} className="orgimg img-fluid shadow border p-2" alt="noimage" /> )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
