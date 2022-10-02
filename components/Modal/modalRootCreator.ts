function create() {
  if (document.getElementById("modal-root") === null) {
    const portalRoot = document.createElement("div")
    portalRoot.setAttribute("id", "modal-root")
    document.body.appendChild(portalRoot)
  }
}

const props = { create }

export default props
