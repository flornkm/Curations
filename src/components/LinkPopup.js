import { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase";

function LinkPopup() {
  return (
    //make the div a popup
    <div className="fixed top-0 left-0 w-full h-full flex flex-column justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col w-[424px] h-auto bg-[#0d0d0d] border-zinc-800 border-2 rounded-lg">
        <div className="flex flex-row justify-start items-center gap-2 p-4 border-zinc-800 border-b-2">
          <div className="origin-center rotate-45 w-3 h-3 bg-[#FC4733] rounded-sm"></div>
          <p className="text-base font-semibold text-zinc-200">Add Link</p>
        </div>
        <div className="flex flex-col justify-start items-start p-4 gap-4">
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-medium text-zinc-200">Link</p>
            <input
              className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded "
              type="text"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-medium text-zinc-200">Name</p>
            <input
              className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded"
              type="text"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-medium text-zinc-200">Main Category</p>
            <select className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
          </div>
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-medium text-zinc-200">Sub Category</p>
            <select className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center p-4 gap-4">
          <button className="w-full h-10 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded">
            Cancel
          </button>
          <button className="w-full h-10 px-2 text-sm font-medium text-zinc-200 bg-zinc-800 border-zinc-800 border-2 rounded">
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
}

export default LinkPopup;
