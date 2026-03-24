import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.OPENCLAW_API_URL || 'http://100.94.225.15:8001'
const API_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '50'

    const response = await fetch(`${API_BASE_URL}/api/logs?limit=${limit}`, {
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
    console.error('Error fetching logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    )
  }
}
