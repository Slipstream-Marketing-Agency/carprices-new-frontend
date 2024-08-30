import React from "react";

export default function RadioButton() {
  return (
    <div>
      <ul class="grid w-1/2 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="Yes"
            name="hosting"
            value="Yes"
            class="hidden peer"
            required
          />
          <label
            for="Yes"
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-black peer-checked:border-red-500 peer-checked:text-black hover:text-gray-100 hover:bg-gray-100 dark:text-gray-400  dark:hover:bg-gray-100"
          >
            <div class="block">
              <div class="w-full">Yes</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="No"
            name="hosting"
            value="No"
            class="hidden peer"
          />
          <label
            for="No"
            class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-black peer-checked:border-red-500 peer-checked:text-black hover:text-gray-100 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-100"
          >
            <div class="block">
              <div class="w-full">No</div>
            </div>
          </label>
        </li>
      </ul>
    </div>
  );
}
