import { useTranslations } from 'next-intl'

const icons = [
  <svg key="0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5566ff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg key="1" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5566ff" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  <svg key="2" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5566ff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="3" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5566ff" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  <svg key="4" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5566ff" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
]

export default function TrustBar() {
  const t = useTranslations()
  const trust = t.raw('trust') as string[]

  return (
    <div className="trust-bar">
      {trust.map((label, i) => (
        <div key={i} className="ti">
            <span className="ti-ico">{icons[i]}</span>
            <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
