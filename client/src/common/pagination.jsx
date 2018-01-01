import React from 'react';
import PropTypes from 'prop-types';

/**
 * @description defines Pagination component
 *
 * @param { props } props
 * @return { jsx } jsx
 */
const Pagination = ({ pageNumber, currentPaginatePage, onPaginateClick }) => {
  /**
   * @param { page } page
   * @return { jsx } jsx
   */
  const showList = page => (
    <li
      className="page-item"
      key={page}
      value={page}
      onClick={() => onPaginateClick(page)}
      className={currentPaginatePage === page ?
            'page-item active' : 'page-item'}
    >
      <a className="page-link" >{page}</a>
    </li>
  );
  /**
   * @description returns pagination base on pageNumber property
   * @return { jsx } jsx
   */
  const showPages = () => {
    const pages = [];
    for (let i = 1; i <= pageNumber; i += 1) {
      pages.push(showList(i));
    }
    return pages;
  };
  /**
   * @description renders pagination
   * @return { jsx } jsx
   */
  return (
    <div>
      <div className="profile-pagination">
        <nav aria-label="pagination-nav">
          <ul className="pagination">
            { showPages() }
          </ul>
        </nav>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  currentPaginatePage: PropTypes.number.isRequired,
  onPaginateClick: PropTypes.func.isRequired,
};

export default Pagination;
