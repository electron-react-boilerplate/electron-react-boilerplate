import React from 'react';

import bg from '../../../assets/images/machine.jpg';
import { Container, Content } from './styles';

const OffPage: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={bg} alt="Background" />
      </Content>
    </Container>
  );
};

export default OffPage;
