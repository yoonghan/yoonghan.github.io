import HtmlHead from "@/components/HtmlHead"
import Image from "next/image"

const ClarenceBday = () => {
  return (
    <>
      <HtmlHead
        title={"Map to Clarence B'day party"}
        description={
          "Site history and External knowledge and things I worked on."
        }
      />
      <h1>Welcome To Clarence&apos;s Birthday</h1>
      <br />
      <p>
        You&apos;re cordinally invited to our son, Clarence&apos;s first
        birthday. Sincere thank you, from &quot;Lee Wan/Mother&quot; and
        &quot;Yoong Han/father&quot;.
      </p>
      <table style={{ padding: "2rem" }}>
        <tbody>
          <tr>
            <td>Time:</td>
            <td>5:00pm onwards</td>
          </tr>
          <tr>
            <td>Date:</td>
            <td>19th Feb, Sunday</td>
          </tr>
          <tr>
            <td>Venue:</td>
            <td>
              #04-03, Kingston Terrace, 8B Jalan Masjid, 418929 Singapore.
            </td>
          </tr>
          <tr>
            <td>Serve:</td>
            <td>Halal Catering</td>
          </tr>
        </tbody>
      </table>
      <div style={{ padding: "1rem" }}>
        <strong>To get here:</strong>
        <ol>
          <li>The place is only 2 minutes walk from Kembangan MRT.</li>
          <li>
            Please walk via the pathway next to the river. and there is a small
            stairways next to &quot;Seng Kee&quot; restaurant.
          </li>
        </ol>
        <strong>If you plan to drive:</strong>
        <ol>
          <li>
            There are no parking in the apartment area, the best are only 2 paid
            parking area at Kembangan Plaza or Kembangan Court
          </li>
        </ol>
      </div>

      <p>
        <a href="https://goo.gl/maps/xCFjfqxhNzdoRoi7A">
          Maps - https://goo.gl/maps/xCFjfqxhNzdoRoi7A
        </a>
      </p>
      <Image
        src="/img/clarencebday/parking.jpg"
        alt="parking"
        width={1180}
        height={1180}
        layout="responsive"
      />
    </>
  )
}

export const config = { runtime: "nodejs" }

export default ClarenceBday
