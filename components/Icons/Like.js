import * as React from 'react'

export default function Like (props) {
  return (
    <svg
      height={16}
      viewBox="0 0 21 21"
      width={16}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.5 6.5c.5-2.5 4.343-2.657 6-1 1.603 1.603 1.5 4.334 0 6l-6 6-6-6a4.243 4.243 0 010-6c1.55-1.55 5.5-1.5 6 1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
