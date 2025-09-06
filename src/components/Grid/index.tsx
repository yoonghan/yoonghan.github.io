/* eslint-disable @next/next/no-img-element */
import React from "react"

// Define the interface for a single certificate item that the Grid will display.
export interface Certificate {
  label: string
  imageSrc: string // URL or path to the certificate logo/image.
  text: string // A short description of the certificate.
  href?: string // The external URL the certificate tile will link to.
}

// Define the props for the Grid component.
interface GridProps {
  items: Certificate[]
}

/**
 * A responsive grid component that displays a list of items (e.g., certificates)
 * as clickable tiles. Each tile can feature an image, a label, and a short text,
 * and links to an external URL.
 */
const Grid: React.FC<GridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {items.map((item) => {
        const content = (
          <>
            <div className="flex items-center mb-4">
              <img
                src={item.imageSrc}
                alt={`${item.label} logo`}
                width={40}
                height={40}
                className="mr-4 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {item.label}
              </h3>
            </div>
            <p className="text-gray-600 text-sm">{item.text}</p>
          </>
        )

        return item.href && item.href !== "#" ? (
          <a
            key={item.label}
            href={item.href}
            target="certificate"
            rel="noopener noreferrer"
            className="block p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out bg-white transform hover:-translate-y-1"
          >
            {content}
          </a>
        ) : (
          <div
            key={item.label}
            className="block p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}

export default Grid
