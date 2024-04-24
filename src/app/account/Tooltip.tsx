import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {isVisible && (
        <div style={{
          position: 'absolute',
          width: '120px',
          bottom: '100%',
          left: '50%',
          marginLeft: '-60px',
          backgroundColor: 'black',
          color: 'white',
          textAlign: 'center',
          padding: '5px 0',
          borderRadius: '6px',
          zIndex: 1
        }}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;