import React from 'react';

export default function renderIcon(name, theme) {
  const fill = theme === 'light' ? '#ffffff' : '#000000';
  const stroke = theme === 'light' ? '#000000' : '#ffffff';
  const grayscale = theme === 'dark' ? '#ffffff' : '#ddd';
  switch (name) {
    case 'punchCard':
      return (
        <svg className="nav-icon" x="0px" y="0px" viewBox="0 0 151 209.51" width='40px' height='36px'>
          <title>Punch Card</title>
          <g>
            <path
              d="M117.4,27.7c-8.66-8-16.71-17-22.72-27.2H24.44A24,24,0,0,0,.5,24.44V185.07A24,24,0,0,0,24.44,209H126.56a24,24,0,0,0,23.94-23.94V52.38A195.7,195.7,0,0,1,117.4,27.7Z"
              fill={stroke}
              />
            <rect x="79.97" y="56.88" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="26.9" y="56.88" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="106.88" y="82.95" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="53.8" y="82.95" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="106.88" y="109.01" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="80.34" y="109.01" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="27.26" y="109.01" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="80.34" y="135.07" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="53.8" y="135.07" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="27.26" y="135.07" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="106.51" y="161.14" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="80.34" y="161.14" width="13.83" height="13.83" stroke={stroke} fill={fill} />
            <rect x="53.8" y="161.14" width="13.83" height="13.83" stroke={stroke} fill={fill} />

          </g>
        </svg>
      );
    case 'settings':
      return (
        <svg className="nav-icon" id="Capa_1" x="0px" y="0px" viewBox="0 0 54 54" width="40px" height="36px">
          <g>
            <path d="M27,13c-7.72,0-14,6.28-14,14s6.28,14,14,14s14-6.28,14-14S34.72,13,27,13z M27,39c-6.617,0-12-5.383-12-12s5.383-12,12-12   s12,5.383,12,12S33.617,39,27,39z" fill={stroke} />
            <path d="M51.22,21h-2.018c-0.515-1.912-1.272-3.742-2.26-5.457l1.426-1.426c0.525-0.525,0.814-1.224,0.814-1.966   c0-0.743-0.289-1.441-0.814-1.967l-4.553-4.553c-1.05-1.049-2.881-1.051-3.933,0l-1.426,1.426C36.74,6.07,34.911,5.313,33,4.798   V2.78C33,1.247,31.753,0,30.22,0H23.78C22.247,0,21,1.247,21,2.78v2.018c-1.911,0.515-3.74,1.272-5.457,2.26l-1.426-1.426   c-1.051-1.052-2.883-1.05-3.933,0l-4.553,4.553c-0.525,0.525-0.814,1.224-0.814,1.967c0,0.742,0.289,1.44,0.814,1.966l1.426,1.426   C6.07,17.258,5.312,19.088,4.798,21H2.78C1.247,21,0,22.247,0,23.78v6.439C0,31.753,1.247,33,2.78,33h2.018   c0.515,1.911,1.272,3.74,2.26,5.457l-1.426,1.426c-0.525,0.525-0.814,1.224-0.814,1.966c0,0.743,0.289,1.441,0.814,1.967   l4.553,4.553c1.05,1.051,2.882,1.052,3.933,0l1.426-1.426c1.717,0.987,3.546,1.745,5.457,2.26v2.018c0,1.533,1.247,2.78,2.78,2.78   h6.439c1.533,0,2.78-1.247,2.78-2.78v-2.018c1.911-0.515,3.74-1.272,5.457-2.26l1.426,1.426c1.052,1.052,2.882,1.05,3.933,0   l4.553-4.553c0.525-0.525,0.814-1.224,0.814-1.967c0-0.742-0.289-1.44-0.814-1.966l-1.426-1.426   c0.987-1.717,1.745-3.546,2.26-5.457h2.018c1.533,0,2.78-1.247,2.78-2.78V23.78C54,22.247,52.753,21,51.22,21z M52,30.22   C52,30.65,51.65,31,51.22,31h-3.592l-0.18,0.773c-0.521,2.237-1.399,4.36-2.613,6.311l-0.42,0.674l2.539,2.539   c0.305,0.305,0.305,0.8,0,1.104l-4.553,4.553c-0.304,0.304-0.799,0.306-1.104,0l-2.539-2.539l-0.674,0.42   c-1.95,1.214-4.073,2.093-6.311,2.613L31,47.628v3.592C31,51.65,30.65,52,30.22,52H23.78C23.35,52,23,51.65,23,51.22v-3.592   l-0.773-0.18c-2.237-0.521-4.36-1.399-6.311-2.613l-0.674-0.42l-2.539,2.539c-0.306,0.306-0.801,0.304-1.104,0l-4.553-4.553   c-0.305-0.305-0.305-0.8,0-1.104l2.539-2.539l-0.42-0.674c-1.214-1.95-2.093-4.073-2.613-6.311L6.372,31H2.78   C2.35,31,2,30.65,2,30.22V23.78C2,23.35,2.35,23,2.78,23h3.592l0.18-0.773c0.521-2.238,1.399-4.361,2.613-6.311l0.42-0.674   l-2.539-2.539c-0.305-0.305-0.305-0.8,0-1.104l4.553-4.553c0.304-0.304,0.799-0.306,1.104,0l2.539,2.539l0.674-0.42   c1.95-1.214,4.073-2.093,6.311-2.613L23,6.372V2.78C23,2.35,23.35,2,23.78,2h6.439C30.65,2,31,2.35,31,2.78v3.592l0.773,0.18   c2.237,0.521,4.36,1.399,6.311,2.613l0.674,0.42l2.539-2.539c0.306-0.306,0.801-0.304,1.104,0l4.553,4.553   c0.305,0.305,0.305,0.8,0,1.104l-2.539,2.539l0.42,0.674c1.214,1.949,2.093,4.072,2.613,6.311L47.628,23h3.592   C51.65,23,52,23.35,52,23.78V30.22z" fill={stroke} />
            <path d="M27,17c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S32.514,17,27,17z M27,35c-4.411,0-8-3.589-8-8s3.589-8,8-8   s8,3.589,8,8S31.411,35,27,35z" fill={stroke} />
          </g>
        </svg>

      );
    case 'help':
      return (
        <svg class="nav-icon" x="0px" y="0px" viewBox="0 0 52 52" width="40px" height="36px">
          <g>
            <path d="M26,0C11.663,0,0,11.663,0,26s11.663,26,26,26s26-11.663,26-26S40.337,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" fill={stroke} />
            <path d="M26,37c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1s1-0.447,1-1v-2C27,37.447,26.553,37,26,37z" fill={stroke} />
            <path d="M26.113,9.001C26.075,9.001,26.037,9,25.998,9c-2.116,0-4.106,0.815-5.615,2.304C18.847,12.819,18,14.842,18,17   c0,0.553,0.447,1,1,1s1-0.447,1-1c0-1.618,0.635-3.136,1.787-4.272c1.153-1.137,2.688-1.765,4.299-1.727   c3.161,0.044,5.869,2.752,5.913,5.913c0.029,2.084-0.999,4.002-2.751,5.132C26.588,23.762,25,26.794,25,30.158V33   c0,0.553,0.447,1,1,1s1-0.447,1-1v-2.842c0-2.642,1.276-5.105,3.332-6.432c2.335-1.506,3.706-4.063,3.667-6.84   C33.939,12.599,30.401,9.061,26.113,9.001z" fill={stroke} />
          </g>
        </svg>

      );
    case 'printout':
      return (
        <svg viewBox="0 0 90 120" width="40px" height="36px">
          <title>printout</title>
          <g>
            <rect x="0" y="0" width="90" height="120" fill={grayscale} stroke={stroke} />
            <rect x="0" y="0" width="90" height="20" fill='#b8d877' stroke='#fff' />
            <rect x="0" y="40" width="90" height="20" fill='#b8d877' stroke='#fff' />
            <rect x="0" y="80" width="90" height="20" fill='#b8d877' stroke='#fff' />
            <rect x="0" y="0" width="16" height="120" fill='none' stroke='#231f20' />
            <rect x="74" y="0" width="16" height="120" fill='none' stroke='#231f20' />
            <circle cx="8" cy="10" r="5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="30" r="5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="50" r="5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="70" r="5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="90" r="5" fill={fill} stroke={stroke} />
            <circle cx="8" cy="110" r="5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="10" r="5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="30" r="5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="50" r="5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="70" r="5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="90" r="5" fill={fill} stroke={stroke} />
            <circle cx="82" cy="110" r="5" fill={fill} stroke={stroke} />
          </g>
        </svg>
      )
    case 'mainframe':
      return (
        <svg viewBox="0 0 280.14 384.55" width="40px" height="36px">
          <title>mainframe</title>
          <g id="Layer_1-2" data-name="Layer 1">
            <rect x="2" y="39.5" width="276.14" height="343.05" fill='#999' stroke='#000' strokeWidth='4px' />
            <line x1="2" y1="110" x2="278.14" y2="110" fill='none' stroke='#231f20' strokeWidth='4px' />
            <line x1="147.27" y1="39.5" x2="149.1" y2="110" fill='none' stroke='#231f20' strokeWidth='4px' />
            <line x1="226.64" y1="39.5" x2="226.64" y2="110" fill='none' stroke='#231f20' strokeWidth='4px' />
            <line x1="2" y1="300.86" x2="278.14" y2="300.86" fill='none' stroke='#231f20' strokeWidth='4px' />
            <line x1="186.5" y1="382.55" x2="186.5" y2="301.86" fill='none' stroke='#231f20' strokeWidth='4px' />
            <line x1="53.69" y1="110" x2="53.14" y2="300.86" fill='none' stroke='#231f20' strokeWidth='4px' />
            <rect x="39.5" y="2" width="203.41" height="26.14" fill='#cccccb' stroke='#231f20' strokeWidth='4px' />
            <line x1="92.91" y1="39.5" x2="92.91" y2="28.14" fill='none' stroke='#231f20' strokeWidth='4px' />
            <line x1="183.91" y1="40.5" x2="183.91" y2="29.14" fill='none' stroke='#231f20' strokeWidth='4px' />
            <rect x="39.5" y="57.68" width="69.32" height="28.41" fill='#fff' stroke='#231f20' strokeWidth='4px' />
            <line x1="74.16" y1="86.09" x2="92.91" y2="64.5" fill='none' stroke='#231f20' strokeWidth='4px' />
            <rect x="199.73" y="329" width="19.89" height="19.89" fill='#39b54a' stroke='#231f20' strokeWidth='4px' />
            <rect x="242.91" y="329" width="19.89" height="19.89" fill='#ed1c24' stroke='#231f20' strokeWidth='4px'/>
            <rect x="67.91" y="129.27" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px' />
            <rect x="67.91" y="152" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="173.75" y="129.27" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="173.75" y="152" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px' />
            <rect x="173.75" y="175.8" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="173.75" y="199.59" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="68.17" y="175.8" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px' />
            <rect x="68.17" y="199.59" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="67.91" y="222.07" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="173.75" y="222.07" width="92.05" height="11.36" fill='#231f20' stroke='#231f20' strokeWidth='4px' />
            <rect x="67.91" y="245.33" width="197.89" height="5.68" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="67.91" y="261.6" width="197.89" height="5.68" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
            <rect x="67.91" y="277.86" width="197.89" height="5.68" fill='#231f20' stroke='#231f20' strokeWidth='4px' />
            <circle cx="253.14" cy="75.86" r="10.23" fill='#666766' stroke='#231f20' strokeWidth='4px'/>
            <circle cx="204.7" cy="62.65" r="4.97" stroke='#231f20' strokeWidth='4px' />
            <circle cx="204.7" cy="85.65" r="4.97" stroke='#231f20' strokeWidth='4px' />
            <circle cx="184.7" cy="85.65" r="4.97" stroke='#231f20' strokeWidth='4px' />
            <circle cx="164.42" cy="85.65" r="4.97" stroke='#231f20' strokeWidth='4px' />
            <rect x="130.41" y="314.5" width="43.32" height="51.59" fill='#999' stroke='#fff' strokeWidth='4px' />
            <rect x="83.53" y="327" width="31.03" height="39.09" fill='#999' stroke='#fff' strokeWidth='4px'/>
            <circle cx="99.05" cy="337.95" r="4.97" stroke='#231f20' strokeWidth='4px'/>
            <circle cx="99.05" cy="355.43" r="4.97" stroke='#231f20' strokeWidth='4px' />
            <rect x="14.5" y="340.95" width="53.41" height="10.65" fill='#231f20' stroke='#231f20' strokeWidth='4px'/>
          </g>
        </svg>
      )
  }
}


// <div>Icons made by <a href="http://www.flaticon.com/authors/madebyoliver" title="Madebyoliver">Madebyoliver</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>