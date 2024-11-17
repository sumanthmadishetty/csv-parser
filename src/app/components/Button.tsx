interface IButtonProps {
    onClick: any;
    style?: any;
    children?: any
    
}

export default function Button({ style, ...props }: IButtonProps) {
    return (
        <button
        onClick={props.onClick}
        style={{
          padding: '10px 10px',
          background: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          height: '35px',
          textAlign: "center",
          lineHeight: "0px",
          ...(style ? style : {})
        }}
      >
        {props.children}
      </button>
    )
}