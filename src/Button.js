const Button = (props) => {
  return (
    <button
      onClick={() => props.onClick(props.value, props.type)}
      className={`calculator-button bg-${props.bg} `}
    >
      {props.value}
    </button>
  );
};

export default Button;
