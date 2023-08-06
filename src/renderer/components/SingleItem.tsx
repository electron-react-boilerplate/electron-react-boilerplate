import { BiSolidTrashAlt } from 'react-icons/bi';

export interface Item {
  id: number;
  name: string;
}
interface SingleItemProps {
  item: Item;
  handleDelete: (itemToDelete: Item) => void;
}

export const SingleItem = ({ item, handleDelete }: SingleItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="p-4 my-2 flex justify-between items-center hover:bg-[#332791] hover:bg-opacity-40 hover:rounded-lg">
        <div className="">{item.name}</div>
        <button
          type="button"
          onClick={() => handleDelete(item)}
          className="hover:bg-[#671e1e] px-4 py-2 rounded-lg"
        >
          <BiSolidTrashAlt className="text-white" />
        </button>
      </div>
      <div className="border-b-2 border-white border-opacity-20" />
    </div>
  );
};
