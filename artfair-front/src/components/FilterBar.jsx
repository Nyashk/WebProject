const FilterBar = () => {
  const filters = ["Все", "AI рисунки", "Портреты", "Популярные", "Последние работы"];
  
  return (
    <div className="filter-bar">
      {filters.map((filter, index) => (
        <button key={index} className="filter-button">
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
