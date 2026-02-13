import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";

const MobileSidebar = ({
  toggleNavigation,
  setIsOpen,
  isOpen,
  links,
  setIsLoginModalOpen,
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [subMenuOptions, setSubMenuOptions] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleSetIsLoginModalOpen = () => {
    toggleNavigation();
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  // Build submenu options. Use **href** consistently.
  const handleSetSubMenuOptions = (hoverItem) => {
    let options = [];
    if (hoverItem === "search-cars") {
      options = [
        { href: "/search-cars", label: "Browse New Car Guide" },
        { href: "/used-cars", label: "Used cars" },
        { href: "/brands", label: "Search By Brands" },
        { href: "/search-cars", label: "Search All Body Type" },
        { href: "/search-cars", label: "Popular Cars" },
      ];
    } else if (hoverItem === "services") {
      options = [
        { href: "/loan-calculator", label: "Loan Calculator" },
        { href: "/insurance-calculator", label: "Insurance Calculator" },
      ];
    } else if (hoverItem === "blog") {
      options = [
        { href: "/news", label: "News" },
        { href: "/reviews", label: "Reviews" },
      ];
    } else if (hoverItem === "more") {
      options = [
        { href: "/about", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
      ];
    }
    setSubMenuOptions(options);
  };

  // Only "search-cars" opens a submenu. Everything else navigates directly.
  const handleShowSubMenu = (link) => {
    // Always direct link for compare page
    if (link.href === "/compare-cars") {
      router.push("/compare-cars");
      return;
    }

    // If this link should open a submenu (only "search-cars"), open it
    if (link.hoverItem === "search-cars") {
      setActiveMenu(link);
      handleSetSubMenuOptions(link.hoverItem);
      return;
    }

    // Otherwise, if it has a regular href, navigate directly (e.g., Used Cars)
    if (link.href) {
      router.push(link.href);
      return;
    }

    // Fallback: if a hoverItem exists (services/blog/more) open submenu;
    // remove this block if you truly want ONLY search-cars to have submenu.
    if (link.hoverItem) {
      setActiveMenu(link);
      handleSetSubMenuOptions(link.hoverItem);
    }
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen((v) => !v);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-[9999] w-3/4 max-w-[480px] h-full bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } border-r border-gray-200`}
    >
      <div className="flex flex-col pb-20 mx-auto w-full max-w-[480px]">
        <div className="flex flex-col px-4 pt-2 w-full">
          <div className="flex justify-between items-center gap-5 pt-5 w-full">
            <Link
              href="/"
              className="flex items-center gap-2 mt-2 cursor-pointer"
              onClick={toggleNavigation}
            >
              <Image
                loading="lazy"
                src="/assets/img/car-prices-logo.png"
                className="w-[150px] object-contain"
                alt="logo"
                width={150}
                height={50}
              />
            </Link>
            <button
              onClick={toggleNavigation}
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Close menu"
            >
              <Image
                loading="lazy"
                src="/close-button.svg"
                className="shrink-0 w-6 h-6"
                alt="close"
                width={24}
                height={24}
              />
            </button>
          </div>

          {/* Sign-in / Profile Section */}
          <div className="flex items-center justify-between mt-5">
            {user ? (
              <div
                className="shadow-md relative py-2 px-4 rounded-full cursor-pointer flex items-center gap-2"
                onClick={handleProfileMenuToggle}
              >
                <div className="flex items-center capitalize justify-center w-8 h-8 rounded-full bg-blue-200 text-blue-600 font-bold">
                  {user?.username?.charAt(0)}
                </div>
                <KeyboardArrowDownIcon />
                {profileMenuOpen && (
                  <div className="absolute top-full z-20 left-0 mt-2 bg-white shadow-lg rounded-lg w-full py-2">
                    <Link
                      href="/setting/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleNavigation}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/setting/address"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={toggleNavigation}
                    >
                      Address
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        toggleNavigation();
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <PrimaryButton
                label="Sign In"
                additionalClass="!bg-black !border-black"
                onClick={handleSetIsLoginModalOpen}
              />
            )}
          </div>

          {activeMenu && (
            <h3
              onClick={() => setActiveMenu(null)}
              className="text-gray-600 font-bold pt-6 cursor-pointer hover:text-gray-800 transition flex items-center gap-1"
            >
              <KeyboardArrowLeftIcon /> {activeMenu.label}
            </h3>
          )}

          <div className="flex flex-col pt-6 gap-4 transition-all duration-300 ease-in-out">
            {/* Sub Menu */}
            <div
              className={`flex flex-col ml-3 gap-4 transition-all duration-300 transform ${
                activeMenu
                  ? "translate-x-0 opacity-100 h-auto"
                  : "-translate-x-full opacity-0 h-0 overflow-hidden"
              }`}
            >
              {subMenuOptions.map((item, index) => (
                <Link
                  key={`item-${index}`}
                  href={item.href}
                  onClick={toggleNavigation}
                  className="text-gray-700 font-medium hover:text-black transition px-4 py-2 rounded-lg hover:bg-gray-100 shadow-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Main Menu */}
            <div
              className={`flex flex-col gap-4 transition-all duration-300 transform ${
                activeMenu
                  ? "-translate-x-full opacity-0 h-0 overflow-hidden"
                  : "translate-x-0 opacity-100 h-auto"
              }`}
            >
              {links.map((link, index) => (
                <div
                  key={`link-${index}`}
                  onClick={() => handleShowSubMenu(link)}
                  className={`flex justify-between items-center ${
                    pathname === link.href ? "text-blue-600" : "text-gray-700"
                  } font-medium cursor-pointer hover:text-black transition px-4 py-3 rounded-lg hover:bg-gray-100 shadow-sm`}
                >
                  <div className="flex items-center gap-2">{link.label}</div>
                  {["search-cars", "services", "blog", "more"].includes(
                    link.hoverItem
                  ) && <KeyboardArrowRightIcon className="text-gray-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
