import { Badge } from 'antd';
import { useMemo } from 'react';
import { TCharacter } from '../../../interfaces';
import styles from './character-card.module.scss';

interface ICharacterCardProps {
  character: TCharacter;
}
const CharacterCard = ({ character }: ICharacterCardProps) => {
  const statusColor = useMemo(() => {
    let color;
    switch (character.status) {
      case 'Alive':
        color = 'green';
        break;
      case 'Dead':
        color = 'red';
        break;
      case 'unknown':
        color = 'gray';
        break;
    }
    return color;
  }, [character.status]);

  return (
    <div className={styles.characterCard}>
      <div className={styles['characterCard__image']}>
        <Badge.Ribbon text={character.status} color={statusColor}>
          <img src={character.image} alt={character.name} loading="lazy" />
        </Badge.Ribbon>
      </div>
      <div className={styles['characterCard__info']}>
        <div>{character.name}</div>
        <div>
          Origin: <span>{character.origin.name}</span>
        </div>
        <div>
          Location: <span>{character.location.name}</span>
        </div>
        <div>
          Species: <span>{character.species}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
