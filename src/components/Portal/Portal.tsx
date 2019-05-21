/** original JS code courtesy of Jay Freestone https://www.jayfreestone.com/writing/react-portals-with-hooks/ */

import * as React from 'react'
import * as ReactDom from 'react-dom'
import usePortal from './usePortal'

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 */

interface PortalProps {
  children: React.ReactNode
  id: string
}

const Portal = (props: PortalProps) => {
  const domNode = usePortal(props.id)
  if (domNode) {
    return ReactDom.createPortal(props.children, domNode)
  }
  return null
}

export default Portal
