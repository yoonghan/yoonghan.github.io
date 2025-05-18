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

  const root = {
    label: display,
    url: path,
  }
  
  return (items.length === 0) ? root : {
    ...root,
    items
  }
})

export default menuItems
