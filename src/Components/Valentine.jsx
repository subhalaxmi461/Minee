import React, { useState, lazy, Suspense } from 'react'
import LoadingScreen from './LoadingScreen'
import PasswordLock from './PasswordLock'
import Hero from './Hero'
import Strip from './Strip'
// Lazy load all heavy components
const Cursor = lazy(() => import('./Cursor'))
const ShootingStars = lazy(() => import('./ShootingStars'))
const FloatingHearts = lazy(() => import('./FloatingHearts'))
const MusicPlayer = lazy(() => import('./MusicPlayer'))
const MidnightPopup = lazy(() => import('./MidnightPopup'))
const ThemeChanger = lazy(() => import('./ThemeChanger'))

const Confetti = lazy(() => import('./Confetti'))
const Fireworks = lazy(() => import('./Fireworks'))
const EnvelopeLetter = lazy(() => import('./EnvelopeLetter'))
const ProposalAnimation = lazy(() => import('./ProposalAnimation'))

const LoveMeter = lazy(() => import('./LoveMeter'))
const StarRating = lazy(() => import('./StarRating'))
const Secret = lazy(() => import('./Secret'))
const GiftBox = lazy(() => import('./GiftBox'))
const SurpriseButton = lazy(() => import('./SurpriseButton'))
const FuturePredictions = lazy(() => import('./FuturePredictions'))
const OurTimeline = lazy(() => import('./OurTimeline'))
const FlowerBloom = lazy(() => import('./FlowerBloom'))
const DrawingCanvas = lazy(() => import('./DrawingCanvas'))

const LoveQuiz = lazy(() => import('./LoveQuiz'))
const AnniversaryCountdown = lazy(() => import('./AnniversaryCountdown'))
const Countdown = lazy(() => import('./Countdown'))
const SongLyrics = lazy(() => import('./SongLyrics'))
const TypewriterLetter = lazy(() => import('./TypewriterLetter'))
const AILoveLetter = lazy(() => import('./AILoveLetter'))
const WishList = lazy(() => import('./WishList'))
const PhotoUpload = lazy(() => import('./PhotoUpload'))
const Slideshow = lazy(() => import('./Slideshow'))
const ShareButton = lazy(() => import('./ShareButton'))
const ScrollReveal = lazy(() => import('./ScrollReveal'))

// Simple loader
const Loader = () => (
  <div style={{
    padding: '3rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)',
    fontSize: '1.5rem',
  }}>
    💖
  </div>
)

export default function Valentine() {
  const [loading, setLoading] = useState(true)
  const [unlocked, setUnlocked] = useState(false)
  const [answered, setAnswered] = useState(null)
  const [showEffects, setShowEffects] = useState(false)

  const handleAnswer = (val) => {
    setAnswered(val)
    if (val === 'yes') {
      setShowEffects(true)
      setTimeout(() => setShowEffects(false), 5000)
    }
  }

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />
  if (!unlocked) return <PasswordLock onUnlock={() => setUnlocked(true)} />

  return (
    <Suspense fallback={<Loader />}>
      <Cursor />
      <ShootingStars />
      <FloatingHearts />
      <MusicPlayer />
      <MidnightPopup />
      <ThemeChanger />
      
      <Confetti active={showEffects} />
      <Fireworks active={showEffects} />

      <Hero answered={answered} setAnswered={handleAnswer} />

      {answered === 'yes' && (
        <Suspense fallback={<Loader />}>
          <ScrollReveal delay={0}><Strip /></ScrollReveal>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.1}><EnvelopeLetter /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.2}><ProposalAnimation /></ScrollReveal>
          </Suspense>

         

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.4}><LoveMeter /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.5}><StarRating /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.6}><Secret /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.7}><GiftBox /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.8}><SurpriseButton /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={0.9}><FuturePredictions /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.0}><OurTimeline /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.1}><FlowerBloom /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.2}><DrawingCanvas /></ScrollReveal>
          </Suspense>

         

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.4}><LoveQuiz /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.5}><AnniversaryCountdown /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.6}><Countdown /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.7}><SongLyrics /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.8}><TypewriterLetter /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={1.9}><AILoveLetter /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={2.0}><WishList /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={2.1}><PhotoUpload /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={2.2}><Slideshow /></ScrollReveal>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ScrollReveal delay={2.3}><ShareButton /></ScrollReveal>
          </Suspense>
        </Suspense>
      )}
    </Suspense>
  )
}