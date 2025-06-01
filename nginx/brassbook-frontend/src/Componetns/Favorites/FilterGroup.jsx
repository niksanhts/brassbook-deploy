import React from 'react';
import styles from './FilterGroup.module.css';
import { FilterButton } from './FilterButton';

const FilterGroup = () => {
  const filters = [
    {
      icon: 'alphabet_sort.svg',
      text: 'по алфавиту'
    },
    {
      icon: 'popular_sort.svg',
      text: 'по популярности'
    },
    {
      icon: 'duration_sort.svg',
      text: 'по длительности'
    }
  ];

  return (
    <div className={styles.filterGroup}>
      {filters.map((filter, index) => (
        <FilterButton
          key={index}
          icon={filter.icon}
          text={filter.text}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

export default FilterGroup;