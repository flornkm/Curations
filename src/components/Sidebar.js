import React from "react";
import * as Icon from "iconoir-react";

export default function Sidebar(props) {
  return (
    <div className="h-full fixed left-0 z-50  border-r border-zinc-800 bg-zinc-900 flex flex-col justify-between">
      <div>
        <div className="p-10 border-b border-zinc-800">
          <h1 className="text-xl font-semibold">Curations Admin Panel</h1>
          <p className="text-zinc-500">Logged in as </p>
        </div>
        <div className="p-10 border-b border-zinc-800 font-medium flex flex-col gap-4 items-start">
          <p
            className="cursor-pointer p-2 rounded-lg hover:bg-zinc-800 transition-all"
            onClick={() => {
              props.setTab("link-inserter");
            }}
          >
            Link Inserter
          </p>
          <p
            className="cursor-pointer p-2 rounded-lg hover:bg-zinc-800 transition-all"
            onClick={() => {
              props.setTab("component-inserter");
            }}
          >
            Component Inserter
          </p>
        </div>
      </div>
      <div className="p-10 border-t border-zinc-800 font-medium flex flex-col gap-4 items-start">
        <p
          className="cursor-pointer p-2 rounded-lg hover:bg-zinc-800 transition-all flex gap-2"
          onClick={() => {
            props.logout();
          }}
        >
          Logout
          <Icon.LogOut fontSize={16} />
        </p>
      </div>
    </div>
  );
}
