import React from "react";

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  paginate: any;
}> = (props) => {
  const pageNumbers: number[] = [];
  if (props.currentPage === 1) {
    pageNumbers.push(props.currentPage);
    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  } else if (props.currentPage > 1) {
    if (props.currentPage >= 3) {
      pageNumbers.push(props.currentPage - 2);
      pageNumbers.push(props.currentPage - 1);
    } else {
      pageNumbers.push(props.currentPage - 1);
    }
    pageNumbers.push(props.currentPage);

    if (props.totalPages >= props.currentPage + 1) {
      pageNumbers.push(props.currentPage + 1);
    }
    if (props.totalPages >= props.currentPage + 2) {
      pageNumbers.push(props.currentPage + 2);
    }
  }

  return (
      <div className="pagination-style mt-10 text-center">
        <ul>
          <li>
            <button   onClick={() => props.paginate(1)}>
              First Page
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li  key={number} className={props.currentPage === number ? "active" : ""} onClick={() => props.paginate(number)}>
              <button >{number}</button>
            </li>
          ))}
          <li
          >
            <button  onClick={() => props.paginate(props.totalPages)}>Last Page</button>
          </li> 
       
        </ul>
      </div>
  
  );
};

export default Pagination;
