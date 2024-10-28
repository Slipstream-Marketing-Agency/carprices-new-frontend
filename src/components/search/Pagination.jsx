const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageLimit = 10;

    const getPageNumbers = () => {
        const pages = [];
        const startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
        const endPage = Math.min(startPage + pageLimit - 1, totalPages);

        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push("...");
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push("...");
            }
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center items-center mt-6 space-x-2">
            <button
                className={`px-3 py-1 border ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <span key={index} className="px-3 py-1">...</span>
                ) : (
                    <button
                        key={page}
                        className={`px-3 py-1 border ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            <button
                className={`px-3 py-1 border ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
