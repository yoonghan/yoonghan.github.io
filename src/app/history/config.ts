import {
  faLightbulb,
  faRocket,
  faAtom,
  faSpinner,
  faServer,
  faCog,
  faBoltLightning,
  faMagnifyingGlass,
  faCertificate,
} from "@fortawesome/free-solid-svg-icons"
import { IEvent } from "@/components/Timeline"

export const nonFictionBooks = [
  {
    title: "The subtle art of not giving a f**k",
    learnt: "Funny amazing history and how to be a better person.",
  },
  {
    title: "Digital Darwinism",
    learnt: "Innovation and embracing change and being different.",
  },
  {
    title: "Machine that thinks",
    learnt: "AI and usage for current world. Not so useful.",
  },
  {
    title: "The dragon behind the glass",
    learnt:
      "Vast history of fish keeping. Treasure nature and don't be tempted by popularity it's just marketing.",
  },
  {
    title: "Out of the maze",
    learnt: "Self improvement and be adaptive. Time is not an excuse.",
  },
  {
    title: "Brief history of time",
    learnt:
      "Mind blowing stuff about the universe. What we can't see doesn't actually meant it's not there.",
  },
  {
    title: "When breath becomes air",
    learnt:
      "When you are meeting the inevitable death, is it worth looking back?",
  },
  {
    title: "The girl with seven names",
    learnt:
      "Environment makes what you are, without looking out the window everything may had seem better.",
  },
]

export const siteHistory: IEvent[] = [
  {
    id: "2014",
    date: "2014",
    special: "Launch of idea",
    desc: "Started off as Jom Jaring and hosted on Wix",
    faIcon: faLightbulb,
  },
  {
    id: "2015",
    date: "2015",
    special: "Self-hosting website",
    desc: "Relaunch as Walcron and and host to Openshift",
    faIcon: faRocket,
  },
  {
    id: "2016",
    date: "2016",
    desc: "Made into cloudflare and learn heavily on Javascript",
  },
  {
    id: "2017",
    date: "2017",
    special: "Learned along React Native",
    desc: "Migrated from Vanilla JS to ReactJS",
    faIcon: faAtom,
  },
  {
    id: "2018",
    date: "2018",
    special: "Hosted on Heroku",
    desc: "Rewrite site UI and added UI/UX flow",
  },
  {
    id: "2019",
    date: "2019",
    special: "Hosted on now.sh",
    desc: "Rewrite site UI with server-side support",
  },
  {
    id: "2020",
    date: "2020",
    desc: "Release with parallaxing, migrated to Now 2.0",
    faIcon: faSpinner,
  },
  {
    id: "2022",
    date: "2022",
    desc: "Migrate to Latest NextJS with a full CI/CD deployment",
    faIcon: faServer,
  },
  {
    id: "2023",
    date: "January-2023",
    special: "Host in Vercel",
    desc: "Migrated to NextJS 13",
    faIcon: faCog,
  },
  {
    id: "March-2023",
    date: "March-2023",
    desc: "Development focus on Rust",
  },
  {
    id: "May-2023",
    date: "May-2023",
    desc: "Add Web RTC technology",
  },
  {
    id: "Jan-2024",
    date: "January-2024",
    desc: "Learning PureCSS component",
  },
  {
    id: "Aug-2024",
    date: "August-2024",
    desc: "New homepage for performance",
    faIcon: faBoltLightning,
  },
  {
    id: "Jan-2025",
    date: "Jan-2025",
    special: "AWS Associate Certified",
    desc: "Add OpenTelemetry and monitoring",
    faIcon: faMagnifyingGlass,
  },
  {
    id: "Jun-2025",
    date: "Jun-2025",
    special: "Azure Expert Certified",
    desc: "Successfully Migrated to NextJS 15",
    faIcon: faCertificate,
  },
]
