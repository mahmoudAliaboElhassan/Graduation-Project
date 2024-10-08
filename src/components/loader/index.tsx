import "./loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="page-loader">
        <div data-glitch="Loading..." className="glitch">
          Loading...
        </div>
      </div>
    </div>
  );
}

export default Loader;
