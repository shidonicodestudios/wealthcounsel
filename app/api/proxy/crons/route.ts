import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.OPENCLAW_API_URL || 'http://100.94.225.15:8001'
const API_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/crons`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching crons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crons' },
      { status: 500 }
    )
  }
}
