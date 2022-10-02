import React, { useState } from "react"; //Импорт хуков

const Filter = ({
  nameFilter,
  setNameFilter,
  handleFilter = Function.prototype,
  filterType,
  setFilterType,
  cleareFilter = Function.prototype,
}) => {
  //Принятие перекинутых пропсов функцией компонента фильтр
  const [visibleFilters, setVisibleFilters] = useState(false); //Стейт отвечающий за переключение отрисовки фильтров
  const [searchValue, setSearchValue] = useState(""); //Стейт, через который мы делаем текстовое поле управляемым компонентом и можем использовать введённую пользователем информацию

  const handleVisibleFilter = () => {
    //Функция "Переключатель" фильтров
    setVisibleFilters(!visibleFilters);
  };

  const handleNameFilterSelect = (e) => {
    //Функция, отвечающая за передачу выбора колонки, по которой идёт фильтрация в стейт
    setNameFilter(e.target.value);
  };

  const handleFilterTypeSelect = (e) => {
    //Функция, отвечающая за передачу выбора типа фильтрации в стейт
    setFilterType(e.target.value);
  };

  const handleKey = (e) => {
    //Функция, отвечающая за срабатывание фильтрации при нажатии кнопки "Enter"
    if (e.key === "Enter") {
      handleSumbit();
    }
  };

  const handleSumbit = () => {
    //Функция, которая передаёт информацию введённую пользователем в функцию фильтра
    handleFilter(searchValue);
  };

  const handleSearch = (e) => {
    //Функция, которая сохраняет введённую пользователем информацию
    setSearchValue(e.target.value);
  };

  return (
    <div>
      {!visibleFilters ? ( //Проверяет должны ли фильтры отрисовываться сейчас
        <button onClick={handleVisibleFilter}>Показать фильтры</button> //Если фильтры отрисовываться не должны, то отрисовывается только кнопка "Показать фильтры"
      ) : (
        //Отрисовывается в том случае, когда пользователь нажал на кнопку "Показать фильтры"
        <div>
          <button onClick={handleVisibleFilter}>Скрыть фильтры</button>{" "}
          {/*Закрывает фильтры*/}
          <ul>
            <li>
              Фильтровать по:{" "}
              <select value={nameFilter} onChange={handleNameFilterSelect}>
                {/*Элемент выпадающего списка, отвечает за выбор столбца таблицы */}
                <option value="name">Названию</option>
                <option value="quantity">Количеству</option>
                <option value="distance">Расстоянию</option>
                {/*Поля для выбора в выпадающем списке*/}
              </select>
            </li>
            <li>
              Тип фильтра:{" "}
              <select value={filterType} onChange={handleFilterTypeSelect}>
                {/*Элемент выпадающего списка, отвечает за выбор типа фильтрации*/}
                <option value="same">Равно</option>
                <option value="asc">Больше чем</option>
                <option value="desc">Меньше чем</option>
                {/*Поля для выбора в выпадающем списке*/}
              </select>
            </li>
            <input
              name="search"
              placeholder="search"
              onChange={handleSearch}
              value={searchValue}
              onKeyDown={handleKey}
            />{" "}
            {/*Текстовое поле*/}
            <button onClick={handleSumbit}>Фильтровать</button>
            {/*Кнопка, при клике на которую происходит фильтрация*/}
          </ul>
          <button onClick={cleareFilter}>Очистить фильтры</button>{" "}
          {/*Кнопка для очистки фильтров*/}
        </div>
      )}
    </div>
  );
};

export default Filter;
