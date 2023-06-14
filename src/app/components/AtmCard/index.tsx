import './index.scss';

interface AtmCardProps {
  type: number;
  isActive: boolean;
}

const AtmCard = ({ type, isActive }: AtmCardProps) => {
  return (
    <div className={`card card-${type}-${isActive ? 'active' : 'inactive'}`} />
  )
}

export default AtmCard;