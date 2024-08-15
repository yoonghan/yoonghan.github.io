module.exports = async (page, scenario, viewport) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector
  const clickSelector = scenario.clickSelectors || scenario.clickSelector
  const buttonClickByName = scenario.buttonClickByName
  const keyPressSelector =
    scenario.keyPressSelectors || scenario.keyPressSelector
  const scrollToSelector = scenario.scrollToSelector
  const scrollBySelector = scenario.scrollBySelector
  const postInteractionWait = scenario.postInteractionWait // selector [str] | ms [int]

  if (scrollBySelector) {
    await page.waitForSelector(scrollBySelector.id)
    await page.evaluate(
      ([{ id, posY }, viewPortHeight]) => {
        if (!id) {
          // eslint-disable-next-line no-console
          console.error("Definition is missing [id]")
        }
        const element = document.querySelector(id)
        element.scrollBy(0, posY || viewPortHeight)
      },
      [scrollBySelector, viewport.height]
    )
  }

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector)
      await page.type(
        keyPressSelectorItem.selector,
        keyPressSelectorItem.keyPress
      )
    }
  }

  if (hoverSelector) {
    for (const hoverSelectorIndex of [].concat(hoverSelector)) {
      await page.waitForSelector(hoverSelectorIndex)
      await page.hover(hoverSelectorIndex)
    }
  }

  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitForSelector(clickSelectorIndex)
      await page.click(clickSelectorIndex)
    }
  }

  if (buttonClickByName) {
    await page.getByRole("button", { name: buttonClickByName })
    await page.click(clickSelectorIndex)
  }

  if (postInteractionWait) {
    if (parseInt(postInteractionWait) > 0) {
      await page.waitForTimeout(postInteractionWait)
    } else if (postInteractionWait) {
      await page.waitForSelector(postInteractionWait)
    }
  }

  if (scrollToSelector) {
    await page.waitForSelector(scrollToSelector)
    await page.evaluate((scrollToSelector) => {
      document.querySelector(scrollToSelector).scrollIntoView()
    }, scrollToSelector)
  }
}
