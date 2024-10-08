import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

function WhySection() {
  return (
    <section id="what-we-do" className="what-we-do">
      <div className="container" data-aos="zoom-out-right">
        <div className="section-title">
          <h2>Why Blackrock?</h2>
          <p className="what-we-do-p">
            Wait! Do we even need to tell you about us? Surely, you're already
            aware of our distinctiveness, aren't you? However, there are some
            things you may not know about, just a click away.
          </p>
          <div className="text-center text-lg-start">
            <Link
              to="https://www.tiktok.com/@blackrocksolutionsplc"
              target="_blank"
              className="btn-read-more d-inline-flex align-items-center justify-content-center align-self-center"
            >
              <span>Learn More</span>
              <i>
                <FaArrowRightLong />
              </i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySection;
