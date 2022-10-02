import { useEffect, useState } from "react"; //Импорт хуков
import Filter from "../components/Filter/Filter"; //Импорт компонента с фильтрацией таблицы
import { Pagination } from "../components/Pagination/Pagination"; //Импорт компонента с пагинацией
import { Preloader } from "../components/Preloader/Preloader"; //Импорт прелоадера
import { Table } from "../components/Table/Table"; //Импорт самой таблицы
import data from "../moke/data.json"; //Импорт базы данных

const Home = () => {
  const [loading, setLoading] = useState(true); //Для работы и отключения прелоадера
  const [items, setItems] = useState([]); //Массив с всеми элементами таблицы, используется для создания нового масива
  const [currentPage, setCurrentPage] = useState(1); //Стейт с номером начальной страницы на пагинации, по умолчанию страница 1
  const [tablePerPage] = useState(9); //Стейт с количеством строк на одной странице
  const [nameFilter, setNameFilter] = useState("name"); //Стейт, отвечающий за выбор колонки в Фильтрах
  const [filterType, setFilterType] = useState("same"); //Стейт, отвечающий за выбор способа фильтрации
  const [filterRows, setFilterRows] = useState([]); //Масив, по которому происходит рендер элементов страницы

  useEffect(() => {
    setItems(data.table); //Ложим элементы таблицы в стейт для модификаций
    setFilterRows(data.table); //Ложим элементы таблицы в стейт для рендера
    setLoading(false); //Прекращаем отрисовку прелоадера
  }, []);

  const lastItemIndex = currentPage * tablePerPage; //Вычисляем последнюю строку таблицы на текущей странице
  const firstItemIndex = lastItemIndex - tablePerPage; //Вычисляем первую строку таблицы на текущей странице
  const currentTablePage = filterRows.slice(firstItemIndex, lastItemIndex); //Вычисляем все строки таблицы текущей страницы

  const paginate = (number) => {
    setCurrentPage(number);
  }; //Функция для перехода по пашинации

  const handleFilter = (str) => {
    //Функция фильтрации
    if (nameFilter === "quantity") {
      //Проверка на выбор колонки "Количество"
      if (filterType === "asc") {
        //Проверка на выбор типа фильтрации "Больше чем"
        setFilterRows(
          items.filter((item) => {
            //Создаём новый масив для рендера через фильтр
            return item.quantity >= +str; //Возвращаем в масив только те строки, количество в которых больше или равно, чем число введённое пользователем
          })
        );
      } else {
        if (filterType === "desc") {
          //Проверка на выбор типа фильтрации "Меньше чем"
          setFilterRows(
            items.filter((item) => {
              //Создаём новый масив для рендера через фильтр
              return item.quantity <= +str; //Возвращаем в масив только те строки, количество в которых меньше или равно, чем число введённое пользователем
            })
          );
        } else {
          if (!str.length) {
            //Проверка на то, вводил ли пользователь что-то в текстовое поле
            setFilterRows(items); //Возвращаем все строки таблицы в стейт, если поле осталось пустым
          } else {
            setFilterRows(
              //Сработает в том случае, если выбран тип фильтрации "Равно", и пользователь что-либо ввёл в текстовое поле
              items.filter((item) => {
                //Создание нового масива для рендера с помощью фильтра
                // eslint-disable-next-line
                return item.quantity == +str; //Возвращаем в масив только те элементы из поля "Количество", которые равны введённому пользователем числу
              })
            );
          }
        }
      }
    } else {
      if (nameFilter === "distance") {
        //Проверка на выбор колонки "Дистанция"
        if (filterType === "asc") {
          //Проверка на выбор типа фильтрации "Больше чем"
          setFilterRows(
            items.filter((item) => {
              //Создание нового масива для отрисовки с помощью функции фильтр
              return item.distance >= +str; //Возвращаем в масив только те элементы таблицы, число в колонке "Дистанция" который больше или равно, чем введённое пользователем
            })
          );
        } else {
          if (filterType === "desc") {
            //Проверка на выбор типа фильтрации "Меьше чем"
            setFilterRows(
              items.filter((item) => {
                //Создание нового масива для отрисовки с помощью функции фильтр
                return item.distance <= +str; //Возвращаем в масив только те элементы таблицы, число в колонке "Дистанция" который меньше или равно, чем введённое пользователем
              })
            );
          } else {
            if (!str.length) {
              //Проверка на то, вводил ли пользователь что-то в текстовое поле
              setFilterRows(items); //Возвращаем все строки таблицы в стейт, если поле осталось пустым
            } else {
              setFilterRows(
                items.filter((item) => {
                  //Создание нового масива для отрисовки таблицы
                  // eslint-disable-next-line
                  return item.distance == +str;
                  //Возвращаем в масив только те элементы из поля "Дистанция", которые равны введённому пользователем числу
                })
              );
            }
          }
        }
      } else {
        //Срабатывает, если выбрана колонка "Название"
        setFilterRows(
          items.filter(
            (
              item //Создаём новый масив для отрисовки таблицы с помощью функции фильтр
            ) => item.name.toLowerCase().includes(str.toLowerCase()) //Переводим все символы, введённые пользователем и все символы в столбце "Название" в таблице к нижнему регистру и отрисовываем только те, в которых есть совпадения с строкой, введённой пользователем
          )
        );
      }
    }
  };

  const cleareFilter = () => {
    //Функция для очистки всех фильтров и возвращения стейта к изначальному состоянию
    setFilterRows(data.table);
  };

  return (
    //Начало отрисовки
    <div className="container">
      {!loading ? ( //Проверка на то, идёт ещё загрузка данных, или уже завершена
        <>
          <Filter
            handleFilter={handleFilter}
            cleareFilter={cleareFilter}
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            filterType={filterType}
            setFilterType={setFilterType}
          />{" "}
          {/*Отрисовывается компонент фильтров и через пропсы передаются в него функции фильтрации, очистки фильтров и стейты с названием столбца и типом фильтрации */}
          <Table items={currentTablePage} />
          {/*Компонент, в котором отрисовывается сама таблица и масив данных с элементами, которые должны отображаться на действующей странице */}
          <Pagination
            tablePerPage={tablePerPage}
            totalRows={filterRows.length}
            paginate={paginate}
          />{" "}
          {/*Компонент пагинации с переданной информацией об количестве строк, которые должны отрисовываться, об общем количестве строк и номере страницы */}
        </>
      ) : (
        <Preloader /> //Отрисовывается компонент прелоадера в том случае, если загрузка данных ещё не была завершена
      )}
    </div>
  );
};

export { Home };
