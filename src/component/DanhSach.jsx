import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudent, setEditingStudent } from "../store/studentSlice";

const DanhSach = () => {
  const dispatch = useDispatch()
  const students = useSelector((state) => state.student.students);
  const searchKeyword = useSelector ((state) => state.student.searchKeyword)
  const filteredStudent = students.filter((sv) =>
  sv.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
  String(sv.id).includes(searchKeyword) ||
  String(sv.phone).includes(searchKeyword) ||
  sv.email.toLowerCase().includes(searchKeyword.toLowerCase())
);
  return (
    <div className="rounded-md + overflow-hidden">
      <table className="w-full border-collapse ">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium">Mã SV</th>
            <th className="px-4 py-3 text-left text-sm font-medium">Họ tên</th>
            <th className="px-4 py-3 text-left text-sm font-medium">
              Số điện thoại
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
            {/* ⭐ Thêm cột mới, căn phải */}
            <th className="px-4 py-3 text-right text-sm font-medium pr-8">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {filteredStudent.map((sv) => (
            <tr key={sv.id} className="border-b border-slate-200">
              <td className="px-4 py-3 text-sm">{sv.id}</td>
              <td className="px-4 py-3 text-sm">{sv.name}</td>
              <td className="px-4 py-3 text-sm">{sv.phone}</td>
              <td className="px-4 py-3 text-sm">{sv.email}</td>
              {/* ⭐ Cell riêng cho button, căn phải */}
              <td className="px-4 py-3 text-sm text-right space-x-2">
                <button 
                onClick={() =>dispatch(setEditingStudent(sv))}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs">
                  Sửa
                </button>
                <button 
                onClick={() => dispatch(deleteStudent(sv.id))}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DanhSach;
