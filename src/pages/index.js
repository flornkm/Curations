import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import RiveComponent from "@rive-app/react-canvas";
import Maintenance from "@/pages/maintenance";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import SubmitLinkModal from "@/components/SubmitLinkModal";

export default function Curations() {
  const maintenanceMode = true;
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({ category: "all" });
  const [subCategory, setSubCategory] = useState("All");
  const [items, setItems] = useState([]);
  const sidebarWrapper = useRef(null);
  const plusIcon = useRef(null);
  const navigation = useRef(null);
  const rect = useRef();
  const router = useRouter();
  const mainNavigation = {
    all: useRef(),
    design: useRef(),
    development: useRef(),
    code: useRef(),
    productivity: useRef(),
    learning: useRef(),
  };
  const main = useRef();

    const moveRect = useCallback(() => {
      if (router.query.category === "design") {
        mainNavigation.design.current.offsetLeft;
        mainNavigation.design.current.offsetWidth;
        rect.current.style.transform = `translateX(${mainNavigation.design.current.offsetLeft}px)`;
        rect.current.style.width = `${mainNavigation.design.current.offsetWidth}px`;
      } else if (
        router.query.category === "development" ||
        router.query.category === "code"
      ) {
        mainNavigation.development.current.offsetLeft;
        mainNavigation.development.current.offsetWidth;
        if (window.innerWidth > 768) {
          rect.current.style.transform = `translateX(${mainNavigation.development.current.offsetLeft}px)`;
          rect.current.style.width = `${mainNavigation.development.current.offsetWidth}px`;
        } else {
          rect.current.style.transform = `translateX(${mainNavigation.code.current.offsetLeft}px)`;
          rect.current.style.width = `${mainNavigation.code.current.offsetWidth}px`;
        }
      } else if (router.query.category === "productivity") {
        mainNavigation.productivity.current.offsetLeft;
        mainNavigation.productivity.current.offsetWidth;
        rect.current.style.transform = `translateX(${mainNavigation.productivity.current.offsetLeft}px)`;
        rect.current.style.width = `${mainNavigation.productivity.current.offsetWidth}px`;
      } else if (router.query.category === "learning") {
        mainNavigation.learning.current.offsetLeft;
        mainNavigation.learning.current.offsetWidth;
        rect.current.style.transform = `translateX(${mainNavigation.learning.current.offsetLeft}px)`;
        rect.current.style.width = `${mainNavigation.learning.current.offsetWidth}px`;
      }
    }, [router.query.category]);


    useEffect(() => {
      if (router.asPath.includes("#access_token")) {
        window.location.href = "/admin" + router.asPath;
      }

      window.addEventListener("scroll", (e) => {
        if (e.target.documentElement.scrollTop > 35)
          navigation.current.classList.remove("max-lg:translate-y-16");
        else navigation.current.classList.add("max-lg:translate-y-16");
      });
    }, []);

    const loadCategoryItems = async (category) => {
      try {
        main.current.style.pointerEvents = "none";
        setLoading(true);
        const response = await fetch(`/api/supabase?category=${category}`);
        const data = await response.json();
        main.current.style.pointerEvents = "auto";
        setLoading(false);
        if (data === null || data.length === 0) {
          // Retry fetching the data
          const retryResponse = await fetch(`/api/supabase?category=${category}`);
          const retryData = await retryResponse.json();
          setItems(retryData);
        } else {
          setItems(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const loadSubcategoryItems = async (category, itemName) => {
      try {
        main.current.style.pointerEvents = "none";
        setLoading(true);
        const response = await fetch(
          "/api/supabase?category=" + category + "&subCategory=" + itemName
        );
        const data = await response.json();
        main.current.style.pointerEvents = "auto";
        setLoading(false);
        if (data === null || data.length === 0) {
          // Retry fetching the data
          const retryResponse = await fetch(
            "/api/supabase?category=" + category + "&subCategory=" + itemName
          );
          const retryData = await retryResponse.json();
          setItems(retryData);
        } else {
          setItems(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!maintenanceMode) {

    useEffect(() => {
      if (router.isReady) {
        if (
          router.query.category !== undefined &&
          router.query.subcategory === undefined
        ) {
          rect.current.style.opacity = 1;
          moveRect();
          setCategory({ category: router.query.category });
          loadSubcategoryItems(router.query.category, "All");
        } else if (
          router.query.category !== undefined &&
          router.query.subcategory !== undefined
        ) {
          rect.current.style.opacity = 1;
          moveRect();
          loadSubcategoryItems(router.query.category, router.query.subcategory);
          setCategory({ category: router.query.category });
          if (router.query.subcategory.includes("-")) {
            router.query.subcategory = router.query.subcategory.replace(
              /-/g,
              " "
            );
          }
          setSubCategory(router.query.subcategory);
        } else {
          const width = window.innerWidth;
          if (width > 768) {
            rect.current.style.opacity = 1;
          } else {
            rect.current.style.opacity = 0;
          }
          loadCategoryItems("all");
        }
      }
    }, [router]);
  }

  return (
    maintenanceMode ? (
      <Maintenance />) : (
      <>
        <Head>
          <title>Curations - Stunning Tools, served daily</title>
          <meta name="description" content="Curations is a collection of tools and inspiration for designers and developers. Discover new resources and stay up-to-date with the latest trends." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="robots" content="index, follow" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Curations - Stunning Tools, served daily" />
          <meta property="og:description" content="Curations is a collection of tools and inspiration for designers and developers. Discover new resources and stay up-to-date with the latest trends." />
          <meta property="og:image" content="/images/curations_social_image.jpg" />
          <meta property="og:url" content="https://www.curations.tech/" />
          <meta property="og:site_name" content="Curations" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Curations - Stunning Tools, served daily" />
          <meta name="twitter:description" content="Curations is a collection of tools and inspiration for designers and developers. Discover new resources and stay up-to-date with the latest trends." />
          <meta name="twitter:image" content="/images/curations_social_image.jpg" />
        </Head>
        <main className="pl-[5%] pr-[5%] min-h-screen" ref={main}>
          <Navigation
            mainNavigation={mainNavigation}
            navigation={navigation}
            category={category}
            setCategory={setCategory}
            sidebarWrapper={sidebarWrapper}
            plusIcon={plusIcon}
            handleCategory={loadSubcategoryItems}
            subCategory={subCategory}
            setSubCategory={setSubCategory}
            loadCategoryItems={loadCategoryItems}
            rect={rect}
          />
          {(loading && (
            // <RiveComponent
            //   src="./animations/curations_loading.riv"
            //   className="max-w-[500px] max-md:h-64 md:h-[256px] object-contain m-auto pt-24"
            // />
            <></>
          )) ||
            (!loading && items && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-items-center md:px-8 max-md:pt-12 pb-24">
                {items.map((item) => (
                  <Link
                    target="_blank"
                    key={item.id}
                    href={item.link}
                    className="rounded-xl shadow-lg flex flex-col gap-2 transition-all hover:scale-[0.98] focus:outline-1 focus:outline-red-300"
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={500}
                        height={300}
                        className="rounded-lg max-h-72 object-cover object-top"
                      />
                    )}
                    <div className="flex gap-4 place-items-center">
                      {item.favicon && (
                        <Image
                          src={item.favicon}
                          alt={item.title + " favicon"}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      )}
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          <About sidebarWrapper={sidebarWrapper} plusIcon={plusIcon} />
        </main>
      </>
    )
  );
}
