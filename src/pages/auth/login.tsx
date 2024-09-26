import React from "react";

interface Props {
  name: string;
}

function Login({ name }: Props) {
  return <div>Login {name}</div>;
}

export default Login;
