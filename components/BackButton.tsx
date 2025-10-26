'use client'

import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="btn-secondary inline-flex items-center justify-center"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Página anterior
    </button>
  )
}
