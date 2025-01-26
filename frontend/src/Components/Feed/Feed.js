import React from "react";
import style from "./Feed.module.css";

const Feed = ({ posts }) => {
  return (
    <div className={`row ${style.feedContainer}`}>
      {posts.map((post) => (
        <div key={post._id} className="col-12 col-md-6 mb-4">
          <div className={style.card}>
            <img src={post.photoUrl} alt="Post" className={style.cardImage} />
            <div className={style.cardContent}>
              <p className={style.caption}>{post.caption}</p>
            </div>
            <div className={style.author}>
              <span>Posted By: {post.userDetails.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
