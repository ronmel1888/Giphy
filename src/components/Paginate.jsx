import React from "react";

const Paginate = (props) => {

    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(props.totalItems / props.itemPerPage); index++) {
        
        pageNumbers.push(index);

    }

    return <nav>
        <ul className="pagination pagination-sm justify-content-end border-0">
            {pageNumbers.map(number => {
                let classes = "page-item"
                if (number == props.currentPage) {
                    classes += "active"
                }
                return (
                    <li className={classes}>
                        <a onClick={() => props.pageSelected(number)}
                            href="!#"
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                )
            })}
        </ul>
    </nav>
}
export default Paginate