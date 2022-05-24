import "./_FAQ.scss";
import { useState, useEffect } from "react";
import { getFAQ } from "../../lib/func-firebase";
import classNames from "classnames";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [showAnswer, setShowAnswer] = useState(null);

  useEffect(() => {
    getFAQ((response) => {
      const faqFromFirebase = response.docs.map((doc) => ({
        question: doc.data().question,
        answer: doc.data().answer,
      }));
      setFaqs(faqFromFirebase);
    });
  }, []);


  return (
    <main className="container faq_page">
      <h1>FAQ</h1>
      <section>
        {faqs &&
          faqs.map((faq, index) => {
            return (
              <div key={index} className="faq">
                <h2 className={classNames({'active': showAnswer === index})} onClick={showAnswer === index ? () => setShowAnswer(null) :  () => setShowAnswer(index)}>
                  {index + 1}. {faq.question}
                </h2>
                {showAnswer === index && <p>{faq.answer}</p>}
              </div>
            );
          })}
      </section>
    </main>
  );
}
