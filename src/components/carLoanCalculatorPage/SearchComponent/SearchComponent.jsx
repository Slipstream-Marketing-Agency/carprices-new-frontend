import Image from "next/image";
import { useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/SearchOutlined";

export default function SearchComponent({
  options,
  fieldValue,
  placeholder,
  Formik,
  data,
  setData,
  setCurrentStep,
}) {
  const [query, setQuery] = useState("");

  const handleEdit = useCallback(
    (step, updatedFields) => {
      setData((prevData) => ({
        ...prevData,
        ...updatedFields,
      }));
      setCurrentStep(step);
    },
    [setCurrentStep, setData]
  );

  const filteredOptions = options.filter((item) =>
    fieldValue === "brand"
      ? item.brand.toLowerCase().includes(query.toLowerCase())
      : item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="tw-m-2">
      <div className="tw-text-xl tw-my-2 tw-capitalize">
        Choose {fieldValue}
      </div>
      <div className="tw-flex tw-gap-2">
        {data.brand && (
          <DataBadge
            iconSrc={data.brand_icon}
            label={data.brand}
            onClick={() =>
              handleEdit(0, {
                brand: "",
                brand_icon: "",
                model: "",
                year: "",
                variant: "",
              })
            }
          />
        )}
        {data.model && (
          <DataBadge
            label={data.model}
            onClick={() =>
              handleEdit(1, {
                model: "",
                year: "",
                variant: "",
              })
            }
          />
        )}
        {data.year && (
          <DataBadge
            label={data.year}
            onClick={() =>
              handleEdit(2, {
                year: "",
                variant: "",
              })
            }
          />
        )}
        {data.variant && <DataBadge label={data.variant} />}
      </div>

      <div className="tw-mt-1 tw-relative tw-rounded-md tw-shadow-sm">
        <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-pl-3 tw-flex tw-items-center tw-pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="tw-focus:ring-blue-500 tw-focus:border-blue-500 tw-block tw-p-2 tw-border tw-rounded-full tw-w-full tw-mb-4 sm:tw-text-sm tw-border-gray-300 tw-px-10"
          placeholder={placeholder}
        />
      </div>

      <div className="tw-mt-4 tw-h-96 tw-overflow-y-auto tw-rounded-md tw-custom_scrollbar">
        <ul
          className={
            fieldValue === "brand" ? "tw-grid tw-gap-2 tw-grid-cols-12" : "list"
          }
        >
          {filteredOptions.map((item, index) => (
            <li
              key={index}
              className={
                fieldValue === "brand"
                  ? "sm:tw-col-span-2 tw-col-span-3 tw-flex tw-justify-center tw-items-center"
                  : "tw-m-3 tw-opacity-70 tw-font-medium tw-cursor-pointer"
              }
              onClick={() => {
                Formik.setFieldValue(
                  fieldValue,
                  fieldValue === "brand" ? item.brand : item
                );
                if (fieldValue === "brand") {
                  Formik.setFieldValue("brand_icon", item.image);
                }
                Formik.handleSubmit();
              }}
            >
              {fieldValue === "brand" ? (
                <div>
                  <Image
                    src={item.image}
                    alt="icon-brand"
                    width={70}
                    height={70}
                    className="tw-cursor-pointer"
                  />
                  <div className="tw-capitalize tw-text-center tw-my-1 tw-text-xs">
                    {item.brand}
                  </div>
                </div>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const DataBadge = ({ iconSrc, label, onClick }) => (
  <div className="tw-flex tw-bg-lightblue tw-rounded-full tw-p-2 tw-mb-4 tw-items-center tw-gap-1">
    {iconSrc && <Image src={iconSrc} alt="brand-icon" height={20} width={20} />}
    <div className="tw-capitalize tw-text-xs">{label}</div>
    <Image
      src={"/carLoanPage/edit-icon.svg"}
      width={25}
      height={20}
      className="tw-cursor-pointer"
      alt="edit-icon"
      onClick={onClick}
    />
  </div>
);
