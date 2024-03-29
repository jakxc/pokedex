const ProgressBar = ({ bgColor, fillColor, value }) => {
    const backgroundStyles = {
      height: "8px",
      width: "100%",
      backgroundColor: bgColor,
      borderRadius: 4,
    }
  
    const progressStyles = {
      height: '100%',
      width: `${(value / 255) * 100}%`,
      backgroundColor: fillColor,
      borderRadius: 'inherit',
    }
  
    return (
      <div style={backgroundStyles}>
        <div style={progressStyles}>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;
  