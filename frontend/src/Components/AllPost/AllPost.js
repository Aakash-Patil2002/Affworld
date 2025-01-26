import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Feed from '../Feed/Feed';
import style from './AllPost.module.css';

function AllPost() {
  const [posts, setPosts] = useState('');
  useEffect(() => {
    axios.get("https://affworldtask.onrender.com/allpost").then((posts) => {
      setPosts(posts.data)
    }).catch((error) => {
      console.log(error);
    })
  }, []);
  return (
    <>
      <div className={style.container}>
        <div className='container'>
          {
            posts && <Feed posts={posts} />
          }
        </div>
      </div>
    </>
  )
}

export default AllPost;
