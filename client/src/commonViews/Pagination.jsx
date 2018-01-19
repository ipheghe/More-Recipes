import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

/**
 * @description defines Pagination component
 *
 * @param { props } props
 *
 * @return { jsx } jsx
 */
const Pagination = ({ pageNumber, onPaginateClick }) =>
  (
    <div>
      <div className="profile-pagination">
        <nav aria-label="pagination-nav">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel={<a href="">...</a>}
            breakClassName="break-me"
            pageCount={pageNumber}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPaginateClick}
            containerClassName="pagination justify-content-center"
            subContainerClassName="page-item"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item page-link"
            nextClassName="page-item page-link"
            activeClassName="active"
          />
        </nav>
      </div>
    </div>
  );
Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  onPaginateClick: PropTypes.func.isRequired,
};

export default Pagination;
