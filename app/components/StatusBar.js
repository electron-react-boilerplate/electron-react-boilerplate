import React from 'react';
import Indicator from './Indicator';
import { renderIndicator } from '../utils/renderIcon';
import { View } from 'react-desktop/windows';
import { testIndicators } from '../utils/nativeDialogs';

export default function (props) {
  return (
    <View
      style={{
        bottom: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: '10'
      }}
      background='#aaa'
      width='100%'
      height='50px'
      overflow='hidden'
      >

      <button
        style={{
          backgroundColor: '#C0101D',
          border: 'none',
          color: 'white',
          margin: '4px',
          width: '90px',

        }}
        >
        INTERRUPT
      </button>

      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'

        }}
        >
        CONN
        <br />
        <div
          style={{
            marginLeft: '10px',
            marginTop: '3px'
          }}
          >
          <Indicator
            isLit={props.isConnected}
            isBlinking={props.currentStep === 'connecting' ? true : false}
            />
        </div>
      </div>



      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'
        }}
        >
        SENT
        <br />
        <div
          style={{
            marginLeft: '9px',
            marginTop: '3px'
          }}
          >
          <Indicator
            isLit={props.isSubmitted}
            isBlinking={props.currentStep === 'submitting' ? true : false}
            />
        </div>
      </div>






      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'
        }}
        >
        RETR
        <br />
        <div
          style={{
            marginLeft: '9px',
            marginTop: '3px'
          }}
          >
          <Indicator
            isLit={props.isRetrieved}
            isBlinking={props.currentStep === 'retrieving' ? true : false}
            />
        </div>
      </div>




      <div
        style={{
          fontSize: '10px',
          marginTop: '8px',
          marginLeft: '10px',
          color: 'black',
          width: '30px'
        }}
        >
        DISC
        <br />
        <div
          style={{
            marginLeft: '7px',
            marginTop: '3px'
          }}
          >
          <Indicator
            isLit={props.isDisconnected}
            isBlinking={props.currentStep == 'disconnecting' ? true : false}
            />
        </div>
      </div>


      <button
        style={{
          backgroundColor: '#195DAE',
          border: 'none',
          color: 'white',
          margin: '4px',
          marginLeft: '10px',
          width: '90px'
        }}
        onClick={(evt) => {
          console.log('LOAD');
          testIndicators()
        } }
        >
        LOAD
          </button>
    </View >
  )
}