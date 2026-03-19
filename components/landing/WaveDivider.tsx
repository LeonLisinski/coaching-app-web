interface Props {
  from: string
  to: string
  flip?: boolean
}

export default function WaveDivider({ from, to, flip = false }: Props) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'block',
        lineHeight: 0,
        background: from,
        transform: flip ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 64"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 64 }}
      >
        <path
          d="M0,32 C180,64 360,0 540,32 C720,64 900,0 1080,32 C1260,64 1380,16 1440,32 L1440,64 L0,64 Z"
          fill={to}
        />
      </svg>
    </div>
  )
}
