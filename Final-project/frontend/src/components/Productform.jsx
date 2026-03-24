import React from 'react';

const Productform = ({ formData, handleChange, handleSubmit, editId, handleCancel }) => {
  return (
    <div className='card shadow-sm border-0 mb-4'>
      <div className='card-body p-4'>
        <h4 className='text-center mb-4 font-weight-bold text-primary'>
          {editId ? 'Update Product' : 'Add Product'}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label className='font-weight-bold'>Product Name</label>
              <input
                type='text'
                className='form-control'
                name='name'
                value={formData.name}
                placeholder='Enter product name'
                onChange={handleChange}
              />
            </div>

            <div className='form-group col-md-6'>
              <label className='font-weight-bold'>Product Price</label>
              <input
                type='number'
                className='form-control'
                name='price'
                value={formData.price}
                placeholder='Enter product price'
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='d-flex align-items-center mt-2'>
            <button
              type='submit'
              className={`btn px-4 mr-2 ${editId ? 'btn-warning' : 'btn-success'}`}
            >
              {editId ? 'Update Product' : 'Add Product'}
            </button>

            {editId && (
              <button type='button' className='btn btn-danger px-4' onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Productform;
