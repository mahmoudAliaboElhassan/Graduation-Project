function UseInitialStates() {
  const initialStateMode: {
    mymode: "dark" | "light";
  } = {
    // Check if the localStorage value is either "dark" or "light", else default to "dark"
    mymode: (localStorage.getItem("mymode") as "dark" | "light") || "dark",
  };
  const initialStateAuth={
    
  }

  return { initialStateMode ,initialStateAuth};
}

export default UseInitialStates;
