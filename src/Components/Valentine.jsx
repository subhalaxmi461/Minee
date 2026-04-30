import React, { useState } from 'react'
import LoadingScreen from './LoadingScreen'
import PasswordLock from './PasswordLock'
import Hero from './Hero'
import Strip from './Strip'
import Cursor from './Cursor'
import ShootingStars from './ShootingStars'
import FloatingHearts from './FloatingHearts'
import MusicPlayer from './MusicPlayer'
import MidnightPopup from './MidnightPopup'
import ThemeChanger from './ThemeChanger'
import Confetti from './Confetti'
import Fireworks from './Fireworks'
import EnvelopeLetter from './EnvelopeLetter'
import ProposalAnimation from './ProposalAnimation'
import LoveMeter from './LoveMeter'
import StarRating from './StarRating'
import Secret from './Secret'
import GiftBox from './GiftBox'
import SurpriseButton from './SurpriseButton'
import FuturePredictions from './FuturePredictions'
import OurTimeline from './OurTimeline'
import FlowerBloom from './FlowerBloom'
import DrawingCanvas from './DrawingCanvas'
import LoveQuiz from './LoveQuiz'
import AnniversaryCountdown from './AnniversaryCountdown'
import Countdown from './Countdown'
import TypeWriterLetter from './TypeWriterLetter'
import AILoveLetter from './AILoveLetter'
import WishList from './WishList'
import PhotoUpload from './PhotoUpload'
import Slideshow from './Slideshow'
import ShareButton from './ShareButton'
import ScrollReveal from './ScrollReveal'

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
    <>
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
        <>
          <ScrollReveal delay={0}><Strip /></ScrollReveal>
          <ScrollReveal delay={0.1}><EnvelopeLetter /></ScrollReveal>
          <ScrollReveal delay={0.2}><ProposalAnimation /></ScrollReveal>
          <ScrollReveal delay={0.4}><LoveMeter /></ScrollReveal>
          <ScrollReveal delay={0.5}><StarRating /></ScrollReveal>
          <ScrollReveal delay={0.6}><Secret /></ScrollReveal>
          <ScrollReveal delay={0.7}><GiftBox /></ScrollReveal>
          <ScrollReveal delay={0.8}><SurpriseButton /></ScrollReveal>
          <ScrollReveal delay={0.9}><FuturePredictions /></ScrollReveal>
          <ScrollReveal delay={1.0}><OurTimeline /></ScrollReveal>
          <ScrollReveal delay={1.1}><FlowerBloom /></ScrollReveal>
          <ScrollReveal delay={1.2}><DrawingCanvas /></ScrollReveal>
          <ScrollReveal delay={1.4}><LoveQuiz /></ScrollReveal>
          <ScrollReveal delay={1.5}><AnniversaryCountdown /></ScrollReveal>
          <ScrollReveal delay={1.6}><Countdown /></ScrollReveal>
          <ScrollReveal delay={1.8}><TypeWriterLetter /></ScrollReveal>
          <ScrollReveal delay={1.9}><AILoveLetter /></ScrollReveal>
          <ScrollReveal delay={2.0}><WishList /></ScrollReveal>
          <ScrollReveal delay={2.1}><PhotoUpload /></ScrollReveal>
          <ScrollReveal delay={2.2}><Slideshow /></ScrollReveal>
          <ScrollReveal delay={2.3}><ShareButton /></ScrollReveal>
        </>
      )}
    </>
  )
}