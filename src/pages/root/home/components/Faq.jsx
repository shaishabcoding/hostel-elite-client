const Faq = () => {
  const faqs = [
    {
      question: "What are the check-in and check-out times?",
      answer:
        "At Hostel Elite, check-in time is from 2:00 PM onwards, and check-out time is before 11:00 AM.",
    },
    {
      question: "What payment methods does Hostel Elite accept?",
      answer:
        "Hostel Elite accepts payments via credit card, debit card, online banking, and UPI. Cash payments are also accepted at the front desk.",
    },
    {
      question: "Are meals included in the hostel fee at Hostel Elite?",
      answer:
        "Yes, the hostel fee at Hostel Elite includes breakfast, lunch, and dinner. We can accommodate special dietary requirements upon request.",
    },
    {
      question: "Is Wi-Fi available at Hostel Elite?",
      answer:
        "Yes, high-speed Wi-Fi is available throughout the premises of Hostel Elite free of charge.",
    },
    {
      question: "Does Hostel Elite provide laundry services?",
      answer:
        "Yes, Hostel Elite provides laundry services. Laundry facilities are available on-site for a nominal fee.",
    },
    {
      question: "What is the cancellation policy at Hostel Elite?",
      answer:
        "Cancellations made 48 hours before the check-in date are fully refundable. Cancellations made less than 48 hours before check-in will incur a one-night charge.",
    },
    {
      question: "Are visitors allowed at Hostel Elite?",
      answer:
        "Visitors are allowed in the common areas until 9:00 PM. Overnight stays for visitors are not permitted.",
    },
    {
      question: "What safety measures are in place at Hostel Elite?",
      answer:
        "Hostel Elite is equipped with 24/7 security, CCTV surveillance, and secure keycard access to ensure the safety of all residents.",
    },
    {
      question: "Does Hostel Elite offer private rooms?",
      answer:
        "Yes, Hostel Elite offers both private rooms and shared dormitory options to cater to different preferences and budgets.",
    },
    {
      question: "How can I book a stay at Hostel Elite?",
      answer:
        "You can book a stay at Hostel Elite through our website, by calling our front desk, or through various online booking platforms.",
    },
  ];

  return (
    <div className="px-4 lg:px-0 mb-4 md:mb-10">
      <h2 className="text-xl font-bold md:text-4xl my-8 lg:my-16 text-center dark:text-white">
        FAQ
      </h2>
      <div className="join join-vertical w-full">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="collapse collapse-arrow join-item border border-base-300 dark:bg-gray-600 dark:text-white dark:border-gray-400"
          >
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content text-gray-700 dark:text-gray-300">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
