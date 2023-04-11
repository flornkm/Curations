import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabase-config";
import * as Icon from "iconoir-react";

function SubmitLinkModal({ onCloseModal, data }) {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [isValidLink, setIsValidLink] = useState(true); // add state to track if link is valid
  const button = useRef();
  const buttonBorder = useRef();
  const modalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      if (button.current) {
        // add this null check
        const rectangle = button.current.getBoundingClientRect(),
          x = e.clientX - rectangle.left,
          y = e.clientY - rectangle.top;

        button.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #52525b, #3f3f46)`;
        buttonBorder.current.style.background = `radial-gradient(circle at ${x}px ${y}px, #a1a1aa, #3f3f46)`;
      }
    });

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onCloseModal();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCloseModal]);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // check if link is valid
    const linkPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!linkPattern.test(link)) {
      setIsValidLink(false);
      setLoading(false);
      return;
    }
  
    // check if link already exists in database
    const { data: existingLinks, error } = await supabase
      .from("unconfirmed_links")
      .select("*")
      .eq("link", link);
    if (error) {
      console.log(error);
      setLoading(false);
      onCloseModal();
      return;
    }
  
    if (existingLinks.length > 0) {
      console.log("link already exists");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      onCloseModal();
      return;
    }
  
    // insert the link if it doesn't already exist
    const { error: insertError } = await supabase.from("unconfirmed_links").insert({
      link: link,
      timestamp: new Date().toISOString(),
    });
    if (insertError) {
      console.log(insertError);
      setLoading(false);
      onCloseModal();
      return;
    }
  
    console.log("link added");
    //wait for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    setLoading(false);
    onCloseModal();
  };

  function handleClose() {
    onCloseModal();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-column justify-center items-center bg-black bg-opacity-70 z-50">
      <div ref={modalRef} className="flex flex-col w-[424px] h-auto bg-[#0d0d0d] border-zinc-800 border-2 rounded-lg drop-shadow-lg">
        {loading ? (
          <div className="flex flex-col h-[230px] w-full justify-center items-center">
            <p className="text-lg font-medium text-zinc-200">Thank you!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row justify-between items-center p-4 border-zinc-800 border-b-2">
              <div className="flex flex-row justify-start items-center gap-2 ">
                <div className="origin-center rotate-45 w-3 h-3 bg-[#FC4733] rounded-sm"></div>
                <p className="text-lg font-semibold text-zinc-200">
                  Submit Link
                </p>
              </div>
              <div
                className="w-auto h-auto cursor-pointer"
                onClick={handleClose}
              >
                <Icon.Cancel fontSize={16} />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start p-4 gap-4">
              <div className="flex flex-col justify-start items-start w-full h-auto gap-2">
                <p className="text-md font-regular leading-140 text-zinc-400">
                  Each link that is submitted will be reviewed. <br></br> And if
                  it&rsquo;s good, it will be featured on Curations.
                </p>
                <p className="text-sm font-regular leading-140 text-zinc-600">
                  Build and maintained by{" "}
                  <a
                    href="https://antonstallboerger.com"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-zinc-500"
                  >
                    Anton
                  </a>
                  ,{" "}
                  <a
                    href="https://nilseller.com"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-zinc-500"
                  >
                    Nils
                  </a>
                  {" and "}
                  <a
                    href="https://designwithtech.com"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-zinc-500"
                  >
                    Florian
                  </a>
                  .
                </p>
              </div>
              <div className="flex flex-col justify-center items-start w-full h-auto gap-1">
              {!isValidLink && (
                <p className="text-sm font-medium text-red-600">
                  Please provide a valid link
                </p>
              )}
              <div className="flex flex-row justify-start items-center w-full h-auto gap-2">
                <input
                  type="text"
                  id="link"
                  value={link}
                  onChange={(e) => {
                    setLink(e.target.value);
                    setIsValidLink(true);
                  }}
                  placeholder="Submit link"
                  className={`w-full h-10 px-2 text-sm font-medium whitespace-nowrap truncate text-zinc-200 placeholder-zinc-600 bg-[#0d0d0d] border-2 rounded focus:outline-none ${
                    isValidLink ? "border-zinc-800" : "border-red-600"
                  }`}
                />

                <button className="bg-zinc-600 px-6 font-medium py-[7px] rounded text-white hover:bg-zinc-700 relative cursor-pointer">
                  <div
                    ref={button}
                    className="absolute left-0 top-0 right-0 bottom-0 pointer-events-none rounded z-10"
                  ></div>
                  <div
                    ref={buttonBorder}
                    className="absolute -left-[1px] -top-[1px] -right-[1px] -bottom-[1px] pointer-events-none rounded-[5px]"
                  ></div>
                  <span className="z-20 relative">Submit</span>
                </button>
              </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SubmitLinkModal;
