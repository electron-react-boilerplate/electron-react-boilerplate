import React, { useEffect, useState } from 'react';

import { TooltipProps } from './interface';
import { Container } from './styles';

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return <Container className={loaded ? 'loaded' : ''}>{children}</Container>;
};

export default Tooltip;
