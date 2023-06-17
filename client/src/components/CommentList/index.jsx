import React from 'react';
import { useMutation, gql } from '@apollo/client';
const REMOVE_COMMENT = gql`
  mutation RemoveComment($postId: ID!, $commentId: ID!) {
    removeComment(postId: $postId, commentId: $commentId)
  }
`;

const CommentList = ({ comments = [] }) => {
  const [removeCommentMutation] = useMutation(REMOVE_COMMENT);
console.log(comments)
  if (!comments.length) {
    return <h4
    className="card-header bg-black text-white p-2 m-0"
    >No Comments Yet</h4>;
  }
  const handleRemoveComment = (recipeId, commentId) => {
    removeCommentMutation({
      variables: { recipeId, commentId },
    })
      .then((response) => {
        alert (response)
        // Handle the response, update UI, etc.
      })
      .catch((error) => {
        alert (error)
        // Handle any errors that occurred during the mutation
      });
  };

  return (
    <>
      <h3
        className="p-3 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a'}}
      >
        Comments
      </h3>
      <div className="flex-row my-4 ">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {comment.commentAuthor} commented{' '}
                  <span style={{ fontSize: '0.825rem' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body">{comment.commentText}</p>
                <button onClick={() =>handleRemoveComment(comment.recipeId, comment._id)}>Remove Comment</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
