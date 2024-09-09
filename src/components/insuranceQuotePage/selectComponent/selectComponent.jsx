import Select from 'react-select';

export default function SelectComponent({
  selectedOption,
  setSelectedOption,
  selectOptions,
  placeholder
}) {
  return (
    <div className='w-full'>
      <Select
        value={selectOptions.find(option => option.value === selectedOption)} // Make sure value is selected correctly
        onChange={(option) => setSelectedOption(option)}  // Pass selected option to parent
        placeholder={placeholder}
        options={selectOptions}
        isSearchable
      />
    </div>
  );
}
