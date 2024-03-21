import React, { useEffect, useState } from "react";
import { breadcrumbData } from "../data/data";
import { useRouter } from "next/router";
import Link from "next/link";

function Breadcrumb() {
  const router = useRouter();
  const currentPathData = breadcrumbData.find(
    (item) => item.path === router.pathname
  );
  const lastPathSegment = currentPathData?.path.split("/").pop();

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  useEffect(() => {
    // Update breadcrumbs based on the current route, excluding any query parameters.
    const pathSegments = router.asPath
      .split("?")[0] // Remove query string before splitting the path.
      .split("/")
      .filter((segment) => segment !== "");

    const updatedBreadcrumbs = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        title: segment,
        path,
      };
    });

    setBreadcrumbs(updatedBreadcrumbs);
  }, [router]);

  return (
    <div className="inner-page-banner">
      <ul className="breadcrumb-list">
        <li className="bg-primary rounded text-white p-1">
          <Link href="/" className="text-white">
            <span>Home /</span>
          </Link>
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={breadcrumb.path} className="text-white">
              {index > 0 && " / "}
              <Link href={breadcrumb.path} className="text-white">
                {breadcrumb.title}
              </Link>
            </span>
          ))}
        </li>
        <li style={{ textTransform: "capitalize" }} className="text-white">
          {lastPathSegment}
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumb;
