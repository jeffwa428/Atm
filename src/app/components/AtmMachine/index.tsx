import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import atmSignImg from '../../../assets/atm_sign.png';
import atmSystemImg from '../../../assets/systems.png';
import atmGrafImg from '../../../assets/graffiti.png';
import atmStickerGrafImg from '../../../assets/sticker_graf.png';
import AtmButton from '../AtmButton';
import AtmCardList from '../AtmCardList';
import { Account, Status } from '../../../types/atm.interface';
import { depositMoney, getAccountInfoFromPIN, withdrawMoney } from '../../../service/api';
import AtmStatusMessage from '../AtmStatusMessage';
import './index.scss';

const AtmMachine = () => {
  const [cardType, setCardType] = useState<number>(-1);
  const [currentStage, setCurrentStage] = useState<Status>(Status.WELCOME);
  const [userPinNum, setUserPinNum] = useState<number>();
  const [accountInfo, setAccountInfo] = useState<Account>();
  const [transactionAmount, setTransactionAmount] = useState<number>();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const pinInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (
      currentStage === Status.AUTHENTICATION ||
      currentStage === Status.GET_WITHDRAW ||
      currentStage === Status.GET_DEPOSIT
    ) {
      pinInputRef.current?.focus();
    }
  }, [currentStage]);

  const fetchAccountInfo = async () => {
    if (!userPinNum) return;

    const result = await getAccountInfoFromPIN(userPinNum || 0);
    if (result.status === 'success') {
      setAccountInfo(result.data);
      setCardType(result.data!.accountType);
      setCurrentStage(Status.ON_ENTER);
    } else {
      setCurrentStage(Status.NOT_FOUND);
    }
  };

  const doWithdrawMoney = async () => {
    if (!transactionAmount) return;

    const result = await withdrawMoney(userPinNum!, transactionAmount);
    if (result.status === 'success') {
      setAccountInfo(result.data);
      setTransactionAmount(undefined);
      setCurrentStage(Status.GET_BALANCE);
    } else {
      setCurrentStage(Status.ERROR);
      setErrorMsg(result.message || '');
    }
  }

  const doDepositMoney = async () => {
    if (!transactionAmount) return;

    const result = await depositMoney(userPinNum!, transactionAmount);
    if (result.status === 'success') {
      setAccountInfo(result.data);
      setTransactionAmount(undefined);
      setCurrentStage(Status.GET_BALANCE);
    } else {
      setCurrentStage(Status.NOT_FOUND);
    }
  }

  const handleActionItemClick = (stage: Status) => () => {
    setTransactionAmount(undefined);

    if (stage === Status.GET_BALANCE || stage === Status.GET_DEPOSIT || stage === Status.GET_WITHDRAW) {
      if (!accountInfo) {
        return;
      }
    }

    setCurrentStage(stage);

    switch (stage) {
      case Status.EXIT:
        setCurrentStage(Status.WELCOME);
        setAccountInfo(undefined);
        setUserPinNum(undefined);
        setCardType(-1);
        break;
      default:
        break;
    }
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    try {
      if (e.key === 'Enter') {
        setCurrentStage(Status.LOADING);
        switch (currentStage) {
          case Status.AUTHENTICATION:
            await fetchAccountInfo();
            break;
          case Status.GET_WITHDRAW:
            await doWithdrawMoney();
            break;
          case Status.GET_DEPOSIT:
            await doDepositMoney();
            break;
          default:
            break;
        }
      }
    } catch (e) {
      console.log(e);
      setCurrentStage(Status.ERROR);
      setErrorMsg('Error in ATM');
    }
  }

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
                onClick={handleActionItemClick(Status.GET_DEPOSIT)}
                direction='right'
                title='Deposit'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={handleActionItemClick(Status.GET_WITHDRAW)}
                direction='right'
                title='Withdraw'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={() => { }}
                direction='right'
              />
              <AtmButton
                onClick={() => { }}
                direction='right'
              />
            </div>

            <div className='display-panel'>
              <AtmStatusMessage stage={currentStage} account={accountInfo} />
              {
                currentStage === Status.AUTHENTICATION &&
                <input
                  ref={pinInputRef}
                  type='text'
                  className='panel-pin-input'
                  value={userPinNum || ''}
                  onChange={(e) => setUserPinNum(+e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              }
              {
                (currentStage === Status.GET_WITHDRAW || currentStage === Status.GET_DEPOSIT) &&
                <input
                  ref={pinInputRef}
                  type='text'
                  className='panel-pin-input'
                  value={transactionAmount || ''}
                  onChange={(e) => setTransactionAmount(+e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              }
              {
                currentStage === Status.GET_BALANCE &&
                <p className='panel-info'>{`Current Balance: ${accountInfo?.currency || ''}${accountInfo?.balance}`}</p>
              }
              {
                currentStage === Status.LOADING &&
                <p className='panel-info'>Loading...</p>
              }
              {
                currentStage === Status.ERROR &&
                <p className='panel-info'>{errorMsg}</p>
              }
              <img src={atmSystemImg} alt='System' />
            </div>

            <div className='action-items'>
              <AtmButton
                onClick={handleActionItemClick(Status.AUTHENTICATION)}
                title={currentStage === Status.WELCOME ? 'Enter PIN' : 'Re-Enter PIN'}
                showTitle={currentStage === Status.WELCOME || currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={handleActionItemClick(Status.GET_BALANCE)}
                title='Balance'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={handleActionItemClick(Status.EXIT)}
                title='Exit'
                showTitle={currentStage === Status.ON_ENTER}
              />
              <AtmButton
                onClick={() => { }}
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