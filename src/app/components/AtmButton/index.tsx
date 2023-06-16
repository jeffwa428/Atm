import './index.scss';

interface AtmButtonProps {
  title?: string;
  showTitle?: boolean;
  direction?: string;
  onClick: () => void;
}

const AtmButton = ({ title = '', direction = 'left', onClick, showTitle = false }: AtmButtonProps) => {
  return (
    <div className={`atm-button-wrapper ${direction}`}>
      <button className='atm-button' onClick={onClick} title={title} />
      {
        showTitle &&
        <p className={`atm-button-title ${direction}`}>{title}</p>
      }
    </div>
  )
}

export default AtmButton;