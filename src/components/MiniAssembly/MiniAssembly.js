import "./MiniAssembly.css";

const MiniAssembly = (props) => {
  return (
    <div className="mini-assembly">
      <p>Mini Assembly</p>
      {/* full size is 2400 x 3300 */}
      <canvas id="workTable" width="800" height="1100"></canvas>
    </div>
  );
};

export default MiniAssembly;
