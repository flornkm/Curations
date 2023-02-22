import Image from "next/image";
import Link from "next/link";
import * as Icon from "iconoir-react";

export default function Navigation(category, subcategory) {
  const imgLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="w-full flex justify-between py-8 place-items-center">
      <Link href="/">
        <Image
          loader={imgLoader}
          src="/images/curations_logo.png"
          alt="Curations Logo"
          className="max-h-7 object-contain"
          width={200}
          height={200}
        />
      </Link>
      <div className="flex gap-4 py-3 px-5 rounded-full ring-2 ring-zinc-800 text-sm font-medium text-white fixed translate-x-[-50%] left-[50%] bg-[#0D0D0D]">
        <Link href="/">All</Link>
        <Link href="/design">Design</Link>
        <Link href="/development">Development</Link>
        <Link href="/productvitiy">Productivity</Link>
        <Link href="/learning">Learning</Link>
      </div>
      <Icon.Plus
        className="bg-white rounded-full p-0.5 cursor-pointer"
        fontSize={24}
      />
    </div>
  );
}
