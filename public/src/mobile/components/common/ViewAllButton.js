import Link from "next/link";
import React from "react";

export default function ViewAllButton({text,link}) {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Link href={`${link}`} title="">
        <div className="btn btn-primary text-white">
          <span>{text}</span>
          <i className="bi bi-chevron-right" />
        </div>
      </Link>
    </div>
  );
}
