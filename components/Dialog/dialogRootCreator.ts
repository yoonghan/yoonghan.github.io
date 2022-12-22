function create() {
  if (document.getElementById("dialog-root") === null) {
    const portalRoot = document.createElement("div")
    portalRoot.setAttribute("id", "dialog-root")
    document.body.appendChild(portalRoot)
  }
}

const props = { create }

export default props
