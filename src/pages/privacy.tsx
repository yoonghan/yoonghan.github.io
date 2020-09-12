import * as React from "react";
import { HtmlHead } from '../components/HtmlHead';
import HeaderOne from "../components/HeaderOne";
import ScrollToTop from '../components/ScrollToTop';
import {FOREGROUND} from "../shared/style";
import Footer from "../components/Footer";
import CommandBar from '../components/CommandBar';


const Privacy:React.SFC<any> = () => {
  return (
    <React.Fragment>
      <HtmlHead
        title="Privacy"
        description="Walcron Coorperation is a basic company setup by Yoong Han and Lee Wan for World Wide Web research purposes."
        />
      <CommandBar/>
      <div className="container">
        <HeaderOne title={"Privacy Policy"} isLined={true}/>
        <section>
<p>
This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.
</p>
<p>
What personal information do we collect from the people that visit our blog, website or app?
</p>
<p>
When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number or other details to help you with your experience.
</p>
<p>
When do we collect information?
</p>
<p>
We collect information from you when you register on our site, place an order, subscribe to a newsletter or enter information on our site.
</p>
<p>
How do we use your information?
</p>
We may use the information we collect from you when you register, make a purchase or use certain other site features in the following ways:
<ul>
  <li>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.</li>
  <li>To improve our website in order to better serve you.</li>
  <li>To allow us to better service you in responding to your customer service requests.</li>
  <li>To administer a contest, promotion, survey or other site feature.</li>
</ul>

<em>How do we protect visitor information?</em>
<p>
Our website and app is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible.
</p>
<p>
Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.
</p>
<p>
We implement a variety of security measures when a user places an order enters, submits, or accesses their information to maintain the safety of your personal information.
</p>
<em>Do we use 'cookies'?</em>
<p>
No. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart.
</p>
<em>Third Party Disclosure</em>
<p>
We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information unless we provide you with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
</p>
<p>
However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
</p>

<em>Third party links</em>
<p>
We do not include or offer third party products or services on our website.
</p>
<p>
Google
</p>
<p>
Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en
</p>
<p>
Google, as a third party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy.
</p>
<em>COPPA (Children Online Privacy Protection Act)</em>

<p>
When it comes to the collection of personal information from children under 13, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, the nation's consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.
</p>
<p>
We do not specifically market to children under 13.
</p>
<p>
Fair Information Practices
</p>
<p>
The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.
</p>
<p>
In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur: we will notify the users via email within 7 business days.
</p>
<p>
We also agree to the individual redress principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or a government agency to investigate and/or prosecute non-compliance by data processors.
</p>
<em>Contacting Us</em>
<p>
If there are any questions regarding this privacy policy you may <a href="/about">contact us</a>.
</p>
<p>
Regards,
<br/>
Walcoorperation
</p>
<br/>
        </section>
        <div className="footer"/>
      </div>
      <ScrollToTop/>
      <Footer/>
      <style jsx>{`
        i {
          font-style: italic;
          font-weight: bold;
          font-size: 1.1rem;
        }
        i:before, i:after {
          content: '"';
        }
        p {
          padding: 10px 30px;
        }
        .about {
          padding: 20px;
        }
        h2, h3, h4 {
          text-align: center;
        }
        .container {
          max-width: 640px;
          margin: auto;
          padding-top: 100px;
          color: ${FOREGROUND};
        }
        .footer {
          padding-bottom: 50px;
        }
        .letterbox {
          padding: 10px 30px;
        }
      `}</style>
    </React.Fragment>
  );
}

export default Privacy;
