function create() {
  const root = document.getElementById("dialog-root")
  if (root !== null) {
    return root
  }
  const portalRoot = document.createElement("div")
  portalRoot.setAttribute("id", "dialog-root")
  return document.body.appendChild(portalRoot)
}

const props = { create }

export default props
