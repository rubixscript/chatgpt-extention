/* global chrome */
import { useState, useEffect } from 'react';
import './App.css';
import SavedQueries from './components/SavedQueries'
import Templates from './components/Templates'
import Scheduler from './components/Scheduler'
// import QueryHistory from './components/QueryHistory'
import InputForm from './components/InputForm'
import TabBar from './components/TabBar'

function App() {
  const [input, setInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [scheduleJobs, setScheduleJobs] = useState([]);
  const [queryHistory, setQueryHistory] = useState([]);
  const [savedQueries, setSavedQueries] = useState(() => {
    const saved = localStorage.getItem('savedQueries');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('savedQueries');

  useEffect(() => {
    localStorage.setItem('savedQueries', JSON.stringify(savedQueries));
  }, [savedQueries]);

  const updateQueryHistory = (query) => {
    const newHistory = [query, ...queryHistory.slice(0, 9)];
    setQueryHistory(newHistory);
  };

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleClear = () => {
    setInput('');
    setCategoryInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSaveQuery = () => {
    // Save the query with the category
    const newQuery = {
      text: input,
      category: categoryInput || "general"
    };
    setSavedQueries([...savedQueries, newQuery]);
    setInput('');
    setCategoryInput('');
  };

  const handleCategoryChange = (index, newCategory) => {
    const updatedQueries = [...savedQueries];
    updatedQueries[index].category = newCategory;
    setSavedQueries(updatedQueries);
  };

  const handleSubmit = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(input);
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: (query) => {
          const chatGptTextArea = document.querySelector('textarea[placeholder="Send a message."]');
          if (chatGptTextArea) {
            chatGptTextArea.value = query;
            const enterKeyEvent = new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "Enter",
              keyCode: 13,
            });
            chatGptTextArea.dispatchEvent(enterKeyEvent);
          }
        },
        args: [input],
      });
    });
    updateQueryHistory(input);
  };

  const handleSchedule = (input) => {
    setScheduleJobs([...savedQueries, input]);

  };

  const handleRun = () => {
    const interval = 30000; // 30 seconds

    const runScheduledJobs = async () => {
      for (const job of scheduleJobs) {
        // Call handleSubmitSavedQuery with the job value
        handleSubmitSavedQuery(job.value);

        // Remove job from the scheduleJobs list
        handleRemoveScheduleJob(job.id);

        // Wait for 30 seconds before executing the next job
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    };

    runScheduledJobs();
  };

  const handleSubmitSavedQuery = (query) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log(query);
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: (q) => {
          const chatGptTextArea = document.querySelector('textarea[placeholder="Send a message."]');
          if (chatGptTextArea) {
            chatGptTextArea.value = q;
            const enterKeyEvent = new KeyboardEvent("keydown", {
              bubbles: true,
              cancelable: true,
              key: "Enter",
              keyCode: 13,
            });
            chatGptTextArea.dispatchEvent(enterKeyEvent);
          }
        },
        args: [query],
      });
    });
    updateQueryHistory(input);
  };
  const handlePutQueryInTextArea = (query) => {
    setInput(query);
  };

  const handleRemoveQuery = (index) => {
    setSavedQueries(savedQueries.filter((_, i) => i !== index));
  };

  const handleRemoveScheduleJob = (index) => {
    setScheduleJobs(scheduleJobs.filter((_, i) => i !== index));
  };

  const renderTabContent = () => {
    if (activeTab === 'savedQueries') {
      return (
        <SavedQueries
          savedQueries={savedQueries}
          onRemoveQuery={handleRemoveQuery}
          onSubmitQuery={handleSubmitSavedQuery}
          onPutQueryInTextArea={handlePutQueryInTextArea}
          onCategoryChange={handleCategoryChange}
        />
      );
    } else if (activeTab === 'templates') {
      return (
        <Templates
          onPutQueryInTextArea={handlePutQueryInTextArea}
        />
      );
    }
    else if (activeTab === 'scheduler') {
      return (
        <Scheduler
          scheduleJobs={scheduleJobs} onRemoveScheduleJob={handleRemoveScheduleJob}
        />
      );
    }
  };



  return (
    <div className="App min-w-[450px]">
      <h1>ChatGPT Extension</h1>
      <InputForm
        activeTab={activeTab}
        input={input}
        categoryInput={categoryInput}
        onInputChange={handleInputChange}
        onCategoryInputChange={handleCategoryInputChange}
        onSubmit={handleSubmit}
        onSchedule={handleSchedule}
        onRun={handleRun}
        onSave={handleSaveQuery}
        onClear={handleClear}
      />

      <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="mt-4 px-4">{renderTabContent()}</div>
    </div>
  );
}

export default App;