import { useState, useEffect } from "react";
import { getFAQ } from "../../lib/func-firebase";

export default function FAQ() {
const [faq, setFaq] = useState([]);
    useEffect(() => {
        getFAQ((response) => {
          const faqFromFirebase = response.docs.map((doc) => ({
            question: doc.data().question,
            answer: doc.answer,
          }));
          setFaq(faqFromFirebase);
        });
      }, []);

      console.log(faq)

  return (
    <main className="container">
      <h1>FAQ</h1>
{}
    </main>
  );
}
