import React from 'react'
import GrapesFooter from './components/Footer'

export const metadata = {
  title: "Editor (sin nav/footer)",
}

export default function GrapesJsLayout({ children }: {
  children: React.ReactNode
}) {
  return <>
  {children}
  <GrapesFooter />
  </>
}
