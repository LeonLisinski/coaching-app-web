import type { Trainer } from './types'

const activeTrainers: Trainer[] = [
  {
    slug: 'leon-lisinski',
    name: 'Leon Lišinski',
    title: 'Osobni trener & osnivač UnitLifta',
    isFounder: true,
    instrumentalName: 'Leonom',
    firstName: 'Leon',
    imagePosition: 'center center',
    shortBio: 'Osobni trener s 15+ godina sportskog iskustva, programer i osnivač UnitLifta. Pomaže klijentima izgraditi snažnije, funkcionalnije i dugoročno održivo tijelo.',
    fullBio: [
      'Sport i trening dio su mog života više od 15 godina. Osam godina trenirao sam plivanje, a posljednjih sedam godina posvećen sam treningu snage, izgradnji mišićne mase, kondiciji i dugoročno održivoj tjelesnoj formi.',
      'Kao osobni trener, pomažem ljudima izgraditi snažnije, funkcionalnije i estetski uravnoteženije tijelo kroz strukturiran trening, jasne smjernice i redovito praćenje napretka. Moj pristup nije temeljen na brzim rješenjima, nego na disciplini, kontinuitetu i programu koji se može uklopiti u stvarni život.',
      'Uz trenerski rad, radim kao programer i osnivač sam UnitLifta - platforme za osobne trenere i njihove klijente. Upravo zato u coachingu veliki naglasak stavljam na organizaciju, mjerljiv napredak i jasan sustav rada.',
    ],
    image: undefined,
    specialties: [
      'Izgradnja mišićne mase i snage',
      'Promjena tjelesne kompozicije',
      'Online coaching i praćenje napretka',
      'Strukturiranje treninga i prehrambenih navika',
    ],
    certifications: [
      'Certificirani osobni trener',
      'Višegodišnje praktično iskustvo u treningu snage i kondicijskoj pripremi',
      'Dugogodišnje sportsko iskustvo - 8 godina plivanja',
    ],
    quickInfo: [
      { label: 'Lokacija', value: 'Osijek / online' },
      { label: 'Sportsko iskustvo', value: '15+ godina' },
      { label: 'Trening snage', value: '7 godina' },
      { label: 'Edukacija', value: 'Certificirani osobni trener' },
      { label: 'Fokus', value: 'Snaga, mišićna masa i tjelesna kompozicija' },
    ],
    contactIntro: 'Zanima te online coaching ili želiš saznati odgovara li moj pristup tvom cilju? Javi se putem Instagrama ili e-maila i dogovorit ćemo kratki razgovor.',
    instagram: 'https://www.instagram.com/leonlisinski/',
    email: 'leon@unitlift.com',
    coachingLink: 'https://app.unitlift.com/leonlisinski/prijava',
    en: {
      title: 'Personal trainer & founder of UnitLift',
      shortBio: 'Personal trainer with 15+ years of sports experience, software developer and founder of UnitLift. Helps clients build a stronger, more functional and sustainably fit body.',
      fullBio: [
        'Sport and training have been part of my life for over 15 years. I swam competitively for eight years, and for the past seven years I have been dedicated to strength training, building muscle mass, conditioning and long-term physical fitness.',
        'As a personal trainer, I help people build a stronger, more functional and aesthetically balanced body through structured training, clear guidelines and regular progress tracking. My approach is not based on quick fixes, but on discipline, consistency and a programme that fits into real life.',
        'Alongside coaching, I work as a software developer and am the founder of UnitLift - a platform for personal trainers and their clients. That is why I place great emphasis on organisation, measurable progress and a clear system of work.',
      ],
      specialties: [
        'Muscle mass and strength building',
        'Body composition change',
        'Online coaching and progress tracking',
        'Training and nutrition habit structuring',
      ],
      certifications: [
        'Certified personal trainer',
        'Years of practical experience in strength training and conditioning',
        'Long-term sports background - 8 years of competitive swimming',
      ],
      quickInfo: [
        { label: 'Location', value: 'Osijek / online' },
        { label: 'Sports experience', value: '15+ years' },
        { label: 'Strength training', value: '7 years' },
        { label: 'Education', value: 'Certified personal trainer' },
        { label: 'Focus', value: 'Strength, muscle mass and body composition' },
      ],
      contactIntro: 'Interested in online coaching or want to find out if my approach suits your goal? Reach out via Instagram or email and we will arrange a quick chat.',
    },
  },
  {
    slug: 'filip-pusic',
    name: 'Filip Pušić',
    title: 'Osobni trener & student fizioterapije',
    shortBio: 'Certificirani osobni trener, student 3. godine fizioterapije i bivši džudaš. Pomaže klijentima trenirati strukturirano, sigurno i usmjereno prema konkretnim rezultatima.',
    fullBio: [
      'Sport i trening dio su mog života više od 12 godina. Pet godina trenirao sam džudo, a posljednjih sedam godina posvećen sam treningu snage, razvoju mišićne mase, kondicije i kvalitetnog kretanja.',
      'Certificirani sam osobni trener i student treće godine fizioterapije. Kroz spoj trenerskog rada, sportskog iskustva i obrazovanja iz područja ljudskog pokreta, klijentima pomažem trenirati strukturirano, sigurno i usmjereno prema konkretnim rezultatima.',
      'Moj pristup temelji se na pravilnoj izvedbi, postupnom napretku i programu prilagođenom ciljevima i mogućnostima pojedinca. Bez nepotrebnih ekstrema i brzih rješenja - cilj je izgraditi snažnije, sposobnije i dugoročno održivo tijelo.',
    ],
    image: '/trainers/filip-pusic.jpg',
    instrumentalName: 'Filipom',
    firstName: 'Filip',
    imagePosition: 'center 25%',
    specialties: [
      'Izgradnja mišićne mase i snage',
      'Promjena tjelesne kompozicije',
      'Pravilna izvedba vježbi i kvaliteta pokreta',
      'Kondicijska priprema i funkcionalna sposobnost',
    ],
    certifications: [
      'Certificirani osobni trener',
      'Student 3. godine fizioterapije',
      '7 godina iskustva u treningu snage',
      '5 godina džudo iskustva',
    ],
    quickInfo: [
      { label: 'Lokacija', value: 'Osijek / online' },
      { label: 'Sportsko iskustvo', value: '12+ godina' },
      { label: 'Trening snage', value: '7 godina' },
      { label: 'Edukacija', value: 'Student fizioterapije' },
      { label: 'Fokus', value: 'Snaga, pokret i sigurna progresija' },
    ],
    contactIntro: 'Želiš strukturiran trening, siguran napredak i program prilagođen svom cilju? Javi se putem Instagrama ili e-maila i dogovori početni razgovor.',
    instagram: 'https://www.instagram.com/_pusicc/',
    coachingLink: 'https://app.unitlift.com/filippusic/prijava',
    en: {
      title: 'Personal trainer & physiotherapy student',
      shortBio: 'Certified personal trainer, 3rd-year physiotherapy student and former judoka. Helps clients train in a structured, safe and results-oriented way.',
      fullBio: [
        'Sport and training have been part of my life for over 12 years. I trained judo for five years, and for the past seven years I have been focused on strength training, building muscle mass, conditioning and quality movement.',
        'I am a certified personal trainer and a third-year physiotherapy student. By combining coaching, sports experience and education in human movement, I help clients train in a structured, safe and results-oriented way.',
        'My approach is based on proper technique, gradual progress and a programme tailored to each person\'s goals and abilities. No unnecessary extremes or quick fixes - the goal is to build a stronger, more capable and sustainably fit body.',
      ],
      specialties: [
        'Muscle mass and strength building',
        'Body composition change',
        'Proper exercise technique and movement quality',
        'Conditioning and functional fitness',
      ],
      certifications: [
        'Certified personal trainer',
        '3rd-year physiotherapy student',
        '7 years of strength training experience',
        '5 years of judo experience',
      ],
      quickInfo: [
        { label: 'Location', value: 'Osijek / online' },
        { label: 'Sports experience', value: '12+ years' },
        { label: 'Strength training', value: '7 years' },
        { label: 'Education', value: 'Physiotherapy student' },
        { label: 'Focus', value: 'Strength, movement and safe progression' },
      ],
      contactIntro: 'Want structured training, safe progress and a programme tailored to your goal? Get in touch via Instagram or email and book an initial chat.',
    },
  },
  {
    slug: 'borna-kovacevic',
    name: 'Borna Kovačević',
    title: 'Osobni trener & bodybuilder',
    shortBio: 'Certificirani osobni trener sa 7 godina iskustva u treningu snage i bodybuildingu. Specijaliziran za izgradnju mišićne mase, estetsku transformaciju i smanjenje masnog tkiva.',
    fullBio: [
      'Bodybuilding i trening snage moj su fokus posljednjih sedam godina. Kroz godine strukturiranog treninga, prehrane i rada na vlastitoj formi razvio sam praktično razumijevanje procesa izgradnje mišićne mase, promjene tjelesne kompozicije i pripreme tijela za estetski cilj.',
      'Certificirani sam osobni trener i bodybuilder u natjecateljskoj pripremi za nastup u Jagodini. Klijentima pomažem izgraditi više mišićne mase, smanjiti postotak masnog tkiva i postići izraženiju, proporcionalniju i estetski bolju formu.',
      'Moj pristup temelji se na precizno strukturiranom treningu, kontroli prehrane i kontinuiranom praćenju napretka. Cilj nije samo trenirati naporno, nego trenirati planski i ostvariti vidljiv rezultat.',
    ],
    image: '/trainers/borna-kovacevic.jpg',
    instrumentalName: 'Bornom',
    firstName: 'Borna',
    imagePosition: 'center 15%',
    specialties: [
      'Izgradnja mišićne mase',
      'Bodybuilding i estetska transformacija',
      'Smanjenje masnog tkiva i definicija',
      'Strukturirani trening i prehrambene smjernice',
    ],
    certifications: [
      'Certificirani osobni trener',
      '7 godina iskustva u treningu snage i bodybuildingu',
      'Bodybuilder u natjecateljskoj pripremi',
      'Priprema za nastup u Jagodini',
    ],
    quickInfo: [
      { label: 'Lokacija', value: 'Osijek / online' },
      { label: 'Sportsko iskustvo', value: '7+ godina' },
      { label: 'Trening snage', value: '7 godina' },
      { label: 'Edukacija', value: 'Certificirani osobni trener' },
      { label: 'Fokus', value: 'Mišićna masa i estetska transformacija' },
    ],
    contactIntro: 'Želiš izgraditi više mišićne mase, poboljšati formu ili ozbiljnije pristupiti svom treningu? Javi se putem Instagrama ili e-maila i dogovori početni razgovor.',
    instagram: 'https://www.instagram.com/kovacevic.borna_/',
    coachingLink: 'https://app.unitlift.com/bornakovacevic/prijava',
    en: {
      title: 'Personal trainer & bodybuilder',
      shortBio: 'Certified personal trainer with 7 years of strength training and bodybuilding experience. Specialised in muscle building, aesthetic transformation and fat loss.',
      fullBio: [
        'Bodybuilding and strength training have been my focus for the past seven years. Through years of structured training, nutrition and working on my own physique, I have developed a practical understanding of muscle building, body composition change and preparing the body for an aesthetic goal.',
        'I am a certified personal trainer and competitive bodybuilder preparing for a show in Jagodina. I help clients build more muscle mass, reduce body fat and achieve a more defined, proportional and aesthetically improved physique.',
        'My approach is based on precisely structured training, nutrition control and continuous progress monitoring. The goal is not just to train hard, but to train smart and achieve visible results.',
      ],
      specialties: [
        'Muscle building',
        'Bodybuilding and aesthetic transformation',
        'Fat loss and definition',
        'Structured training and nutrition guidelines',
      ],
      certifications: [
        'Certified personal trainer',
        '7 years of strength training and bodybuilding experience',
        'Competitive bodybuilder',
        'Preparing for a show in Jagodina',
      ],
      quickInfo: [
        { label: 'Location', value: 'Osijek / online' },
        { label: 'Sports experience', value: '7+ years' },
        { label: 'Strength training', value: '7 years' },
        { label: 'Education', value: 'Certified personal trainer' },
        { label: 'Focus', value: 'Muscle mass and aesthetic transformation' },
      ],
      contactIntro: 'Want to build more muscle, improve your physique or take your training more seriously? Get in touch via Instagram or email and book an initial chat.',
    },
  },
]

const placeholders: Trainer[] = Array.from({ length: 6 }, (_, i) => ({
  slug: `placeholder-${i + 1}`,
  name: 'Uskoro',
  title: 'Novi trener',
  isPlaceholder: true,
}))

export const trainers: Trainer[] = [...activeTrainers, ...placeholders]

export function getTrainerBySlug(slug: string): Trainer | undefined {
  return activeTrainers.find(t => t.slug === slug)
}
