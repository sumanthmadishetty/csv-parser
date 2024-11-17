const Divider = ({ style = {} }) => {
    return (
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid #ccc',
          margin: '20px 0',
          ...style, // Allows custom styles if needed
        }}
      />
    );
  };
  
  export default Divider;