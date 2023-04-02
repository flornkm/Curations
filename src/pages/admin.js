import { useState, useEffect } from "react";
import UnconfirmedLink from "../components/UnconfirmedLink";
import AddLinkModal from "../components/AddLinkModal";
import DeleteLinkModal from "../components/DeleteLinkModal";
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLinkListPage, setShowLinkListPage] = useState(true);
  const [showAddLinkPage, setShowAddLinkPage] = useState(false);
  const [itemData, setItemData] = useState({});
  const [data, setData] = useState([]);
  const [userRank, setUserRank] = useState(null);

  const session = useSession()
  const supabase = useSupabaseClient()

  async function fetchData() {
    const { data, error } = await supabase
      .from("unconfirmed_links")
      .select("*");
    if (error) console.log(error);
    else setData(data);
  }

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

  function handleLinkListPage() {
    if (showLinkListPage === false) {
      setShowLinkListPage(true);
      setShowAddLinkPage(false);
    } else {
      setShowLinkListPage(false);
    }
  }

  function handleAddLinkPage() {
    if (showAddLinkPage === false) {
      setShowAddLinkPage(true);
      setShowLinkListPage(false);
    } else {
      setShowAddLinkPage(false);
    }
  }

  async function lookUserRank(session) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id);
    if (error) console.log(error);
    else {
      setUserRank(data[0].rank);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (session) {
      lookUserRank(session);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Curations - Stunning Tools, served daily</title>
        <meta name="description" content="Curations is a collection of tools and inspiration for designers and developers. Discover new resources and stay up-to-date with the latest trends." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex" />
      </Head>
      {!session ? (
      <div className="max-w-xl mx-auto pt-10">
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      </div>
      ) : (
      userRank === "admin" ? (
      <div className="w-screen h-screen overflow-hidden overflow-x-hidden">
        {showDeleteModal ? (
          <DeleteLinkModal
            onCloseModal={handleShowDeleteModal}
            itemData={itemData}
            fetchData={fetchData}
          />
        ) : null}
        {showEditModal ? (
          <AddLinkModal
            onCloseModal={handleShowEditModal}
            itemData={itemData}
            fetchData={fetchData}
          />
        ) : null}
        <div className="flex flex-col justify-center items-start p-4 w-full h-auto border-b-2 border-zinc-800">
          <Image
            src="/images/curations_logo.png"
            alt="Curations Logo"
            width={120}
            height={24}
            loader={({ src }) => src}
          />
        </div>

        <div className="flex flex-row justfiy-start items-start w-100 h-100">
          <div className="flex flex-col justify-start items-start min-w-100 h-[calc(100vh-2rem)] whitespace-nowrap border-r-2 border-zinc-800">
            <div className="flex flex-col justify-center items-start p-4 gap-1 w-full h-auto border-b-2 border-zinc-800">
              <p className="text-base font-semibold">Admin Panel</p>
              <p className="text-sm font-regular text-zinc-500">
                {session.user.email}
              </p>
            </div>

            <div className="flex flex-col justify-start items-start p-4 gap-2 w-auto h-100">
              <div
                className={
                  showLinkListPage
                    ? "flex px-4 py-1 border-l-2 border-white"
                    : "flex px-4 py-1"
                }
              >
                <button
                  onClick={handleLinkListPage}
                  className={
                    showLinkListPage
                      ? "text-base font-semibold text-zinc-200"
                      : "text-base font-semibold text-zinc-600 hover:text-zinc-500"
                  }
                >
                  Link list
                </button>
              </div>
              <div
                className={
                  showAddLinkPage
                    ? "flex px-4 py-1 border-l-2 border-white"
                    : "flex px-4 py-1"
                }
              >
                <button
                  onClick={handleAddLinkPage}
                  className={
                    showAddLinkPage
                      ? "text-base font-semibold text-zinc-200"
                      : "text-base font-semibold text-zinc-600 hover:text-zinc-500"
                  }
                >
                  Add Link
                </button>
              </div>
              <div className="flex px-4 py-1">
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="text-base font-semibold text-zinc-600 hover:text-zinc-500"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-100 h-100 overflow-hidden">
            <div className="flex flex-col justify-center items-start p-4 gap-1 w-screen h-auto border-b-2 border-zinc-800">
              <p className="text-sm font-regular text-zinc-500">
                {showAddLinkPage ? "Curations / Add Link" : null}
                {showLinkListPage ? "Curations / Link List" : null}
              </p>
              <p className="text-base font-semibold">
                {showAddLinkPage ? "Add Link" : null}
                {showLinkListPage ? "Link List" : null}
              </p>
            </div>
            <div className="h-[calc(100vh-8rem)] overflow-y-auto">
              {showLinkListPage ? (
                <UnconfirmedLink
                  onShowEditModal={handleShowEditModal}
                  onShowDeleteModal={handleShowDeleteModal}
                  onItemData={handleItemData}
                  data={data}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>) : (
      <div className="max-w-xl mx-auto pt-10">
        <h1 className="text-2xl font-semibold">You are not authorized to access this page.</h1>
      </div>
      )
      )}
    </>
  );
}
