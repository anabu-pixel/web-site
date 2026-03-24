"use client"

import { useEffect } from "react"

export function Polyfill() {
  useEffect(() => {
    // Polyfill for Iterator.toArray() - some libraries need this
    if (typeof Map !== "undefined") {
      try {
        const mapIterator = new Map().values()
        const iteratorPrototype = Object.getPrototypeOf(mapIterator)
        if (iteratorPrototype && typeof iteratorPrototype.toArray !== "function") {
          iteratorPrototype.toArray = function () {
            return Array.from(this)
          }
        }
      } catch (e) {
        // Ignore errors
      }
    }
  }, [])

  return null
}
