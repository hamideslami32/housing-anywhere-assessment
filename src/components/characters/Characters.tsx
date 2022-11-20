import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Row, Col, Pagination, Spin } from 'antd';
import { axiosInstance } from '../../utils/hooks/useAxios';
import CharacterCard from './character-card/CharacterCard';
import { ICharacterBase, IInfo, TCharacter } from '../../interfaces';
import styles from './characters.module.scss';

export const UNUSED_KEYS = ['type', 'episode', 'created', 'gender', 'url'] as const;

const Characters = () => {
  const [charactersData, setCharactersData] = useState<IInfo<TCharacter> | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['chcracters', page],
    queryFn: () => axiosInstance.get(`character?page=${page}`),
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    // TODO: this should be refactored into a better way
    let newData;
    if (data?.data) {
      newData = data?.data.results.map((c: ICharacterBase): TCharacter => {
        for (let i = 0; i < UNUSED_KEYS.length; i++) {
          delete c[UNUSED_KEYS[i]];
        }
        return c;
      });
    }
    setCharactersData({ info: data?.data.info, results: newData });
  }, [data]);

  const paginationChangeHandler = (page: number) => {
    setPage(page);
  };

  return (
    <div className={styles.characters}>
      <h1>Rick & Morty Wiki</h1>
      <Row gutter={[16, 16]}>
        {!isLoading && Array.isArray(charactersData?.results) ? (
          charactersData?.results.map((char) => {
            return (
              <Col span={6} className="d-flex" key={char.id}>
                <CharacterCard character={char} />
              </Col>
            );
          })
        ) : (
          <div className={styles.loading}>
            <Spin className="" size="large" />
          </div>
        )}
      </Row>
      {charactersData?.info && (
        <div className={styles['characters__pagination']}>
          <Pagination
            defaultCurrent={1}
            total={charactersData.info.count}
            onChange={(page) => paginationChangeHandler(page)}
            showSizeChanger={false}
            pageSize={20}
          />
        </div>
      )}
    </div>
  );
};

export default Characters;
