function TabButton(props) {
    const { active, label, onClick } = props;
    const className = `text-gray-700 font-medium py-2 px-4 border border-gray-300 ${active ? 'bg-gray-200 rounded-l-md' : 'rounded-r-md'
        }`;
    return (
        <button onClick={onClick} className={className}>
            {label}
        </button>
    );
}

function TabBar(props) {
    const { activeTab, onTabChange } = props;
    return (
        <div className="flex justify-center mt-4">
            <TabButton
                label="Saved Queries"
                active={activeTab === 'savedQueries'}
                onClick={() => onTabChange('savedQueries')}
            />
            <TabButton
                label="Templates"
                active={activeTab === 'templates'}
                onClick={() => onTabChange('templates')}
            />
            <TabButton
                label="Scheduler"
                active={activeTab === 'scheduler'}
                onClick={() => onTabChange('scheduler')}
            />
        </div>
    );
}

export default TabBar;
