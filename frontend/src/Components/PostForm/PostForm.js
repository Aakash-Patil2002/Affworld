import React, { useState } from "react";
import UploadImg from "../../helpers/UploadImg";
import style from "./PostForm.module.css";
import axios from "axios";

function PostForm() {
  const [caption, setCaption] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

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
  };

  const handleSendPost = async (e) => {
    e.preventDefault();
    if (!caption.trim() && !imagePreview) return;

    axios
      .post(
        "https://affworldtask.onrender.com/post",
        { caption, photoUrl: imgUrl, author, date },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((isPosted) => {
        alert(isPosted.data.message);
        if (isPosted) {
          setCaption("");
          setImagePreview(null);
          setAuthor("");
          setDate("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={`p-3 w-100 ${style.postForm}`}>
      <h2 className={style.formHeading}>Create New Post</h2>
      <form onSubmit={handleSendPost}>
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

        <div className={style.inputGroup}>
          <label htmlFor="imageInput">Upload Image</label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            className={style.imageInput}
            onChange={handleImageChange}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            id="caption"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Author name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className={style.inputGroup}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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

  );
}

export default PostForm;
