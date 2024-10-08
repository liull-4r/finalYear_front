import "./Video.css";
const Videosection = () => {
  const videoUrl = "https://www.youtube.com/embed/giLhieMCoI4";

  return (
    <section id="video-testimonial" className="video-testimonial">
      <div className="container">
        <div className="section-title">
          <h2>Testimonial</h2>
          <p className="text-center">
            Learn about the satisfaction of our past clients.
          </p>
        </div>

        <div className="video-wrapper">
          <iframe
            title="video"
            className="video-iframe"
            width="100%"
            height="500"
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Videosection;
