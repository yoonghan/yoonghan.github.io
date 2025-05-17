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

  return {
    ...{
      label: display,
      url: path,
    },
    items.length === 0 ? undefined : { items }
  }
})

export default menuItems
