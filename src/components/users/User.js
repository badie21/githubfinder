import React, { useEffect , useContext } from "react";
import Spinner from "../Layout/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/githubContext";

const User = ({match}) => {
  const githubContext = useContext(GithubContext)

  const {getUser , loading ,user , repos , getUserRepos} = githubContext

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);  
    // eslint-disable-next-line
  } , [])

    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gits,
      hireable,
      company,
    } = user;

    if (loading) {
      return <Spinner />;
    }
    return (
      <>
        <Link to="/" className="btn btn-light">
          back to search
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              className="round-img"
              style={{ width: "150px" }}
              alt=""
            />
            <h1>{name}</h1>
            <p>loacation :{location || 'no location'}</p>
          </div>
          <div>
            {bio && (
              <div>
                <h3>Bio</h3>
                <p>{bio}</p>
              </div>
            )}
            <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
            <ul>
              <li>
                {login && <div>
                  <strong>Username: </strong>{login}
                </div>}
              </li>
              <li>
                {company && <div>
                  <strong>Company: </strong>{company}
                </div>}
              </li>
              <li>
                {blog && <div>
                  <strong>Website: </strong>{blog}
                </div>}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">
            Followers: {followers}
          </div>
          <div className="badge badge-success">
            Following: {following}
          </div>
          <div className="badge badge-light">
            Public Repos: {public_repos}
          </div>
          <div className="badge badge-dark">
            Public Gits: {public_gits}
          </div>
        </div>
        <Repos repos={repos} />
      </>
    );
  }


export default User