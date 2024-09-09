import React, { useEffect, useState } from 'react';
import useInactivityRedirect from '../../components/Scripts/useInactivityRedirect';
import LastNews from '../../components/LastNews/LastNews';

function News() {
  useInactivityRedirect();
  return (
    <div>
      <LastNews />
    </div>
  );
}

export default News;
