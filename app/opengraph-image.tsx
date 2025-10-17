import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Sapphire Legal AI — The Private AI-Powered Legal OS for Mid-Sized Law Firms'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 20px 0',
              lineHeight: '1.1',
            }}
          >
            Sapphire Legal AI
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#cbd5e1',
              margin: '0 0 40px 0',
              lineHeight: '1.3',
            }}
          >
            The Private AI-Powered Legal OS for Mid-Sized Law Firms
          </p>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: '#0ea5e9',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Eliminate Backlogs
            </div>
            <div
              style={{
                background: '#0ea5e9',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              12 Practice Packs
            </div>
            <div
              style={{
                background: '#0ea5e9',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontSize: '20px',
                fontWeight: '600',
              }}
            >
              Private AI
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
