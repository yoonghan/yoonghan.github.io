declare module "*module.css" {
  const styles: {
    [className: string]: string
  }
  export default styles
}

declare module "react-confirm" {
  import * as React from "react"

  export function confirmable<P>(
    component: React.ComponentType<ReactConfirmProps & P>
  ): React.ComponentType<P>
  export function createConfirmation(
    component: React.ComponentType<any>,
    unmountDelay?: number,
    mountedComponent?: HTMLElement
  ): (props: any) => Promise<string>

  export interface ReactConfirmProps {
    confirmation: string | React.ReactElement
    dismiss: () => void
    proceed: (value?: string) => void
    cancel: (value?: string) => void
    show: boolean
  }
}
