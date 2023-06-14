import { useState } from 'react';
import './index.scss';
import atmSignImg from '../../../assets/atm_sign.png';
import atmSystemImg from '../../../assets/systems.png';
import atmGrafImg from '../../../assets/graffiti.png';
import atmStickerGrafImg from '../../../assets/sticker_graf.png';
import AtmButton from '../AtmButton';
import AtmCardList from '../AtmCardList';
import { Status } from '../../../types/atm.interface';

const AtmMachine = () => {
  const [cardType, setCardType] = useState<number>(-1);
  const [currentStage, setCurrentStage] = useState<Status>(Status.WELCOME);

  return (
    <div className='atm-machine-wrapper'>
      <div className='atm-machine-header'>
        <img src={atmSignImg} className='sign-img' alt='Atm Sign' />
        <img src={atmGrafImg} className='graf-img' alt='Graf' />
      </div>

      <div className='atm-machine-body'>
        <div className='divider' />

        <div className='content-wrapper'>
          <AtmCardList typeSelected={cardType} />

          <div className='board-wrapper'>
            <div className='action-items'>
              <AtmButton
                onClick={() => {}}
                direction='right'
                title='Deposit'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={() => {}}
                direction='right'
                title='Withdraw'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={() => {}}
                direction='right'
              />
              <AtmButton
                onClick={() => {}}
                direction='right'
              />
            </div>
            <div className='display-panel'>
              <img src={atmSystemImg} alt='System' />
            </div>
            <div className='action-items'>
              <AtmButton
                onClick={() => {}}
                title='Enter PIN'
                showTitle={currentStage === Status.WELCOME || currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={() => {}}
                title='Balance'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={() => {}}
                title='Exit'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={() => {}}
              />    
            </div>

            <img src={atmStickerGrafImg} className='sticker-graf-img' alt='Sticker Graf' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AtmMachine;