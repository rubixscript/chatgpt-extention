function InputForm(props) {
    const { activeTab, input, categoryInput, onInputChange, onCategoryInputChange, onSubmit, onSchedule, onRun, onSave, onClear } = props;
    return (
        <div className="flex flex-col items-center">
            <textarea
                value={input}
                onChange={onInputChange}
                rows="4"
                cols="100"
                className="w-full p-2 mb-4 border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex flex-row mb-4">
                {activeTab !== 'scheduler' &&
                    <>
                        <button onClick={onSubmit} className="bg-green-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-green-600">
                            Submit
                        </button>
                        {activeTab === 'savedQueries' &&
                            <button onClick={onSave} className="bg-blue-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-blue-600">
                                Save
                            </button>}
                        {/* <button onClick={onSchedule(input)} className="bg-orange-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-orange-600">
                            Schedule
                        </button> */}
                        <button onClick={onClear} className="bg-gray-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-gray-600">
                            Clear
                        </button>
                    </>}  {activeTab === 'scheduler' &&
                        <button onClick={onRun} className="bg-green-500 text-white py-1 px-2 ml-2 rounded shadow-md hover:bg-green-600">
                            Run
                        </button>}
            </div>
            <input
                type="text"
                placeholder="Category"
                value={categoryInput}
                onChange={onCategoryInputChange}
                className="border border-gray-300 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

        </div>
    );
}

export default InputForm;