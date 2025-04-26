import React from 'react'
import GrapesFooter from './components/GrapesFooter'

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
