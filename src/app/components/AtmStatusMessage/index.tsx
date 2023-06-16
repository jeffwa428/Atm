import { Account, Status } from "../../../types/atm.interface";
import { PIN_NOT_CORRECT, WELCOME_MESSAGE } from "../../../utils/consts"
import './index.scss';

interface AtmStatusMessageProps {
  stage: Status;
  account?: Account;
}

const AtmStatusMessage = ({ stage, account }: AtmStatusMessageProps) => {
  return (
    <>
      {
        stage === Status.NOT_FOUND &&
        <p className='status-msg'>{PIN_NOT_CORRECT}</p>
      }
      {
        stage === Status.WELCOME &&
        <p className='status-msg'>{WELCOME_MESSAGE}</p>
      }
      {
        stage === Status.ON_ENTER &&
        <p className='status-msg1'>{`Hi, ${account?.firstName} ${account?.lastName}!`}<br/>Please make a choice...</p>
      }
    </>
  )
}

export default AtmStatusMessage;