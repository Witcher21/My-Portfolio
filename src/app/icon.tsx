import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
            fontSize: 24,
            background: 'linear-gradient(to bottom right, #000000, #083344)', // Black to Cyan-950
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#06b6d4', // Cyan-500
            borderRadius: '50%',
            fontWeight: 900,
            border: '2px solid #06b6d4',
            fontFamily: 'sans-serif',
        }}
      >
        N
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
