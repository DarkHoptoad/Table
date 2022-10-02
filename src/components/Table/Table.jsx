const Table = (props) => {
  const { items } = props; //Передача через пропсы нужных для отрисовки строк таблицы

  return (
    <table className="table">
      <thead>
        {" "}
        {/*Заголовки столбцов таблицы*/}
        <tr>
          <th>Дата</th>
          <th>Название</th>
          <th>Количество</th>
          <th>Расстояние</th>
        </tr>
      </thead>
      <tbody>
        {" "}
        {/*Тело таблицы*/}
        {items.map(
          (
            item //Отрисовка каждого элемента в таблице
          ) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.distance}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export { Table };
