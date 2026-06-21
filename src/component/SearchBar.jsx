import React from "react";
import { useDispatch } from "react-redux";
import { setSearchKeyword } from "../store/studentSlice";

const SearchBar = () => {
  const dispatch = useDispatch()
  return (
    <div className="mb-10">
      <div className="relative">
        {/* Icon kính lúp */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <i className="fa-solid fa-magnifying-glass" />
        </div>

        {/* Input — onChange gọi handleChange mỗi khi user gõ */}
        <input
        onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
          type="text"
          placeholder="Tìm kiếm ..."
          className="w-full pl-12 pr-12 py-3 rounded-md border-2 border-gray-200 bg-white
            text-gray-800 placeholder-gray-400 text-sm
            focus:outline-none focus:border-blue-400 transition-colors"
        />

        {/* Bên phải: spinner khi đang chờ, nút X khi có text */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2"></div>
      </div>

      {/* Dòng trạng thái */}
      {/* <div className="mt-2 h-4 px-1">
        <p className="text-xs text-blue-400">Đang tìm kiếm sau 2 giây...</p>
      </div> */}
    </div>
  );
};

export default SearchBar;
