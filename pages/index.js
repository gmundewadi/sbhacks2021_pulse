import React from "react";
import Link from "next/link";

import '../styles/index.css';

export default function index() {
  return (
    <div className={'index'}>
      <header>Who are you?</header>
      {/* <Link href="/">
        <a>| Home | </a>
      </Link> */}
      <div className={'links'}>
        <Link href="/instructor">
          <a>I am an Instructor</a>
        </Link>
        <Link href="/studentSetup">
          <a className="tab">I am a Student</a>
        </Link>
      </div>
    </div>
  );
}
