import { useState } from "react";
import "./index.css";

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

function App() {

  return (
    <div>
      <Accordion />
    </div>
  )
}

function Accordion(){


  return(
    <div className="accordion">
      {
        faqs.map((faq, i) => 
        (
        <AccordionItem 
          title={faq.title} 
          text={faq.text} 
          key={i} 
          num={i}
        />))
      }
    </div>
  )
}

function AccordionItem({num, title, text}){
  const [isActive, setIsActive] = useState(false);

  function handleClick(){
    setIsActive(isActive => !isActive);
  }
  return(
    <div className={`item ${isActive ? "open" : ""}`} onClick={handleClick}>
    <p className="number">{num < 9 ? `0${num+1}` : num+1}</p>
    <p className="title">{title}</p>
    <p className="icon">{isActive ? "-" : "+"}</p>
    {
      isActive && 
    <div className="content-box">{text}</div>
    }
  </div>
  )
}

export default App
