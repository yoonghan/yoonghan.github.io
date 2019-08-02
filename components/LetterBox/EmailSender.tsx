`use strict`

import * as React from "react";
import {EMAIL} from "../../shared/const";

interface EmailSenderProps {
  writeTo: string
}

const _openMailSender = (writeTo:string) => {

  const subject = encodeURIComponent(`Contact from ${writeTo}`);
  const body = "Hello there, ";

  const toEmail = EMAIL.replace(/_/g, "");

  window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
}

const EmailSender: React.SFC<EmailSenderProps> = ({writeTo}) => {

  _openMailSender(writeTo);

  return (<div className="container">
    Using your functioning mailbox.
    <style jsx>{`
      .container {
        padding: 50px;
        background: #FFF;
        color: #000;
        border-radius: 3px;
        min-width: 150px;
      }
    `}</style>
  </div>)
}

export default EmailSender;
