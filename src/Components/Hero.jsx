import React, { useState } from 'react'

const noTexts = ['No 😢','Are you sure? 🥺','Really sure?? 💔','Please reconsider 🙏','Last chance! 🌹','Okay fine 😭','WAIT COME BACK 😱','My heart hurts 💔','Fine I will cry 😭','Pleaaaase 🥺🥺🥺']

const bearStyles = `
  @keyframes floatSlow{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes heartRise1{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-80px) scale(0.4);opacity:0}}
  @keyframes heartRise2{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-90px) scale(0.3);opacity:0}}
  @keyframes heartRise3{0%{transform:translateY(0) scale(1);opacity:1}100%{transform:translateY(-70px) scale(0.5);opacity:0}}
  @keyframes cloudMove{0%{transform:translateX(0)}50%{transform:translateX(18px)}100%{transform:translateX(0)}}
  @keyframes sunPulse{0%,100%{box-shadow:0 0 0 8px rgba(255,220,80,0.2)}50%{box-shadow:0 0 0 14px rgba(255,220,80,0.25)}}
  @keyframes hug{0%,100%{transform:translateX(0)}50%{transform:translateX(3px)}}
  @keyframes hugRight{0%,100%{transform:translateX(0)}50%{transform:translateX(-3px)}}
  @keyframes floatIcon{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  @keyframes petalFall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(400px) rotate(360deg);opacity:0}}

  .bear-scene{width:100%;max-width:100%;position:relative;overflow:hidden;background:linear-gradient(180deg,#FDEEF8 0%,#FFF4E0 45%,#F0E8C8 75%,#D8C89A 100%);padding-bottom:20px;}
  .bear-sun{position:absolute;top:20px;left:50%;transform:translateX(-50%);width:54px;height:54px;background:#FFD84A;border-radius:50%;animation:sunPulse 3s ease-in-out infinite;z-index:1;}
  .bear-cloud{position:absolute;background:rgba(255,255,255,0.82);border-radius:40px;z-index:1;}
  .bear-cloud::before,.bear-cloud::after{content:'';position:absolute;background:rgba(255,255,255,0.82);border-radius:50%;}
  .bc1{width:78px;height:26px;top:28px;left:55px;animation:cloudMove 9s ease-in-out infinite;}
  .bc1::before{width:36px;height:36px;top:-18px;left:10px;}
  .bc1::after{width:28px;height:28px;top:-14px;right:12px;}
  .bc2{width:58px;height:22px;top:48px;right:70px;animation:cloudMove 12s ease-in-out infinite reverse;opacity:0.75;}
  .bc2::before{width:28px;height:28px;top:-14px;left:8px;}
  .bc2::after{width:22px;height:22px;top:-10px;right:8px;}
  .bear-couple-wrap{display:flex;align-items:flex-end;justify-content:center;position:relative;z-index:3;padding-top:80px;padding-bottom:10px;animation:floatSlow 3s ease-in-out infinite;}
  .bear-white-anim{animation:hug 2.5s ease-in-out infinite;position:relative;z-index:2;}
  .bear-yellow-anim{animation:hugRight 2.5s ease-in-out infinite;margin-left:-18px;position:relative;z-index:1;}
  .bear-hearts{position:absolute;top:140px;left:50%;transform:translateX(-20px);pointer-events:none;z-index:4;width:80px;height:80px;}
  .bh1{position:absolute;left:28px;top:30px;font-size:20px;color:#E03060;animation:heartRise1 2.4s ease-out infinite;}
  .bh2{position:absolute;left:10px;top:46px;font-size:14px;color:#E87090;animation:heartRise2 2.4s ease-out infinite;animation-delay:0.7s;}
  .bh3{position:absolute;left:44px;top:48px;font-size:11px;color:#F4A0B8;animation:heartRise3 2.4s ease-out infinite;animation-delay:1.3s;}
  .bear-petal-float{position:absolute;font-size:12px;pointer-events:none;animation:petalFall linear infinite;z-index:2;}
`

export default function Hero({ answered, setAnswered }) {
  const [noIdx, setNoIdx] = useState(0)
  const [yesSize, setYesSize] = useState(1)
  const [hearts, setHearts] = useState([])

  const handleNo = () => {
    setNoIdx(i => Math.min(i + 1, noTexts.length - 1))
    setYesSize(s => Math.min(s + 0.18, 3))
  }

  const handleYes = () => {
    const h = Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      delay: Math.random() * 1.5,
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }))
    setHearts(h)
    setTimeout(() => setAnswered('yes'), 1800)
  }

  if (answered === 'yes') return (
    <section className="hero hero--yes">
      <div className="hero__yes-msg">
        <div className="big-heart">💖</div>
        <h1> He said YES! 🎉</h1>
        <p>Scroll down baby there is more waiting for you 🌹</p>
      </div>
    </section>
  )

  return (
    <>
      <style>{bearStyles}</style>

      {/* Bear Animation Scene */}
      <div className="bear-scene">
        <div className="bear-sun" />
        <div className="bear-cloud bc1" />
        <div className="bear-cloud bc2" />

        {/* Falling petals */}
        <div className="bear-petal-float" style={{left:'8%',animationDuration:'7s',top:'-10px'}}>🌸</div>
        <div className="bear-petal-float" style={{left:'70%',animationDuration:'8s',animationDelay:'1s',top:'-10px'}}>🌸</div>
        <div className="bear-petal-float" style={{left:'30%',animationDuration:'9s',animationDelay:'2s',top:'-10px',fontSize:'9px'}}>🌸</div>
        <div className="bear-petal-float" style={{left:'85%',animationDuration:'6s',animationDelay:'0.5s',top:'-10px',fontSize:'8px'}}>🌸</div>

        {/* SVG Scenery */}
        <svg width="100%" viewBox="0 0 680 180" style={{position:'absolute',bottom:0,left:0,zIndex:1}} xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="340" cy="190" rx="320" ry="90" fill="#7DAF52"/>
          <ellipse cx="70" cy="195" rx="170" ry="65" fill="#8BBD5A"/>
          <ellipse cx="612" cy="195" rx="170" ry="65" fill="#8BBD5A"/>
          <rect x="0" y="148" width="680" height="32" fill="#6A9A3A"/>
          <rect x="116" y="60" width="11" height="90" fill="#7A5230" rx="3"/>
          <ellipse cx="122" cy="52" rx="30" ry="34" fill="#4E7A2A"/>
          <rect x="541" y="65" width="11" height="85" fill="#7A5230" rx="3"/>
          <ellipse cx="547" cy="57" rx="28" ry="32" fill="#4E7A2A"/>
          <rect x="48" y="95" width="8" height="55" fill="#8B6346" rx="2"/>
          <ellipse cx="52" cy="88" rx="22" ry="24" fill="#F4C0D0" opacity="0.9"/>
          <rect x="618" y="95" width="8" height="55" fill="#8B6346" rx="2"/>
          <ellipse cx="622" cy="88" rx="22" ry="24" fill="#F4C0D0" opacity="0.9"/>
          <circle cx="82" cy="150" r="4" fill="#FFD166"/>
          <circle cx="185" cy="151" r="3.5" fill="#F4B0D0"/>
          <circle cx="490" cy="150" r="4" fill="#FFD166"/>
          <circle cx="580" cy="149" r="3.5" fill="#F4B0D0"/>
        </svg>

        {/* Floating hearts above bears */}
        <div className="bear-hearts">
          <div className="bh1">♥</div>
          <div className="bh2">♥</div>
          <div className="bh3">♥</div>
        </div>

        {/* Bear couple */}
        <div className="bear-couple-wrap">
          {/* White bear */}
          <svg className="bear-white-anim" width="110" height="120" viewBox="0 0 110 120" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="52" cy="88" rx="40" ry="36" fill="#F4F4F0" stroke="#DDD8CC" strokeWidth="1.5"/>
            <ellipse cx="52" cy="92" rx="24" ry="20" fill="#FFF9F0" opacity="0.8"/>
            <ellipse cx="50" cy="46" rx="30" ry="28" fill="#F4F4F0" stroke="#DDD8CC" strokeWidth="1.5"/>
            <circle cx="24" cy="22" r="12" fill="#F4F4F0" stroke="#DDD8CC" strokeWidth="1.5"/>
            <circle cx="24" cy="22" r="7" fill="#FFC8C8"/>
            <circle cx="76" cy="22" r="12" fill="#F4F4F0" stroke="#DDD8CC" strokeWidth="1.5"/>
            <circle cx="76" cy="22" r="7" fill="#FFC8C8"/>
            <ellipse cx="42" cy="44" rx="4" ry="4.5" fill="#2C1A10"/>
            <ellipse cx="58" cy="44" rx="4" ry="4.5" fill="#2C1A10"/>
            <circle cx="44" cy="42" r="1.5" fill="white"/>
            <circle cx="60" cy="42" r="1.5" fill="white"/>
            <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="#D4A090"/>
            <ellipse cx="35" cy="54" rx="7" ry="4" fill="rgba(255,140,140,0.35)"/>
            <ellipse cx="65" cy="54" rx="7" ry="4" fill="rgba(255,140,140,0.35)"/>
            <path d="M45 56 Q50 61 55 56" fill="none" stroke="#C09080" strokeWidth="1.5" strokeLinecap="round"/>
            <ellipse cx="82" cy="90" rx="14" ry="8" fill="#F4F4F0" stroke="#DDD8CC" strokeWidth="1.2" transform="rotate(-30,82,90)"/>
          </svg>

          {/* Yellow bear */}
          <svg className="bear-yellow-anim" width="100" height="116" viewBox="0 0 100 116" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="84" rx="37" ry="34" fill="#F4D060" stroke="#D4AA40" strokeWidth="1.5"/>
            <ellipse cx="50" cy="88" rx="22" ry="18" fill="#FFF0C0" opacity="0.75"/>
            <ellipse cx="48" cy="44" rx="28" ry="26" fill="#F4D060" stroke="#D4AA40" strokeWidth="1.5"/>
            <circle cx="24" cy="22" r="11" fill="#F4D060" stroke="#D4AA40" strokeWidth="1.5"/>
            <circle cx="24" cy="22" r="6.5" fill="#FFAA88"/>
            <circle cx="72" cy="22" r="11" fill="#F4D060" stroke="#D4AA40" strokeWidth="1.5"/>
            <circle cx="72" cy="22" r="6.5" fill="#FFAA88"/>
            <ellipse cx="40" cy="42" rx="3.5" ry="4" fill="#2C1A10"/>
            <ellipse cx="56" cy="42" rx="3.5" ry="4" fill="#2C1A10"/>
            <circle cx="42" cy="40" r="1.3" fill="white"/>
            <circle cx="58" cy="40" r="1.3" fill="white"/>
            <ellipse cx="48" cy="50" rx="4.5" ry="3" fill="#CC8870"/>
            <ellipse cx="33" cy="52" rx="6.5" ry="3.8" fill="rgba(255,130,80,0.3)"/>
            <ellipse cx="63" cy="52" rx="6.5" ry="3.8" fill="rgba(255,130,80,0.3)"/>
            <path d="M43 54 Q48 59 53 54" fill="none" stroke="#C08870" strokeWidth="1.4" strokeLinecap="round"/>
            <ellipse cx="18" cy="86" rx="12" ry="7" fill="#F4D060" stroke="#D4AA40" strokeWidth="1.2" transform="rotate(25,18,86)"/>
          </svg>
        </div>
      </div>

      {/* Original Hero Section */}
      <section className="hero">
        {hearts.map(h => (
          <span key={h.id} className="burst-heart" style={{ left: `${h.x}%`, animationDelay: `${h.delay}s`, fontSize: `${h.size}rem`, animationDuration: `${h.duration}s` }}>💖</span>
        ))}
        <div className="hero__inner">
          <p className="hero__eyebrow">A special question just for you</p>
          <div className="hero__bear">🐻</div>
          <h1 className="hero__title">Will you be<br /><em>my Valentine?</em></h1>
          <p className="hero__sub">You make every day feel like the first day of spring 🌸</p>
          <div className="hero__btns">
            <button className="btn btn--yes" style={{ transform: `scale(${yesSize})` }} onClick={handleYes}>Yes! 💖</button>
            <button className="btn btn--no" onClick={handleNo}>{noTexts[noIdx]}</button>
          </div>
        </div>
        <div className="hero__petals">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="petal" style={{ left: `${Math.random() * 100}%`, animationDelay: `${i * 0.6}s`, animationDuration: `${5 + Math.random() * 4}s` }}>🌸</span>
          ))}
        </div>
      </section>
    </>
  )
}