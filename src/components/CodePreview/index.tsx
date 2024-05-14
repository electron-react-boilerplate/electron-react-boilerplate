import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { mountGCode } from 'integration/mount-gcode';

import { Part, ContourItem } from 'types/part';
import { CodeBlock } from './styles';

interface PreviewProps {
  contourId: ContourItem['id'];
}

const Preview: React.FC<PreviewProps> = ({ contourId }) => {
  const [gCodePreview, setGCodePreview] = useState<string>('');

  const contour = useSelector((state: { part: Part }) =>
    state.part.contours.find((c) => c.id === contourId),
  );

  useEffect(() => {
    if (contour) {
      setGCodePreview(`${mountGCode(contour)}`);
    }
  }, [contour]);

  return <CodeBlock>{gCodePreview}</CodeBlock>;
};

export default Preview;
