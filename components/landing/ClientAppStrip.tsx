import Image from 'next/image'

const SHOTS = [
  { src: '/home-portrait.png',      label: 'Pregled' },
  { src: '/vjezbe-portrait.png',    label: 'Treninzi' },
  { src: '/nutrition-portrait.png', label: 'Prehrana' },
  { src: '/chat-portrait.png',      label: 'Chat' },
  { src: '/checkin-portrait.png',   label: 'Check-in' },
]

const LOOP = [...SHOTS, ...SHOTS]

export default function ClientAppStrip() {
  return (
    <div className="castrip-outer">
      <div className="dstrip-head">
        <span className="dstrip-badge">Klijentska mobilna aplikacija</span>
        <p className="dstrip-sub">Što klijent vidi u aplikaciji — besplatno za iOS i Android</p>
      </div>
      <div className="dstrip-mask">
        <div className="castrip-track">
          {LOOP.map((shot, i) => (
            <div key={i} className="castrip-card">
              <Image
                src={shot.src}
                alt={`UnitLift klijentska aplikacija - ${shot.label}`}
                width={390}
                height={844}
                className="castrip-img"
                sizes="130px"
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
