import { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase";

function LinkPopup() {
  return (
      <div className="flex flex-col w-[424px] h-auto bg-[#0d0d0d] border-zinc-800 border-2 rounded-lg">
        <div className="flex flex-row justify-start items-center p-2 border-zinc-800 border-b-2">
          <p className="text-sm font-semibold text-zinc-200">Add Link</p>
        </div>
        <div className="flex flex-col justify-start items-start p-2 gap-2">
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-semibold text-zinc-200">Link</p>
            <input
              className="w-[240px] h-6 px-2 text-sm font-semibold text-zinc-200 bg-zinc-800 border-zinc-800 border-2 rounded "
              type="text"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-semibold text-zinc-200">Name</p>
            <input
              className="w-[240px] h-6 px-2 text-sm font-semibold text-zinc-200 bg-zinc-800 border-zinc-800 border-2 rounded"
              type="text"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-semibold text-zinc-200">Main Category</p>
            <input
              className="w-[240px] h-6 px-2 text-sm font-semibold text-zinc-200 bg-zinc-800 border-zinc-800 border-2 rounded"
              type="text"
            />
          </div>
          <div className="flex flex-row justify-between items-center w-full h-auto">
            <p className="text-sm font-semibold text-zinc-200">Sub Category</p>
            <input
              className="w-[240px] h-6 px-2 text-sm font-semibold text-zinc-200 bg-zinc-800 border-zinc-800 border-2 rounded"
              type="text"
            />
          </div>
        </div>
      </div>
  );
}

export default LinkPopup;
