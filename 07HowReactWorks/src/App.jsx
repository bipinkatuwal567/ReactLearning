import { useState } from 'react'

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];


function App() {

  return (
    <div>
      <Tabbed content={content} />
    </div>
  )
}

function Tabbed({content}){
  const [activeTab, setActiveTab] = useState(0);
  return(
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab num={1} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Tab num={2} activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Tab num={3} activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>
      {
        activeTab <= 2 
        ?
        (
          <TabContent 
            content={content.at(activeTab)}
            key={content.at(activeTab).summary}
          />
        )
        :
        (
          <DifferentContent />
        )
      }
    </div>
  )
}

function Tab({num, activeTab, setActiveTab}){
  return(
    <button 
    className={`${activeTab === num && "active"} tab`}
    onClick={() => setActiveTab(num)}
    >
      Tab {num+1}
    </button>
  )
}

function TabContent({content}){
  const [like, setLike] = useState(0);
  const [showContent, setShowContent] = useState(true);

  return(
    <div className='tab-content'>
      <h4>{content.summary}</h4>
      <p>{showContent ? content.details : ""}</p>

      <div className="tab-actions">
        <button onClick={() => setShowContent(showContent => !showContent)}>{showContent ? "Hide" : "Show"} details</button>

        <div className="hearts-counter">
          <span >{like} ❤️</span>
          <button onClick={() => setLike(like => like+1)}>+</button>
          <button onClick={() => setLike(like => like+3)}>+++</button>
        </div>

      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>

    </div>
  )
}

function DifferentContent(){
  return(
    <div className="tab-content">
      <h4>I'm a Different tab, so I reset state💣💥</h4>
    </div>
  )
}

export default App
