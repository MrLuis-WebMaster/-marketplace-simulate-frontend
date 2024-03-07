import React from "react";

interface PaginatorProps {
    currentPage: number;
    totalPages?: number;
    onPageChange: (pageNumber: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages = 0, onPageChange }) => {
    return (
        <div className="flex justify-start my-4 items-center gap-1">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-500 hover:text-primary-600 focus:outline-none font-medium text-2xl"
            >
                <i className="bx bx-chevron-left"></i>
            </button>
            <div>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onPageChange(index + 1)}
                        className={`p-2 focus:outline-none ${currentPage === index + 1 ? "text-primary-600 font-bold" : "text-gray-500 hover:text-primary-600"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-500 hover:text-primary-600 focus:outline-none font-medium text-2xl"
            >
                <i className="bx bx-chevron-right"></i>
            </button>
        </div>
    );
};

export default Paginator;
