function create() {
  const root = document.getElementById("dialog-root")
  if (root !== null) {
    return root
  }
  const portalRoot = document.createElement("div")
  portalRoot.setAttribute("id", "dialog-root")
  document.body.appendChild(portalRoot)
  return portalRoot
}

const props = { create }

export default props
