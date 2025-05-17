import {
  findAllChildByPath,
  sortedMenuPagesWithFilteredHomeAndSubMenu,
} from "@/config/pages"

const menuItems = sortedMenuPagesWithFilteredHomeAndSubMenu.map((menu) => {
  const { display, path } = menu
  const items = findAllChildByPath(path).map((subMenu) => ({
    label: subMenu.display,
    url: subMenu.path,
  }))

  if (items.length === 0) {
    return {
      label: display,
      url: path,
    }
  } else {
    return {
      label: display,
      url: path,
      ...items
    }
  }
})

export default menuItems
