import { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase";

function LinkPopup() {



    return (
        <div className="flex flex-col w-[424px] h-auto bg-[#0d0d0d] border-zinc-800 border-2 rounded-lg">
            <div className="flex flex-row justify-start items-center p-2">
                <p className="text-sm font-semibold text-zinc-200">Add Link</p>
            </div>
        </div>
    )
}

export default LinkPopup;