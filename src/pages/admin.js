import { useState, useEffect } from "react";
import UnconfirmedLink from "../components/UnconfirmedLink";
import AddLinkModal from "../components/AddLinkModal";
import DeleteLinkModal from "../components/DeleteLinkModal";
import { supabase } from "../pages/api/supabase";
import Image from "next/image";
import Login from "@/components/Login";
import { supabase } from "../supabase-config";

export default function Home() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [link, setLink] = useState("");
  const [itemData, setItemData] = useState({});
<<<<<<< Updated upstream
  const [data, setData] = useState([]);

  //fetch data from unconfirmed_links table
  async function fetchData() {
    const { data, error } = await supabase
      .from("unconfirmed_links")
      .select("*");
    if (error) console.log(error);
    else setData(data);
  }

  //fetch data on page load
  useEffect(() => {
    fetchData();
  }, []);
=======
  const [session, setSession] = useState(null);
>>>>>>> Stashed changes

  function handleItemData(item) {
    setItemData(item);
    console.log(item);
  }

  function handleShowEditModal() {
    if (showEditModal === false) {
      setShowEditModal(true);
    } else {
      setShowEditModal(false);
    }
  }

  function handleShowDeleteModal() {
    if (showDeleteModal === false) {
      setShowDeleteModal(true);
    } else {
      setShowDeleteModal(false);
    }
  }

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

  }, []);

  return (
<<<<<<< Updated upstream
    <div className="w-screen h-screen overflow-hidden overflow-x-hidden">
      {showDeleteModal ? <DeleteLinkModal onCloseModal={handleShowDeleteModal} itemData={itemData} fetchData={fetchData}/> : null}
      {showEditModal ? (<AddLinkModal onCloseModal={handleShowEditModal} itemData={itemData} fetchData={fetchData}/>) : null}
      <div className="flex flex-col justify-center items-start p-4 w-full h-auto border-b-2 border-zinc-800">
        <Image
          src="/images/curations_logo.png"
          alt="Curations Logo"
          width={120}
          height={24}
        />
      </div>

      <div className="flex flex-row justfiy-start items-start w-100 h-100">
        <div className="flex flex-col justify-start items-start min-w-100 h-[calc(100vh-2rem)] whitespace-nowrap border-r-2 border-zinc-800">
          <div className="flex flex-col justify-center items-start p-4 gap-1 w-full h-auto border-b-2 border-zinc-800">
            <p className="text-base font-semibold">Admin Panel</p>
            <p className="text-sm font-regular text-zinc-500">
              nils.eller@hfg.design
            </p>
          </div>

          <div className="flex flex-col justify-start items-start p-4 gap-2 w-auto h-100">
            <div className="flex px-4 py-1 border-l-2 border-white">
              <p className="text-base font-semibold">Link list</p>
            </div>
            <div className="flex px-4 py-1">
              <p className="text-base font-semibold text-zinc-600">Add link</p>
            </div>
            <div className="flex px-4 py-1">
              <p className="text-base font-semibold text-zinc-600">
                Add component
=======
    !session ? (
      <Login />
    ) : session.user.email === "florian.kiem@hfg.design" || session.user.email === "nils.eller@hfg.design" ? (
      <div className="w-screen h-screen overflow-hidden overflow-x-hidden">
        {showModal ? <DeleteLinkModal onCloseModal={handleShowModal} /> : null}
        {showModal ? (<AddLinkModal onCloseModal={handleShowModal} itemData={itemData} />) : null}
        <div className="flex flex-col justify-center items-start p-4 w-full h-auto border-b-2 border-zinc-800">
          <Image
            src="/images/curations_logo.png"
            alt="Curations Logo"
            width={120}
            height={24}
          />
        </div>
        <div className="flex flex-row justfiy-start items-start w-100 h-100">
          <div className="flex flex-col justify-start items-start min-w-100 h-[calc(100vh-2rem)] whitespace-nowrap border-r-2 border-zinc-800">
            <div className="flex flex-col justify-center items-start p-4 gap-1 w-full h-auto border-b-2 border-zinc-800">
              <p className="text-base font-semibold">Admin Panel</p>
              <p className="text-sm font-regular text-zinc-500">
                {session.user.email}
>>>>>>> Stashed changes
              </p>
            </div>

            <div className="flex flex-col justify-start items-start p-4 gap-2 w-auto h-100">
              <div className="flex px-4 py-1 border-l-2 border-white">
                <p className="text-base font-semibold">Link list</p>
              </div>
              <div className="flex px-4 py-1">
                <p className="text-base font-semibold text-zinc-600">Add link</p>
              </div>
              <div className="flex px-4 py-1">
                <p className="text-base font-semibold text-zinc-600">
                  Add component
                </p>
              </div>
              <div className="flex px-4 py-1">
                <p className="text-base font-semibold text-zinc-600 cursor-pointer hover:text-white"
                  onClick={() => supabase.auth.signOut()}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
<<<<<<< Updated upstream
          <div className="h-[calc(100vh-8rem)] overflow-y-auto">
            <UnconfirmedLink
              onShowEditModal={handleShowEditModal}
              onShowDeleteModal={handleShowDeleteModal}
              onItemData={handleItemData}
              data={data}
            />
=======

          <div className="flex flex-col justify-start items-start w-100 h-100 overflow-hidden">
            <div className="flex flex-col justify-center items-start p-4 gap-1 w-full h-auto border-b-2 border-zinc-800">
              <p className="text-sm font-regular text-zinc-500">
                Curations / Link list
              </p>
              <p className="text-base font-semibold">Link list</p>
            </div>
            <div className="h-[calc(100vh-8rem)] overflow-y-auto">
              <UnconfirmedLink
                onShowModal={handleShowModal}
                onItemData={handleItemData}
              />
            </div>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    ) : (
      <div className="h-screen w-full flex flex-col gap-5 justify-center items-center">
        <span className="text-xl">You are not authorized to view this page.</span>
        <Link
          href="/"
          className="px-4 py-2 bg-zinc-800 text-white rounded-md transition-all hover:bg-zinc-700"
        >Back</Link>
      </div>
    )
  );
}
