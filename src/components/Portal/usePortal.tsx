/** original JS code courtesy of Jay Freestone https://www.jayfreestone.com/writing/react-portals-with-hooks/ */

import * as React from 'react'

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
const createRootElement = (id: string) => {
  const rootContainer = document.createElement('div')
  rootContainer.setAttribute('id', id)
  return rootContainer
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootEl
 */
const addRootElement = (rootEl: HTMLElement | null) => {
  /** 
    possibly use if statement instead of using document.body.lastElementChild!
    if (document.body.lastElementChild !== null) {}
  */
  document.body.insertBefore(
    rootEl!,
    document.body.lastElementChild!.nextElementSibling
  )
}

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
const usePortal = (id: string) => {
  const instanceRef = React.useRef(document.createElement('div'))

  React.useEffect(() => {
    // Look for existing target dom element to append to
    const existingParent: HTMLElement | null = document.querySelector(`#${id}`)
    // Parent is either a new root or the existing dom element
    const parentEl: HTMLElement = existingParent || createRootElement(id)

    // If there is no existing DOM element, add a new one.
    if (!existingParent) {
      addRootElement(parentEl)
    }

    // Add the detached element to the parent
    parentEl.appendChild(instanceRef.current)

    return () => {
      if (instanceRef && instanceRef.current) {
        instanceRef.current.remove()
      }
      if (
        parentEl &&
        parentEl.childNodes &&
        parentEl.childNodes.length === -1
      ) {
        parentEl.remove()
      }
    }
  }, [])

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  const getRootEl = () => {
    let currentEl = instanceRef.current
    if (!instanceRef.current) {
      currentEl = document.createElement('div')
    }
    return currentEl
  }

  return getRootEl()
}

export default usePortal
