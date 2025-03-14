import React from "react";
import Image from "next/image";

function NotFound() {
  return (
    <div className="defaultPageClasses justify-center text-center items-center flex-col">
      <Image
        className="w-28"
        width={120}
        height={120}
        alt=""
        src="https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png"
        priority={true}
      />
      <div>
        <h1>Page not found!</h1>
      </div>
    </div>
  );
}

export default NotFound;
