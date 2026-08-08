
"use client";

import Header from "./Header";

export default function HeaderWrapper() {
  // Aap yahan global state ya context se setIsOpen pass kar sakte hain
  const handleToggle = () => {
    // Mobile menu toggle logic
  };

  return <Header setIsOpen={handleToggle} />;
}