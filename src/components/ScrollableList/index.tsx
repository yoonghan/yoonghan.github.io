"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import style from "./ScrollableList.module.css"
import { useDebounceValue } from "usehooks-ts"

type Props = {
  listItems: { id: string; content: React.ReactNode }[]
  maxItemsToRender: number
  noRef?: boolean
}

const heightOfItem = 30 //base on item css in px

const ScrollableList = ({ listItems, maxItemsToRender, noRef }: Props) => {
  const listRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollToTop, setScrollToTop] = useState(0)
  const [debounceScrollToTop] = useDebounceValue(scrollToTop, 10)

  const startPosition = useMemo(
    () =>
      scrollPosition - maxItemsToRender > 0
        ? scrollPosition - maxItemsToRender
        : 0,
    [maxItemsToRender, scrollPosition],
  )

  const endPosition = useMemo(
    () =>
      scrollPosition + maxItemsToRender >= listItems.length
        ? listItems.length
        : scrollPosition + maxItemsToRender,
    [listItems.length, maxItemsToRender, scrollPosition],
  )

  useEffect(() => {
    const newScrollPosition = debounceScrollToTop / heightOfItem
    const difference = Math.abs(scrollPosition - newScrollPosition)

    if (difference >= maxItemsToRender / 5) {
      setScrollPosition(newScrollPosition)
    }
  }, [debounceScrollToTop, maxItemsToRender, scrollPosition])

  const updateScrollPosition = useCallback(() => {
    setScrollToTop(listRef.current!.scrollTop)
  }, [])

  useEffect(() => {
    if (listRef.current !== null) {
      const ref = listRef.current
      ref.addEventListener("scroll", updateScrollPosition, false)
      return () => {
        queueMicrotask(() => {
          ref.addEventListener("scroll", updateScrollPosition, false)
        })
      }
    }
  }, [updateScrollPosition])

  return (
    <div
      className={style.container}
      ref={noRef ? null : listRef}
      data-testid="scrollable-list"
    >
      <div
        style={{
          height: startPosition * heightOfItem,
        }}
      />
      {listItems.slice(startPosition, endPosition).map((item) => (
        <div key={"list-item-" + item.id} className={style.list}>
          {item.content}
        </div>
      ))}
      <div
        key="list-spacer-bottom"
        style={{
          height: listItems.length * heightOfItem - endPosition * heightOfItem,
        }}
      />
    </div>
  )
}

export default ScrollableList
