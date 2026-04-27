import Image from 'next/image'

const SHOTS = [
  { src: '/screenshot-dashboard.png', label: 'Dashboard' },
  { src: '/screenshot-klijenti.png', label: 'Klijenti' },
  { src: '/screenshot-treninzi.png', label: 'Treninzi' },
  { src: '/screenshot-prehrana.png', label: 'Prehrana' },
  { src: '/screenshot-checkin.png', label: 'Check-in' },
  { src: '/screenshot-financije.png', label: 'Financije' },
]

// Duplicate for seamless infinite loop
const LOOP = [...SHOTS, ...SHOTS]

export default function DashboardStrip() {
  return (
    <div className="dstrip-outer">
      <div className="dstrip-head">
        <span className="dstrip-badge">Web dashboard za trenere</span>
        <p className="dstrip-sub">Sve što vodiš kao trener — na jednom ekranu</p>
      </div>
      <div className="dstrip-mask">
        <div className="dstrip-track">
          {LOOP.map((shot, i) => (
            <div key={i} className="dstrip-card">
              <Image
                src={shot.src}
                alt={`UnitLift ${shot.label} - web dashboard za online trenere`}
                width={320}
                height={200}
                className="dstrip-img"
                sizes="220px"
                loading="lazy"
              />
              <span className="dstrip-lbl">{shot.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
