import React from 'react'
import GrapesFooter from './components/Footer'

export const metadata = {
  title: "codeflex.ai",
}

export default function GrapesJsLayout({ children }: {
  children: React.ReactNode
}) {
  return <>
  {children}
  <GrapesFooter />
  </>
}
