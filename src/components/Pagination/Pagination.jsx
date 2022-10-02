import { Link } from "react-router-dom";

const Pagination = ({ tablePerPage, totalRows, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRows / tablePerPage); i++) {
    pageNumbers.push(i);
  } //Вычисление количества страниц для пагинации
  return (
    <ul className="pagination">
      {pageNumbers.map(
        (
          number //Отрисовка страниц пагинации
        ) => (
          <li className="page-item" key={number}>
            <Link to="/" className="page-link" onClick={() => paginate(number)}>
              {number}
            </Link>
          </li>
        )
      )}
    </ul>
  );
};

export { Pagination };
