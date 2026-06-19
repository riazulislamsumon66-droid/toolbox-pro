'use client'

import { useState, useCallback } from 'react'

interface FetchResult {
  html: string
  url: string
  size: number
}

export function useFetchUrl() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('')

  const fetchUrl = useCallback(async (url: string): Promise<FetchResult | null> => {
    setLoading(true)
    setError('')
    setProgress('Fetching website...')

    try {
      const res = await fetch(`/api/fetch-url?url=${encodeURIComponent(url.trim())}`)
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to fetch website')
        setLoading(false)
        setProgress('')
        return null
      }

      setProgress('Fetched successfully!')
      setLoading(false)
      setProgress('')
      return { html: data.html, url: data.url, size: data.size }
    } catch (e: any) {
      setError(e.message || 'Failed to fetch website')
      setLoading(false)
      setProgress('')
      return null
    }
  }, [])

  return { fetchUrl, loading, error, progress, setError, setProgress }
}
