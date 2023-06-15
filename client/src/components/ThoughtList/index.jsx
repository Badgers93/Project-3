import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtList = ({
  thoughts,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <div key={thought._id} className="card mb-4">
            <h4 style={{backgroundColor: 'black'} } className="card-header text-light p-4 m-0">
              {showUsername ? (
                <Link
                style={{color: 'white'}}
                  to={`/profiles/${thought.thoughtAuthor}`}
                >
                  {thought.thoughtAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                  {thought.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                  {thought.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div 
            style={{backgroundColor: 'white'}}
            className="card-body p-5 m-0">
              <p>{thought.thoughtText}</p>
            </div>
            <Link
            style={{backgroundColor: 'black'}}
              className="btn btn-primary btn-block btn-squared"
              to={`/thoughts/${thought._id}`}
            >
              Share your thoughts here
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ThoughtList;
