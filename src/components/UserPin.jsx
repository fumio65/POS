import React, { useState } from 'react';

const buttonPass = [
  { button: '1' },
  { button: '2' },
  { button: '3' },
  { button: '4' },
  { button: '5' },
  { button: '6' },
  { button: '7' },
  { button: '8' },
  { button: '9' },
  { button: 'C' }, // Clear
  { button: '0' },
  { icon: '/icons/delete.svg' }, // Backspace
];

function UserPin() {
  const [pin, setPin] = useState('');

  const handleButtonClick = (val) => {
    if (val === 'C') {
      setPin('');
    } else if (val === 'backspace') {
      setPin((prev) => prev.slice(0, -1));
    } else {
      setPin((prev) => prev + val);
    }
  };

  return (
    <form action="" className="h-105 w-90 p-4">
      <input
        className='w-full py-3 text-lg text-center text-white font-bold focus:outline-none'
        type="password"
        placeholder='Enter your PIN'
        value={pin}
        readOnly
      />
      <div
        className='grid gap-4 mt-4'
        style={{
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gridTemplateRows: 'repeat(4, minmax(0, 1fr))',
        }}
      >
        {buttonPass.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className='border-1 border-border bg-white/5 backdrop-blur-xs rounded-full text-white text-3xl py-2 hover:opacity-50 transition duration-500 cursor-pointer'
            onClick={() => {
              if (item.button) {
                handleButtonClick(item.button);
              } else if (item.icon) {
                handleButtonClick('backspace');
              }
            }}
          >
            {item.button ? (
              item.button
            ) : item.icon ? (
              <img className='h-8 w-8 mx-auto' src={item.icon} alt="Icon" />
            ) : null}
          </button>
        ))}
      </div>
      <button className='w-full mt-4 py-2 bg-button text-white font-bold rounded-full hover:bg-blue-600 transition duration-200'>
        Unlock
      </button>
    </form>
  );
}

export default UserPin;
