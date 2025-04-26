"use client"

export function DomainTransfer() {
  return (
    <article>
      <strong className="text-2xl">
        Domain Transfer from GoDaddy to Cloudflare
      </strong>
      <p>
        Had been a loyal customer of GoDaddy for 10 years, but price charges
        from them was insanely high - USD65 per year?!
      </p>
      <p>
        Decided to move to Cloudflare which was only USD10/per year for the
        domain.
      </p>

      <strong className="pt-3">Steps:</strong>
      <ol>
        <li>
          Had change GoDaddy NS to Cloudflare and setup the domain here for
          quite some years.
        </li>
        <li>
          Login to Cloudflare and double check if walcron.com is listed in
          Domain Registration.
        </li>
        <li>Login to GoDaddy and make sure domainproxy email is forwarded.</li>
        <li>
          Initiate transfer from GoDaddy, then an authorization Code was
          emailed.
        </li>
        <li>
          Check the domain is unlocked in GoDaddy and browse WHOIS for
          walcron.com domain and make sure it is &quot;Domain Status: ok
          http://icann.org/epp#ok&quot;
        </li>
        <li>
          Goto Domain Transfer in Cloudflare, and fingers crossed it allows
          transfer. Might take up to a day.
        </li>
        <li>
          Trigger the transfer in Cloudflare and enter the Authorization Code.
        </li>
        <li>
          Fill-in and the form to Initiate a transfer. Once done, I received an
          email from GoDaddy.
        </li>
        <li>Follow the email of GoDaddy to approve the transfer</li>
        <li>
          WALA! All done. Best checked once more in Cloudflare and WHOIS to make
          sure domain is locked and secured.
        </li>
      </ol>
    </article>
  )
}
