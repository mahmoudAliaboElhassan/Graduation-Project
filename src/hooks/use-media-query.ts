import React, { useEffect, useState } from "react";

interface Props {
  query: string;
}

const UseMediaQuery = ({ query }: Props) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    console.log("mediaQuery");
    console.log(mediaQuery);
    const handleChange = (e: any) => {
      console.log(e);
      setMatches(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
  }, [query]);
  return matches;
};

export default UseMediaQuery;
