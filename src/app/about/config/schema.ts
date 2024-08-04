import { site } from "@/config/site"

const schema = {
  "@context": "http://schema.org",
  "@type": "LocalBusiness",
  name: "Walcron",
  image: `${site.url}/img/logo/logo-color.svg`,
  email: "walcoorperation@gmail.com",
  url: `${site.url}/`,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: {
      "@type": "DayOfWeek",
      name: "Monday-Sunday",
    },
    opens: "2014-07-04T9:00",
    closes: "2020-07-04T9:00",
  },
}

export { schema }
