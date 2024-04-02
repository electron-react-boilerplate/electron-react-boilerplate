import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Breadcrumbs from 'components/Breadcrumbs';
import { mountGCode } from 'integration/mount-gcode';

import { Part } from 'types/part';
import { Container, Content, Title, CodeBlock } from './styles';

const breadcrumbsItems = [
  {
    label: 'Preview',
    url: '/preview',
    isActive: true,
  },
];

const Preview: React.FC = () => {
  const [gCodePreview, setGCodePreview] = useState<string>('');

  const operations = useSelector((state: Part) => state.operations[0]);

  useEffect(() => {
    setGCodePreview(`${mountGCode(operations)}`);
  }, [operations]);

  return (
    <Container>
      <Breadcrumbs items={breadcrumbsItems} />
      <Content>
        <Title>Preview</Title>
        <CodeBlock>{gCodePreview}</CodeBlock>
      </Content>
    </Container>
  );
};

export default Preview;
