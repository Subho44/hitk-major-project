import React from 'react'

const Producttable = ({ products, handleEdit, handleDelete }) => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <h4 className="text-center mb-4 fw-bold text-dark">All Products</h4>

        {products.length === 0 ? (
          <div className="alert alert-info text-center mb-0">
            No products found.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center mb-0">
              <thead className="thead-dark">
                <tr>
                  <th>SL No</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th width="180">Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>₹ {product.price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary mr-2"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Producttable