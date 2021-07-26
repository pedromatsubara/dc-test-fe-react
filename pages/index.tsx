import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (window && window.location) {
      window.location.href = "/orders";
    }
  });

  return <div></div>;
}
