/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UseProducts } from "../context/ProductsContext";
import { useNavigate, useLocation } from "react-router-dom";
import ItemPage from "../components/ItemPage";

const ProductsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPageNumber = Number(queryParams.get("page")) || 1; // Obtener el número de página del query string o establecerlo como 1 por defecto

  const {
    products,
    currentPage,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    getProducts,
    totalPages,
    errors: tokenError,
  } = UseProducts();

  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  useEffect(() => {
    getProducts(pageNumber);

    queryParams.set("page", pageNumber);
    navigate(`?${queryParams.toString()}`);
  }, [pageNumber]);

  const productList = products;

  const handlePrevPage = () => {
    setPageNumber((prev) => prev - 1);

    getProducts(prevPage);
    navigate(`?limit=10&page=${prevPage}`);
  };

  const handleNextPage = () => {
    setPageNumber((next) => next + 1);

    getProducts(nextPage);
    navigate(`?limit=10&page=${nextPage}`);
  };

  return (
    <div className="pt-20 container">
      {tokenError.status === 401 ? (
        <div>nada para mostrar</div>
      ) : (
        <>
          {productList?.payload.length === 0 ? (
            <p>No hay productos disponibles</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-10 pb-10">
              {productList?.payload.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-50 p-5 mt-5 rounded-lg shadow-md w-96 mx-auto"
                >
                  {/* agregar link */}
                  <ItemPage product={product} />
                </div>
              ))}
            </div>
          )}
          <div>
            {productList && (
              <nav
                className="pagination is-centered mt-6 mb-6 px-20"
                role="navigation"
                aria-label="pagination"
              >
                {hasPrevPage && (
                  <button
                    className="pagination-previous"
                    onClick={handlePrevPage}
                  >
                    Previous
                  </button>
                )}
                <ul className="pagination-list">
                  <li>
                    <a className="pagination-link" aria-label="Goto page 1">
                      {currentPage}
                    </a>
                  </li>
                  <p className="px-3">de</p>
                  <li>
                    <a className="pagination-link" aria-label="Goto page total">
                      {totalPages}
                    </a>
                  </li>
                </ul>

                {hasNextPage && (
                  <button className="pagination-next" onClick={handleNextPage}>
                    Next
                  </button>
                )}
              </nav>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
