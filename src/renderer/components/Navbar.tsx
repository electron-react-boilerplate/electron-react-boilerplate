import icon from '../../../assets/icon.svg';

export const Navbar = () => {
  return (
    <div className="flex items-center justify-center w-full text-2xl gap-2 fixed top-0 left-0 text-white z-10 bg-[#03001C] py-2">
      <img src={icon} alt="icon" className="w-24 h-24" />
      <div>
        <p>The</p>
        <p>Todo</p>
        <p>List</p>
      </div>
    </div>
  );
};
