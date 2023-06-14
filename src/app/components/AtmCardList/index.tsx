import AtmCard from '../AtmCard';
import './index.scss';

interface AtmCardListProps {
  typeSelected: number;
}

const AtmCardList = ({ typeSelected }: AtmCardListProps) => {
  return (
    <div className='card-list'>
      {
        Array(6).fill(0).map((_, idx) => <AtmCard type={idx + 1} key={idx + 1} isActive={typeSelected === (idx + 1)} />)
      }
    </div>
  )
}

export default AtmCardList;