import { CiMedicalCross } from "react-icons/ci";

import { GrSupport } from "react-icons/gr";
import { GrUserExpert } from "react-icons/gr";

import { PiBrainDuotone } from "react-icons/pi";
import { GrSecure } from "react-icons/gr";
import { FaDiagnoses } from "react-icons/fa";

import { MdMonitorHeart } from "react-icons/md";

function Values() {
  return (
    <section id="valuestwo" className="values">
      <h3 style={{ marginBottom: "20px" }}>Tumor Track Provides </h3>
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div className="box">
              <i>
                {" "}
                <PiBrainDuotone />
              </i>
              <h3>Advanced Tumor Detection</h3>
              {/* <p>
                Our team consists of seasoned experts who bring years of
                experience and wisdom to every project.
              </p> */}
            </div>
          </div>
          <div className="col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div className="box">
              <i>
                {" "}
                <MdMonitorHeart />
              </i>
              <h3>Continuous Monitoring</h3>
              {/* <p>
                Our team consists of seasoned experts who bring years of
                experience and wisdom to every project.
              </p> */}
            </div>
          </div>
          <div className="col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div className="box">
              <i>
                {" "}
                <GrSecure />
              </i>
              <h3>Secure Data Management</h3>
              {/* <p>
                Our team consists of seasoned experts who bring years of
                experience and wisdom to every project.
              </p> */}
            </div>
          </div>

          <div
            className="col-lg-3 mt-4 mt-lg-0"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="box">
              <i>
                <FaDiagnoses />
              </i>
              <h3>Personalised Diagnosis</h3>
              {/* <p>
                We prioritize students at the heart of everything we do,
                ensuring their needs are met with excellence.
              </p> */}
            </div>
          </div>

          <div
            className="col-lg-3 mt-4 mt-lg-0"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="box">
              <i>
                <GrSupport />
              </i>
              <h3>Patient Support</h3>
              {/* <p>
                Our commitment to integrity and reliability makes us a trusted
                partner you can rely on without hesitation.
              </p> */}
            </div>
          </div>
          <div
            className="col-lg-3 mt-4 mt-lg-0"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <div className="box">
              <i>
                <GrUserExpert />
              </i>
              <h3>Expert Consultations</h3>
              {/* <p>
                Our commitment to integrity and reliability makes us a trusted
                partner you can rely on without hesitation.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Values;
