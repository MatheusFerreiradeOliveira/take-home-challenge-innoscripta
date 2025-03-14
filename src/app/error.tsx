"use client";
import Image from "next/image";

function InternalError() {
  return (
    <div className="order-2 flex flex-1 justify-center items-center">
      <Image
        className="w-28"
        width={120}
        height={120}
        alt=""
        src="https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png"
        priority={true}
      />
      <div>
        <h1>
          There was an internal error in the application, reload the page!
        </h1>
      </div>
    </div>
  );
}

export default InternalError;
