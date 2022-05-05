import React from "react";
import PropTypes from "prop-types";
import "semantic-ui-css/semantic.min.css";

const ArticleAuthor = ({name, avatar, content, avatarSize,avatarShape}) => {
  return (
    <div style={{ width: "960px", height: "auto" }}>
      <div className="item">
        <div className={`ui ${avatarSize} ${avatarShape} image left floated`}>
          <img
            src={avatar}
            alt="Avatar"
          />
        </div>
        <div className="content">
          <a className="header" href="#test">
            {name}
          </a>
          <div className="description">
            <p>
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

ArticleAuthor.propTypes = {
  name:PropTypes.string.isRequired,
  avatar:PropTypes.string,
  content:PropTypes.string.isRequired,
  avatarSize: PropTypes.oneOf(["mini", "tiny","small", "medium" ]).isRequired,
  avatarShape: PropTypes.oneOf(["square", "circular"])
};




export default ArticleAuthor;
