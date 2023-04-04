import {useState, useEffect } from "react";
import { supabase } from "../supabase-config";

function SubmitLinkModal({ onCloseModal, data }) {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-column justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="flex flex-col w-[424px] h-auto bg-[#0d0d0d] border-zinc-800 border-2 rounded-lg">
            {loading ? (
              <div className="flex flex-col h-full w-full justify-center items-center">
                <p className="text-lg font-medium text-zinc-200">Loading...</p>
                </div>) : (
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row justify-start items-center gap-2 p-4 border-zinc-800 border-b-2">
                <div className="origin-center rotate-45 w-3 h-3 bg-[#FC4733] rounded-sm"></div>
                <p className="text-lg font-semibold text-zinc-200">Add Link</p>
              </div>
              <div className="flex flex-col justify-start items-start p-4 gap-4">
                <div className="flex flex-row justify-between items-center w-full h-auto">
                  <label
                    htmlFor="link"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Link
                  </label>
                  <input
                    type="text"
                    id="link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-[240px] h-8 px-2 text-sm font-medium whitespace-nowrap truncate text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded "
                  />
                </div>
                <div className="flex flex-row justify-between items-center w-full h-auto">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded"
                  />
                </div>
                <div className="flex flex-row justify-between items-center w-full h-auto">
                  <label
                    htmlFor="mainCategory"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Main Category
                  </label>
                  <select
                    id="mainCategory"
                    value={mainCategory}
                    onChange={handleMainCategoryChange}
                    className=" w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded"
                  >
                    <option value="">Select Main Category</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Productivity">Productivity</option>
                    <option value="Learning">Learning</option>
                  </select>
                </div>
                <div className="flex flex-row justify-between items-center w-full h-auto">
                  <label
                    htmlFor="subCategory"
                    className="text-sm font-medium text-zinc-200"
                  >
                    Sub Category
                  </label>
                  <select
                    id="subCategory"
                    value={subCategory}
                    onChange={handleSubCategoryChange}
                    className="w-[240px] h-8 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded"
                  >
                    <option value="">Select Sub Category</option>
                    {subCategoryOptions[mainCategory] &&
                      subCategoryOptions[mainCategory].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center p-4 gap-4">
                <button
                  onClick={handleClose}
                  className="w-full h-10 px-2 text-sm font-medium text-zinc-200 bg-[#0d0d0d] border-zinc-800 border-2 rounded hover:border-zinc-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="w-full h-10 px-2 text-sm font-medium text-zinc-200 bg-zinc-800 rounded hover:bg-zinc-700"
                >
                  Add Link
                </button>
              </div>
            </form>
            )}
          </div>
        </div>

    );


}

export default SubmitLinkModal;