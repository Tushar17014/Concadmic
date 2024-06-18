// components imported from packages
import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

// components imported from custom file
import { excerpt } from "../utility";

// CSS imported
import "./Components.scss";

const BlogSection = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div>
      <div className="row pb-4" key={id}>
        <div className="col-md-5">
          <div className="hover-blogs-img">
            <div className="blogs-img">
              <img src={imgUrl} alt={title} />
              <div></div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="text-start">
            <h6 className="category catg-color text-white">{category}</h6>
            <span className="title py-2 text-white">{title}</span>
            <span className="meta-info text-white">
              <p className="author text-white">{author}</p> -&nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="short-description text-start text-white">
            {excerpt(description, 120)}
          </div>
          <Link to={`/detail/${id}`}>
            <button className="btn btn-read">Read More</button>
          </Link>
          {user && user.uid === userId && (
            <div style={{ float: "right" }}>
              <FontAwesome
                name="trash"
                style={{ margin: "15px", cursor: "pointer" }}
                size="2x"
                onClick={() => handleDelete(id)}
              />
              <Link to={`/update/${id}`}>
                <FontAwesome
                  name="edit"
                  style={{ cursor: "pointer" }}
                  size="2x"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
