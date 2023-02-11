import { findAllChildByPath } from "@/config/pages"
import { WithRouterProps } from "next/dist/client/with-router"
import Link from "next/link"
import { withRouter } from "next/router"
import React from "react"
import style from "./SubMenu.module.css"

export interface Props extends WithRouterProps {}

const SubMenu = ({ router }: Props) => {
  const pathname = router.pathname
  const allChild = findAllChildByPath(pathname)

  const isCurrentPath = (menuPath: string) => pathname == menuPath

  if (allChild.length === 0) {
    return <div data-testid="empty"></div>
  } else
    return (
      <div className={style.container}>
        {allChild.map((menu, index) => (
          <React.Fragment key={menu.path}>
            {isCurrentPath(menu.path) ? (
              <i className={style.divider}>{menu.display}</i>
            ) : (
              <Link href={menu.path} className={style.divider}>
                {menu.display}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    )
}

export default withRouter(SubMenu)
