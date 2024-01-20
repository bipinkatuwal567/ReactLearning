import { Children, useState } from "react";
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
  const [isActive, setIsActive] = useState(null);


  return(
    <div className="accordion">
      {
        faqs.map((faq, i) => 
        (
        <AccordionItem 
          title={faq.title}  
          key={i} 
          num={i}
          onActive={setIsActive}
          isActive={isActive}>
            {
              faq.text
            }
          </AccordionItem>))
      }
    </div>
  )
}

function AccordionItem({num, title, onActive, isActive, children}){
  const active = num === isActive;

  function handleClick(){
    onActive(active ? null : num);
  }
  return(
    <div className={`item ${active ? "open" : ""}`} onClick={handleClick}>
    <p className="number">{num < 9 ? `0${num+1}` : num+1}</p>
    <p className="title">{title}</p>
    <p className="icon">{active ? "-" : "+"}</p>
    {
      active && 
    <div className="content-box">{children}</div>
    }
  </div>
  )
}

export default App
