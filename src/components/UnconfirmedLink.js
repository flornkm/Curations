import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import { useState, useEffect } from "react";
import { supabase } from "../pages/api/supabase";

function UnconfirmedLink({ onItemData, onShowEditModal, onShowDeleteModal, data }) {

  function handleEdit(item) {
    onShowEditModal();
    const itemData = { link: item.link, id: item.id };
    onItemData(itemData);
  }

  function handleDelete(item) {
    onShowDeleteModal();
    const itemData = { link: item.link, id: item.id };
    onItemData(itemData);
  }

  return (
    <div className="flex flex-col">
  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b border-gray-200">
        <table className="table-fixed w-full divide-y divide-zinc-800">
          <thead className="bg-black-80 sticky top-0 z-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider"
              >
                Timestamp
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider"
              >
                Link
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-black-100 divide-y divide-zinc-800">
            {data.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap truncate text-sm font-medium text-zinc-500">
                  {item.timestamp}
                </td>
                <td className="max-w-lg px-6 py-4 whitespace-nowrap truncate text-sm text-zinc-500">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-auto">
                    {item.link}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-zinc-600 hover:text-zinc-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="ml-4 text-zinc-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  );
}

export default UnconfirmedLink;
