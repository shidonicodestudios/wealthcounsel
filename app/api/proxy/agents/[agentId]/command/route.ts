import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.OPENCLAW_API_URL || 'http://100.94.225.15:8001'
const API_TOKEN = process.env.OPENCLAW_GATEWAY_TOKEN

export async function POST(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const body = await request.json()

    const response = await fetch(
      `${API_BASE_URL}/api/agents/${params.agentId}/command`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error sending command:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send command' },
      { status: 500 }
    )
  }
}
