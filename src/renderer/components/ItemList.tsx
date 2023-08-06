import React, { useState } from 'react';
import { Item, SingleItem } from './SingleItem';

export const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem = e.currentTarget.item.value;
    if (newItem) {
      setItems((prevItems) => [
        { id: prevItems.length + 1, name: newItem },
        ...prevItems,
      ]);
      e.currentTarget.item.value = '';
    }
  };

  const handleDelete = (itemToDelete: Item) => {
    setItems((prevItems) => prevItems.filter((item) => item !== itemToDelete));
  };

  return (
    <div className="mt-4 min-w-[1rem] w-full w-[50%] mt-[6.5rem]">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Add item"
          className="w-full focus:outline-none text-black p-4 rounded-l-lg"
          name="item"
        />
        <button
          type="submit"
          className="bg-[#5B8FB9] text-white px-4 py-2 rounded-r-lg"
        >
          Add
        </button>
      </form>
      <ul className="mt-4">
        {items.map((item) => (
          <SingleItem key={item.id} item={item} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};
