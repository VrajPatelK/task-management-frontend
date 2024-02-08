import React, { useEffect, useState } from "react";
import "./ImageUpload.css";
import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

import toast from "react-hot-toast";
import firebaseConfig from "../../utils/firebase.js";
import ProfileImg from "../../components/ProfileImg";

import Upload from "../icons/UploadIcon.jsx";
import Delete from "../icons/Delete.jsx";
import RightLightArrow from "../icons/RightLightArrow.jsx";
import RightDarkArrow from "../icons/RightDarkArrow.jsx";
import Loader from "../icons/Loader.jsx";
import { defaultImageUrl } from "../../utils/vars.js";

const ImageUpload = ({
  onImageUpload = () => {},
  onImageRemove = () => {},
  imgUrl = "",
}) => {
  const [newImage, setNewImage] = useState({ url: undefined, name: undefined });
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    // use-effect is important otherwise when we remove the image, this client sode component will not get re-rendering frequently!
  }, [newImage.url, newImage]);

  const uploadOnFirebase = async (upload) => {
    // init firebase app
    const app = initializeApp(firebaseConfig);
    // get storage bucket at firebase
    const storage = getStorage(app);
    // ref
    const newName = `${Date.now()}.png`;
    const imageRef = ref(storage, `profile_images/${newName}`);
    setLoader(true);
    // upload
    uploadBytes(imageRef, upload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            //
            setNewImage({ url: url, name: newName });
            onImageUpload(url);
            //
            setTimeout(() => {
              setLoader(false);
              toast.success("image uploaded!");
            }, 1000);
          })
          .catch((error) => {
            setLoader(false);
            toast.error("error getting the image url!");
          });
      })
      .catch((error) => {
        setLoader(false);
        toast.error("image uplaod failure!");
      });
  };

  const removeImage = async () => {
    // init firebase app
    const app = initializeApp(firebaseConfig);
    // get storage bucket at firebase
    const storage = getStorage(app);
    // ref
    const desertRef = ref(storage, `profile_images/${newImage.name}`);
    setLoader(true);
    // delete
    deleteObject(desertRef)
      .then(() => {
        setNewImage({ url: undefined, name: undefined });
        onImageRemove();
        //
        setTimeout(() => {
          setLoader(false);
          toast.success("image removed!");
        }, 1000);
      })
      .catch((error) => {
        setLoader(false);
        toast.error("error in the image deletion!");
      });
  };

  //
  function handleImageChange(e) {
    const upload = e.target.files[0];
    uploadOnFirebase(upload);
  }

  return (
    <div>
      <div className="image-upload-div">
        {/* new image */}
        <div className="new-image-div">
          <ProfileImg src={imgUrl || defaultImageUrl} alt={"profileImg"} />
        </div>

        {/* arrows */}
        <div className="arrow-div">
          {!loader && (
            <>
              <RightLightArrow />
              <RightDarkArrow />
              <RightLightArrow />
            </>
          )}
          {loader && (
            <div role="status">
              <Loader />
            </div>
          )}
        </div>

        {/* upload new image */}
        <div
          className={`upload-new-image-div ${
            newImage.url ? "border-2 border-dashed" : ""
          }`}
        >
          {/* remove button */}
          {newImage.url && (
            <button
              type="button"
              className="rmv-btn delete-btn"
              onClick={removeImage}
            >
              <Delete />
            </button>
          )}

          <label
            htmlFor="dropzone-file"
            className={
              "flex flex-col items-center justify-center cursor-pointer rounded-lg"
            }
          >
            {/* here img */}
            {newImage.url && (
              <ProfileImg
                src={newImage.url || defaultImageUrl}
                alt={"profileImg"}
              />
            )}

            {!newImage.url && (
              // flex flex-col items-center justify-center p-2 rounded-lg  border-dashed shadow-2xl bg-gray-700
              <div className="click-to-upload-div">
                <Upload />
                <p className="click-to-upload-text">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="file-extension-text">(png, jpg)</p>
              </div>
            )}

            <input
              id="dropzone-file"
              name="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
