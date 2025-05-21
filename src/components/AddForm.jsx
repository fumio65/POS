import React, { useState, useRef } from 'react';

function AddForm() {
  const [imagePreview, setImagePreview] = useState("/images/default-placeholder.svg");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSelection = (e, setSelected, currentSelected) => {
    const value = e.target.value;
    if (value !== "1" && !currentSelected.includes(value)) {
      setSelected([...currentSelected, value]);
    }
    // Reset select to default
    e.target.value = "1";
  };

  const removeItem = (itemToRemove, setSelected, currentSelected) => {
    setSelected(currentSelected.filter(item => item !== itemToRemove));
  };

  return (
    <div
      style={{ gridArea: 'add-form' }}
      className={'rounded-lg bg-white px-2 py-4 flex justify-start flex-col gap-3'}
    >
      <div className='flex justify-center items-center flex-col gap-2'>
        <img 
          className='h-40 w-40 border-2 border-border rounded-xl object-cover'
          src={imagePreview} 
          alt="Product preview" 
          onClick={triggerFileInput}
          style={{ cursor: 'pointer' }}
        />
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className='flex flex-col gap-4 min-h-[338px] max-h-[338px] overflow-y-auto'>
        <div className='flex flex-col gap-1'>
          <p className='w-90 font-bold text-sm'>Product Name:</p>
          <input className='border-2 border-border h-10 rounded-lg px-2'
          type="text" placeholder='Enter the product name' />
        </div>

        <div className='h-45 flex flex-col gap-1'>
          <p className='w-90 font-bold text-sm'>Color Name:</p>
          <select 
            className='border-2 border-border rounded-lg h-10 px-1'
            defaultValue={1}
            onChange={(e) => handleSelection(e, setSelectedColors, selectedColors)}
          >
            <option value="1" disabled>
              Select Color
            </option>
            <option value="Powder Pink">Powder Pink</option>
            <option value="Eucalyptus Green">Eucalyptus Green</option>
          </select>
          <div className='border-2 border-border flex-grow rounded-lg h-20 p-2 flex flex-wrap gap-2 overflow-y-auto'>
            {selectedColors.map((color) => (
              <div 
                key={color} 
                className="border-2 flex items-center h-8 rounded-lg px-2"
              >
                <span className='text-xs font-bold'>{color}</span>
                <button 
                  onClick={() => removeItem(color, setSelectedColors, selectedColors)}
                  className="ml-2 text-xl text-red-500 font-bold hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='h-45 flex flex-col gap-1'>
          <p className='w-90 font-bold text-sm'>Type:</p>
          <select 
            className='border-2 border-border rounded-lg h-10 px-1'
            defaultValue={1}
            onChange={(e) => handleSelection(e, setSelectedTypes, selectedTypes)}
          >
            <option value="1" disabled>
              Select Type
            </option>
            <option value="Metallic">Metallic</option>
            <option value="Standard">Standard</option>
          </select>
          <div className='border-2 border-border flex-grow rounded-lg h-20 p-2 flex flex-wrap gap-2 overflow-y-auto'>
            {selectedTypes.map((type) => (
              <div 
                key={type} 
                className="border-2 flex items-center h-8 rounded-lg px-2"
              >
                <span className='text-xs font-bold'>{type}</span>
                <button 
                  onClick={() => removeItem(type, setSelectedTypes, selectedTypes)}
                  className="ml-2 text-xl text-red-500 font-bold hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='h-45 flex flex-col gap-1'>
          <p className='w-90 font-bold text-sm'>Size:</p>
          <select 
            className='border-2 border-border rounded-lg h-10 px-1'
            defaultValue={1}
            onChange={(e) => handleSelection(e, setSelectedSizes, selectedSizes)}
          >
            <option value="1" disabled>
              Select Size
            </option>
            <option value="5">5"</option>
            <option value="6">6"</option>
            <option value="10">10"</option>
            <option value="12">12"</option>
          </select>
          <div className='border-2 border-border flex-grow rounded-lg h-20 p-2 flex flex-wrap gap-2 overflow-y-auto'>
            {selectedSizes.map((size) => (
              <div 
                key={size} 
                className="border-2 flex items-center h-8 rounded-lg px-2"
              >
                <span className='text-xs font-bold'>{size}"</span>
                <button 
                  onClick={() => removeItem(size, setSelectedSizes, selectedSizes)}
                  className="ml-2 text-xl text-red-500 font-bold hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='w-90 font-bold text-sm'>Product Quantity:</p>
          <input className='border-2 border-border h-10 rounded-lg px-2'
          type="text" placeholder='Enter product Quantity' />
        </div>
      </div>
       
      <button className='flex justify-center items-center bg-button py-4 rounded-lg text-xl cursor-pointer text-white'>
        Add Product
      </button>
    </div>
  );
}

export default AddForm