import "@/__tests__/mocks/site"
import { schema } from "./schema"

describe("schemaGenerator", () => {
  it("should contain configurable imaged and url", () => {
    expect(schema).toStrictEqual({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      email: "walcoorperation@gmail.com",
      image: "https://mockedUrl.com/img/logo/logo-color.svg",
      name: "Walcron",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        closes: "2020-07-04T9:00",
        dayOfWeek: {
          "@type": "DayOfWeek",
          name: "Monday-Sunday",
        },
        opens: "2014-07-04T9:00",
      },
      url: "https://mockedUrl.com/",
    })
  })
})
