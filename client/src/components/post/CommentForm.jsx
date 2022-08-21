import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("first");
    addComment(postId, { text });
    console.log("second");
    setText("");
  };

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Leave a Comment</h3>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="form my-1">
        <textarea
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="btn btn-dark btn-lg my-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
