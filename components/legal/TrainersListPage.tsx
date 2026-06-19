'use client'

import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import LogoSvg from '@/components/landing/LogoSvg'
import LegalNavbar from './LegalNavbar'
import type { Trainer } from '@/lib/trainers/types'
import { resolveTrainer } from '@/lib/trainers/types'

function TrainerCard({ trainer, locale, tr }: { trainer: Trainer; locale: string; tr: ReturnType<typeof useTranslations> }) {
  const imgPos = trainer.imagePosition ?? 'center center'
  return (
    <Link href={`/${locale}/treneri/${trainer.slug}`} className={`trainer-card${trainer.isFounder ? ' trainer-card--founder' : ''}`}>
      <div className="trainer-card-circle">
        {trainer.image ? (
          <Image src={trainer.image} alt={trainer.name} fill style={{ objectFit: 'cover', objectPosition: imgPos }} sizes="92px" />
        ) : (
          <div className="trainer-card-circle-fallback">
            {trainer.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      {trainer.isFounder && <div className="trainer-founder-badge">{tr('founderCardBadge')}</div>}
      <div className="trainer-card-body">
        <div className="trainer-card-name">{trainer.name}</div>
        <div className="trainer-card-title">{trainer.title}</div>
        <p className="trainer-card-bio">{trainer.shortBio}</p>
        <div className="trainer-card-tags">
          {(trainer.specialties ?? []).slice(0, 1).map(s => (
            <span key={s} className="trainer-tag">{s}</span>
          ))}
        </div>
        <div className="trainer-card-cta">{tr('viewProfile')}</div>
      </div>
    </Link>
  )
}

export default function TrainersListPage({ trainers }: { trainers: Trainer[] }) {
  const locale = useLocale()
  const t = useTranslations()
  const tr = useTranslations('trainer')

  const active = trainers.filter(t => !t.isPlaceholder)
  const sorted = [...active]
    .sort((a, b) => (b.isFounder ? 1 : 0) - (a.isFounder ? 1 : 0))
    .map(t => resolveTrainer(t, locale))

  return (
    <div className="legal-root">
      <LegalNavbar switchPath="/treneri" />

      {/* Hero */}
      <div className="legal-hero trainers-hero">
        <div className="legal-hero-bg" />
        <div className="legal-hero-grid" />
        <div className="legal-hero-inner trainers-hero-inner">
          <div>
            <div className="legal-badge"><span className="bdot" />{tr('listBadge')}</div>
            <h1 className="legal-title" style={{ maxWidth: 560 }}>{tr('listTitle')}</h1>
            <p className="trainers-hero-sub">{tr('listSub')}</p>
          </div>
          <div className="trainers-hero-stats">
            <div className="trainers-stat">
              <span className="trainers-stat-n">{active.length}</span>
              <span>{tr('statTrainers')}</span>
            </div>
            <div className="trainers-stat-sep" />
            <div className="trainers-stat">
              <span className="trainers-stat-n">100%</span>
              <span>{tr('statCertified')}</span>
            </div>
            <div className="trainers-stat-sep" />
            <div className="trainers-stat">
              <span className="trainers-stat-n">Online</span>
              <span>{tr('statInPerson')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="trainers-section">
        <div className="con">
          <div className="trainers-grid">
            {sorted.map(trainer => (
              <TrainerCard key={trainer.slug} trainer={trainer} locale={locale} tr={tr} />
            ))}
          </div>

          <div className="trainers-cta">
            <div className="trainers-cta-inner">
              <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>💪</div>
              <div style={{ flex: 1 }}>
                <div className="trainers-cta-title">{tr('ctaListTitle')}</div>
                <div className="trainers-cta-text">{tr('ctaListText')}</div>
              </div>
              <a href={`/${locale}/kontakt`} className="btn btn-p" style={{ fontSize: '.9rem', whiteSpace: 'nowrap' }}>{tr('ctaListBtn')}</a>
            </div>
          </div>
        </div>
      </div>

      <footer className="legal-footer-bar">
        <div className="con">
          <div className="legal-footer-row">
            <a href={`/${locale}`} className="fl-logo"><LogoSvg height={20} /><span>UnitLift</span></a>
            <div className="legal-footer-links">
              <Link href={`/${locale}/treneri`}>{tr('footerLink')}</Link>
              <Link href={`/${locale}/cijene`}>{t('common.tryFree')}</Link>
              <Link href={`/${locale}/kontakt`}>{t('common.contact')}</Link>
              <Link href={`/${locale}/privatnost`}>{t('common.privacy')}</Link>
            </div>
            <span className="legal-footer-copy">{t('common.footerCopy')}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
