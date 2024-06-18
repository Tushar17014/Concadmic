import React from "react";
import './Pages.scss';

function About() {
  return (
    <>
      <div className="service py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-11 mx-auto">
              <div className="mt-2 mb-5 text-center">
                <h1 className="service_heading">ABOUT US</h1>
              </div>
              <div className="row ">
                <div className="col-md-6 mt-md-2 m-0">
                  <span className="badge-info badge rounded-pill px-3 py-1 my-2 font-weight-light f">
                    <h3 className="head">About Concadmic</h3>
                  </span>
                  <h6 className="font-weight-light subtitle">
                  Concadmic is a comprehensive and a user-friendly platform where several blogs of experienced seniors along with all required academic resources are available and easily accessible to all the students of their particular college. It also serves as a networking platform where any student can easily reach out to their seniors or peers. Apart from the blogging feed and the academic resources section, there is an events section where all the upcoming college events of that college and other colleges will be posted.
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
