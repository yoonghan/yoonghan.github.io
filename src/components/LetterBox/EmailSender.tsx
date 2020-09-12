`use strict`

import * as React from "react";

interface EmailSenderProps {
  writeTo: string;
  writeFrom: string;
}

const _openMailSender = (writeTo:string, writeFrom:string) => {

  const subject = encodeURIComponent(`Contact from ${writeFrom}`);
  const body = "Hello there, ";

  window.location.href = `mailto:${writeTo}?subject=${subject}&body=${body}`;
}

const EmailSender: React.SFC<EmailSenderProps> = ({writeTo, writeFrom}) => {

  _openMailSender(writeTo, writeFrom);

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
