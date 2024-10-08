import "./Slide.css"; // Make sure to create a corresponding CSS file for styling

const Slide = () => {
  return (
    <div className="slide">
      <div className="text-content">
        <button className="get-started-button">Get Started</button>
      </div>
      <div className="image-content">
        <img src="../../assets\img\Custom\brain.svg" alt="Brain Illustration" />
      </div>
    </div>
  );
};

export default Slide;
