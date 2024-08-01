import Card from "@/components/Card"
import { site } from "@/config/site"

const Cards = (
  <div style={{ background: "#222" }}>
    <Card
      cards={[
        {
          id: "1",
          title: "Sample 1",
          description: "Lorem ipsum lore",
          href: site.url,
        },
        {
          id: "2",
          title: "Sample 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare ipsum quis commodo faucibus. Nam gravida blandit turpis ut pretium. In dui dui, feugiat dictum vestibulum sed, vulputate ac mi. Nunc sit amet tempor dolor, sed viverra dui. Nunc aliquam sodales ante at dignissim. Cras cursus ipsum ut tincidunt faucibus. Phasellus tincidunt, turpis ullamcorper laoreet pellentesque, lorem tortor aliquet quam, vitae tristique quam magna non sapien. Cras scelerisque diam scelerisque, feugiat neque ut, viverra dui. Curabitur non ornare velit. In ac ipsum cursus, mattis erat vitae, ornare orci. Integer ac tortor libero.",
          href: site.url,
        },
        {
          id: "3",
          title: "Sample Long Title Of Many",
          description: "Short message comprendo.",
          href: site.url,
        },
        {
          id: "4",
          title: "Sample 4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ornare ipsum quis commodo faucibus. Nam gravida blandit turpis ut pretium. In dui dui, feugiat dictum vestibulum sed, vulputate ac mi. Nunc sit amet tempor dolor, sed viverra dui. Nunc aliquam sodales ante at dignissim. Cras cursus ipsum ut tincidunt faucibus. Phasellus tincidunt, turpis ullamcorper laoreet pellentesque, lorem tortor aliquet quam, vitae tristique quam magna non sapien. Cras scelerisque diam scelerisque, feugiat neque ut, viverra dui. Curabitur non ornare velit. In ac ipsum cursus, mattis erat vitae, ornare orci. Integer ac tortor libero.",
          href: site.url,
        },
      ]}
    />
  </div>
)

export default Cards
