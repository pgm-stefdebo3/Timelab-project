import React from 'react';


type SVGButtonProps = {
    small?: boolean,
    onClick: () => void,
    children: React.ReactNode,
}

// Children can contain anything but this component is made for it to contain a SVG
const SVGButton: React.FC<SVGButtonProps> = (props: SVGButtonProps) => {
  return (
    <button className={props.small? 'button--svg button--svg--small': 'button--svg'} onClick={props.onClick}>
        {props.children}
    </button>
  );
};

export default SVGButton;