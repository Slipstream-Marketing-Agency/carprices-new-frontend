import React, { useEffect, useState } from "react";
import { breadcrumbData } from "../data/data";
import { useRouter } from "next/router";
import Link from "next/link";
function Breadcrumb() {
  const router = useRouter();
  console.log(router.pathname);
  const currentPathData = breadcrumbData.find(
    (item) => item.path === router.pathname
  );
  const lastPathSegment = currentPathData?.path.split("/").pop();

  // handle dynamic crumbs
  const { brandname } = router.query;
  console.log("brand name : ", brandname);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  useEffect(() => {
    // Update breadcrumbs based on the current route
    const pathSegments = router.asPath
      .split("/")
      .filter((segment) => segment !== "");
    const dynamicBreadcrumb = {
      title: `Product ${router.query.productId}`, // Replace with dynamic title based on the query parameter
      path: router.asPath,
    };
    const updatedBreadcrumbs = pathSegments.map((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      return {
        title: segment,
        path,
      };
    });

    // Add the dynamic breadcrumb for the dynamic route
    updatedBreadcrumbs.push(dynamicBreadcrumb);

    setBreadcrumbs(updatedBreadcrumbs);
  }, [router]);

  return (
    <div className="inner-page-banner">
      <div className="banner-wrapper">
        <div className="container-fluid">
          {/* <div>
           
            {breadcrumbs.map((breadcrumb, index) => (
       index!=breadcrumbs.length-1 && <span key={breadcrumb.path}>
          {index < breadcrumbs.length - 1 ? (
            <Link href={breadcrumb.path}>
              {breadcrumb.title}
            </Link>
          ) : (
            breadcrumb.title
          )}
          {index < breadcrumbs.length - 1 && ' / '}
        </span>
      ))}
          </div> */}

          <ul className="breadcrumb-list">
            <li>
              <Link legacyBehavior href="/">
                <a>
                  Home /{" "}
                  {breadcrumbs.map(
                    (breadcrumb, index) =>
                      index != breadcrumbs.length - 1 && (
                        <span key={breadcrumb.path}>
                          {index < breadcrumbs.length - 1 ? (
                            <Link href={breadcrumb.path}>
                              {breadcrumb.title}
                            </Link>
                          ) : (
                            breadcrumb.title
                          )}
                          {index < breadcrumbs.length - 1 && " / "}
                        </span>
                      )
                  )}
                </a>
              </Link>
            </li>
            <li style={{ textTransform: "capitalize" }}>{lastPathSegment}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
