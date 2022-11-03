import React from "react";

export default function Header(props: { title: string }) {
  return <div className="header">{props.title}</div>;
}
