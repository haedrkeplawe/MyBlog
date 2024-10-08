import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/UserContext";
import MainURL from "../MainURL";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(MainURL + "/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);
  if (!postInfo) return "";
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by {postInfo.author.username}</div>
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={"/edit/" + postInfo._id}>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={MainURL + "/" + postInfo.cover} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
};

export default PostPage;
