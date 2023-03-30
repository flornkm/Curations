import { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase";

function DeleteLinkModal () {

    return (
        //make the div a popup
    <div className="fixed top-0 left-0 w-full h-full flex flex-column justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="flex flex-col w-[424px] h-auto bg-[#0d0d0d] border-zinc-800 border-2 rounded-lg">
      <div
      // (loading && "pointer-events-none")
      // }
      >
          <div className="flex flex-row justify-center items-center gap-2 p-4">
            <p className="text-base font-semibold text-zinc-200">Delete Link?</p>
          </div>
          <div className="flex flex-col justify-center items-center px-12 gap-4">
            <p className="text-base text-center font-regular text-zinc-600">Deleting this link will remove it from the database and it can't be recovered again.</p>
          </div>
          <div className="flex flex-row justify-between items-center p-4 gap-4">
            <button
            //   onClick={() => handleClose()}
              className="w-full h-10 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded hover:border-zinc-700"
            >
              Cancel
            </button>
            <button
            //   onClick={handleSubmit}
              className="w-full h-10 px-2 text-sm font-medium text-zinc-200 bg-red-700 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
      </div>
    </div>
  </div>
    );
}

export default DeleteLinkModal;