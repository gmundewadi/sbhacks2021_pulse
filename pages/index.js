import React from "react";
import Link from "next/link";

export default function index() {
  return (
    <div>
      <Link href="/">
        <a>| Home | </a>
      </Link>
      <Link href="/instructor">
        <a>| I am an Instructor | </a>
      </Link>
      <Link href="/student">
        <a className="tab">| I am a Student | </a>
      </Link>
    </div>
  );
}
