import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

const Breadcrumb = () => {
  const router = useRouter();
  const { asPath } = router;
  const crumbs = asPath.split("/").filter((crumb) => crumb !== "");

  return (
    <div className="mt-2 mb-2">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <p>Home</p>
            </Link>
          </li>
          {crumbs.map((crumb, index) => {
            const basePath = crumb.split('?')[0]; // Extract base path without query parameters
            return (
              <li key={index} className="breadcrumb-item">
                <Link href={`/${crumbs.slice(0, index + 1).join("/")}`}>
                  <p>{basePath}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
