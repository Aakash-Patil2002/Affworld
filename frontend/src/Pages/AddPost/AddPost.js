import React, { useRef, useState } from "react";
import UploadImg from "../../helpers/UploadImg";
import style from "./AddPost.module.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function AddPost() {
  const [caption, setCaption] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const user = localStorage.getItem("user");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const upImgUrl = await UploadImg(file);
    setImgUrl(upImgUrl.secure_url);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendPost = async (e) => {
    e.preventDefault();
    if (!caption.trim() && !imagePreview) return;

    try {
      const response = await axios.post(
        "https://affworldtask.onrender.com/post",
        { caption, photoUrl: imgUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      alert(response.data.message);

      if (response) {
        setCaption("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {!user ? (
        <Navigate to="/login" />
      ) : (
        <main className={style.main}>
          <div className={style.postForm}>
            <h2 className={style.formHeading}>Create a Post</h2>

            {imagePreview && (
              <div className={style.previewContainer}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className={style.previewImage}
                />
                <button
                  onClick={removeImage}
                  className={style.removeBtn}
                  type="button"
                >
                  X
                </button>
              </div>
            )}

            <form onSubmit={handleSendPost}>
              <div className={style.inputGroup}>
                <label htmlFor="fileInput">Upload Image</label>
                <input
                  type="file"
                  id="fileInput"
                  className="d-none"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button
                  type="button"
                  className={style.uploadButton}
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select Image
                </button>
              </div>

              <div className={style.inputGroup}>
                <label htmlFor="captionInput">Caption</label>
                <input
                  type="text"
                  id="captionInput"
                  placeholder="Type a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>

              <button
                className={style.postButton}
                type="submit"
                disabled={!caption.trim() && !imagePreview}
              >
                Post Blog
              </button>
            </form>
          </div>
        </main>
      )}
    </>
  );
}

export default AddPost;
