"use client"

import { Accordion } from "@yoonghan/walcron-microfrontend-shared"

const model = [
  {
    label: "Collections",
    content:
      "Synthetic sugars to use collection correctly without side-effects.",
  },
  {
    label: "Immutability",
    content:
      "Concept of val and const that prevents immutability and to use collections (Haskell like) trigger.",
  },
  {
    label: "Mathematical representation",
    content:
      "Understanding the concept of programming paradigm. Like higher order functions, currying.",
  },
  {
    label: "Type and Pattern Matching",
    content: "Using match and generics. Was not too strong on this.",
  },
  {
    label: "Benefits",
    content:
      "Boost of confidence in writing good programming functions and ease pickup of both Kotlin and Javascript.",
  },
]

export function ScalaFunctionalProgrammingArticle() {
  return (
    <article>
      <p className="text-2xl">Functional Programming Principal In Scala</p>

      <Accordion model={model} groupName={"functional-programming-in-scala"} />
    </article>
  )
}
