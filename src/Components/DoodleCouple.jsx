import { useState, useEffect, useRef } from "react";
import "./DoodleCouple.css";

const quotes = [
  "You are the best thing that ever happened to me.",
  "Every moment with you feels like pure magic.",
  "You make ordinary days extraordinary.",
  "I love you more than words could ever say.",
  "With you, I am always home.",
  "You are my favourite adventure.",
  "My heart knew you before we even met.",
  "Loving you is the easiest thing I've ever done.",
  "In your arms is where I belong.",
  "Every love story is beautiful, but ours is my favourite.",
];

const HEART_CHARS = ["♥", "♡", "❤", "💕", "💗", "✦"];
const HEART_COLORS = ["#e8b4c0", "#f2c4ce", "#d4869a", "#f9afc0", "#f97094", "#fce490"];

function FloatingHeart({ id, onRemove }) {
  const left = `${4 + Math.random() * 92}%`;
  const fontSize = `${8 + Math.random() * 14}px`;
  const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
  const char = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];
  const dur = 5 + Math.random() * 6;
  const delay = Math.random() * 1.5;

  useEffect(() => {
    const t = setTimeout(() => onRemove(id), (dur + 2) * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fh"
      style={{
        left,
        fontSize,
        color,
        animationDuration: `${dur}s`,
        animationDelay: `${delay}s`,
      }}
    >
      {char}
    </div>
  );
}

export default function DoodleCouple() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [hearts, setHearts] = useState([]);
  const heartIdRef = useRef(0);

  const spawnHeart = () => {
    const id = heartIdRef.current++;
    setHearts((prev) => [...prev, id]);
  };

  const removeHeart = (id) => {
    setHearts((prev) => prev.filter((h) => h !== id));
  };

  useEffect(() => {
    for (let i = 0; i < 12; i++) {
      setTimeout(spawnHeart, i * 400);
    }
    const interval = setInterval(spawnHeart, 850);
    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setFading(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setFading(false);
    }, 380);
  };

  return (
    <div className="dc-root">
      <div className="hbg">
        {hearts.map((id) => (
          <FloatingHeart key={id} id={id} onRemove={removeHeart} />
        ))}
      </div>

      <svg className="top-scribble" width="440" height="48" viewBox="0 0 440 48">
        <g fill="none" strokeLinecap="round">
          <path d="M22 24C22 19 16 16 16 21C16 25 22 30 22 30C22 30 28 25 28 21C28 16 22 19 22 24Z" fill="#f4b0c4" stroke="#e898b4" strokeWidth="1.1" opacity=".8"/>
          <path d="M56 22C56 18 52 16 52 20C52 23 56 26 56 26C56 26 60 23 60 20C60 16 56 18 56 22Z" fill="#fcccd8" stroke="#e898b4" strokeWidth=".9" opacity=".6"/>
          <circle cx="82" cy="24" r="2.2" fill="#f0b4c4" opacity=".6"/>
          <circle cx="98" cy="19" r="1.7" fill="#f0b4c4" opacity=".5"/>
          <circle cx="113" cy="26" r="1.3" fill="#f0b4c4" opacity=".4"/>
          <path d="M133 23Q147 13 161 23Q175 33 189 23" stroke="#d09ab0" strokeWidth="1.1" opacity=".45"/>
          <path d="M208 19L210 14L212 19L217 19L213 22L215 26L210 23L205 26L207 22L203 19Z" fill="#fcccd8" stroke="#e898b4" strokeWidth=".8" opacity=".6"/>
          <path d="M236 24C236 20 232 18 232 22C232 25 236 28 236 28C236 28 240 25 240 22C240 18 236 20 236 24Z" fill="#f4b0c4" stroke="#e898b4" strokeWidth="1" opacity=".55"/>
          <circle cx="260" cy="21" r="2" fill="#f0b4c4" opacity=".4"/>
          <circle cx="276" cy="27" r="1.5" fill="#f0b4c4" opacity=".32"/>
          <path d="M294 23Q305 15 316 23" stroke="#d09ab0" strokeWidth="1" opacity=".38"/>
          <path d="M332 22C332 19 329 18 329 21C329 23 332 26 332 26C332 26 335 23 335 21C335 18 332 19 332 22Z" fill="#fcccd8" stroke="#e898b4" strokeWidth=".8" opacity=".45"/>
        </g>
      </svg>

      <div className="dc-page">
        <div className="couple-wrap">
          <svg className="couple-svg" viewBox="0 0 240 310" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="115" cy="200" rx="80" ry="90" fill="#ffe8f0" opacity=".35"/>
            <ellipse cx="115" cy="278" rx="88" ry="12" fill="#f0d8c8" opacity=".6"/>

            <g className="sw" style={{animationDelay:"0s"}}>
              <line x1="30" y1="274" x2="30" y2="258" stroke="#9ec060" strokeWidth="1.6"/>
              <circle cx="30" cy="255" r="5" fill="#f9a0bc"/>
              <circle cx="26" cy="259" r="2.8" fill="#fdd0dc" opacity=".7"/>
            </g>
            <g className="sw2" style={{animationDelay:".5s"}}>
              <line x1="50" y1="274" x2="50" y2="263" stroke="#9ec060" strokeWidth="1.5"/>
              <circle cx="50" cy="260" r="3.8" fill="#fce480"/>
            </g>
            <g className="sw3" style={{animationDelay:".9s"}}>
              <line x1="66" y1="274" x2="66" y2="265" stroke="#9ec060" strokeWidth="1.4"/>
              <circle cx="66" cy="262" r="3" fill="#b8d8f0" opacity=".9"/>
            </g>
            <g className="sw" style={{animationDelay:".3s"}}>
              <line x1="190" y1="274" x2="190" y2="259" stroke="#9ec060" strokeWidth="1.6"/>
              <circle cx="190" cy="256" r="5" fill="#f9a0bc"/>
            </g>
            <g className="sw2" style={{animationDelay:".7s"}}>
              <line x1="206" y1="274" x2="206" y2="264" stroke="#9ec060" strokeWidth="1.5"/>
              <circle cx="206" cy="261" r="3.5" fill="#fce480" opacity=".85"/>
            </g>
            <g className="sw3" style={{animationDelay:"1.2s"}}>
              <line x1="170" y1="274" x2="170" y2="266" stroke="#9ec060" strokeWidth="1.3"/>
              <circle cx="170" cy="263" r="2.8" fill="#b8d8f0" opacity=".8"/>
            </g>

            <g className="couple-idle">

              {/* BOY */}
              <g className="boy-g">
                <rect x="74" y="240" width="16" height="30" rx="6" fill="#5870b0"/>
                <rect x="94" y="240" width="16" height="30" rx="6" fill="#5870b0"/>
                <line x1="82" y1="242" x2="82" y2="268" stroke="#4860a0" strokeWidth=".8" opacity=".5"/>
                <line x1="102" y1="242" x2="102" y2="268" stroke="#4860a0" strokeWidth=".8" opacity=".5"/>
                <ellipse cx="82" cy="272" rx="10" ry="6" fill="#2e2e42"/>
                <ellipse cx="102" cy="272" rx="10" ry="6" fill="#2e2e42"/>
                <ellipse cx="78" cy="270" rx="4" ry="2" fill="#484860" opacity=".6"/>
                <ellipse cx="98" cy="270" rx="4" ry="2" fill="#484860" opacity=".6"/>
                <path d="M82 185 C68 190 60 208 58 240 L88 242 L90 212 L96 212 L98 242 L126 240 C124 208 118 190 104 185 Z" fill="#7ab8cc" stroke="#5aa0b8" strokeWidth="1.5"/>
                <path d="M90 185 L93 196 L96 185" stroke="#4a90a8" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
                <circle cx="93" cy="202" r="1.5" fill="#4a90a8" opacity=".7"/>
                <circle cx="93" cy="212" r="1.5" fill="#4a90a8" opacity=".7"/>
                <circle cx="93" cy="222" r="1.5" fill="#4a90a8" opacity=".7"/>
                <rect x="103" y="198" width="12" height="10" rx="2" fill="none" stroke="#4a90a8" strokeWidth="1" opacity=".6"/>
                <path d="M82 194 Q73 212 71 228" stroke="#f5c4a0" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <circle cx="71" cy="229" r="5.5" fill="#f5c4a0"/>
                <path d="M104 192 Q132 188 140 200" stroke="#f5c4a0" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <circle cx="140" cy="201" r="5.5" fill="#f5c4a0"/>
                <rect x="88" y="173" width="16" height="15" rx="6" fill="#f5c4a0"/>
                <ellipse cx="96" cy="157" rx="25" ry="25" fill="#f5c4a0" stroke="#60402a" strokeWidth="1.3"/>
                <path d="M72 152 C74 130 120 128 120 152 C116 134 76 132 72 152Z" fill="#5c3a1e"/>
                <path d="M72 152 C70 142 76 130 84 127" stroke="#5c3a1e" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <path d="M120 152 C122 142 117 131 110 128" stroke="#5c3a1e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <path d="M72 158 C70 165 71 172 74 176" stroke="#5c3a1e" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
                <ellipse cx="71" cy="158" rx="5.5" ry="7.5" fill="#f5c4a0" stroke="#d8a880" strokeWidth=".8"/>
                <path d="M71 154 Q73 158 71 162" stroke="#d8a880" strokeWidth=".8" fill="none"/>
                <ellipse cx="88" cy="157" rx="4.5" ry="5" fill="#fff" stroke="#40281a" strokeWidth="1.2"/>
                <circle cx="89" cy="157" r="2.5" fill="#1e1008"/>
                <circle cx="90" cy="155" r="1" fill="#fff"/>
                <path d="M84 157 Q86 155 88 157 Q90 155 92 157" stroke="#40281a" strokeWidth=".6" fill="none" opacity=".4"/>
                <path d="M83 149 Q88 147 93 149" stroke="#5c3a1e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M93 163 Q96 167 99 163" stroke="#d8a070" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                <path d="M86 170 Q93 176 100 170" stroke="#b85840" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M88 171 Q93 174 98 171" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".7"/>
                <ellipse className="blush" cx="78" cy="168" rx="7" ry="4" fill="#f9a0b0" opacity=".45"/>
                <ellipse className="blush" cx="114" cy="168" rx="6" ry="3.5" fill="#f9a0b0" opacity=".35"/>
              </g>

              {/* GIRL */}
              <g className="girl-g">
                <path d="M122 198 C114 205 110 225 107 274 L155 274 C152 225 146 205 138 198 Z" fill="#f080a0" stroke="#d85888" strokeWidth="1.8"/>
                <path d="M105 252 Q117 263 130 255 Q143 263 156 252" stroke="#d85888" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M106 238 Q116 246 128 240 Q140 246 154 238" stroke="#e070a0" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".65"/>
                <path d="M107 264 Q119 271 130 265 Q141 271 154 264" stroke="#d05080" strokeWidth="1" fill="none" strokeLinecap="round" opacity=".5"/>
                <ellipse cx="118" cy="276" rx="11" ry="6" fill="#c83870"/>
                <ellipse cx="143" cy="276" rx="11" ry="6" fill="#c83870"/>
                <ellipse cx="114" cy="274" rx="4.5" ry="2" fill="#e06090" opacity=".6"/>
                <ellipse cx="139" cy="274" rx="4.5" ry="2" fill="#e06090" opacity=".6"/>
                <path d="M114 272 Q118 268 122 272" stroke="#f090b8" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M139 272 Q143 268 147 272" stroke="#f090b8" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
                <path d="M122 184 C113 186 109 198 109 206 L151 206 C151 198 147 186 138 184 Z" fill="#fca8c0" stroke="#d85888" strokeWidth="1.5"/>
                <rect x="109" y="202" width="42" height="7" rx="3.5" fill="#d85888" opacity=".75"/>
                <circle cx="130" cy="205.5" r="3" fill="#f0d0a0" stroke="#d85888" strokeWidth=".8"/>
                <path d="M120 184 Q130 178 140 184" stroke="#fdd0e0" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M122 192 Q112 208 110 224" stroke="#f5c4b0" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <circle cx="110" cy="225" r="5.5" fill="#f5c4b0"/>
                <path d="M136 192 Q120 185 110 188" stroke="#f5c4b0" strokeWidth="8" fill="none" strokeLinecap="round"/>
                <circle cx="109" cy="189" r="5.5" fill="#f5c4b0"/>
                <rect x="124" y="172" width="12" height="14" rx="5" fill="#f5c4b0"/>
                <path d="M124 184 Q130 190 136 184" stroke="#f0c040" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".8"/>
                <circle cx="130" cy="189" r="2" fill="#f0c040" opacity=".9"/>
                <ellipse cx="130" cy="156" rx="22" ry="23" fill="#f5c4b0" stroke="#60402a" strokeWidth="1.2"/>
                <path d="M109 152 C107 172 110 218 113 228" stroke="#7a4a24" strokeWidth="10" fill="none" strokeLinecap="round"/>
                <path d="M151 152 C153 172 150 218 148 228" stroke="#7a4a24" strokeWidth="9" fill="none" strokeLinecap="round"/>
                <path d="M112 152 C110 170 112 210 115 220" stroke="#9a6a44" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".5"/>
                <path d="M109 152 C110 128 152 128 151 152 C147 132 113 131 109 152Z" fill="#7a4a24"/>
                <path d="M118 134 C122 129 138 129 142 134" stroke="#9a6a44" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/>
                <ellipse cx="152" cy="157" rx="5" ry="7" fill="#f5c4b0" stroke="#d8a090" strokeWidth=".8"/>
                <path d="M152 153 Q154 157 152 161" stroke="#d8a090" strokeWidth=".8" fill="none"/>
                <path d="M119 153 Q125 149 131 153" stroke="#40281a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <path d="M131 153 Q137 149 143 153" stroke="#40281a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                <line x1="119" y1="153" x2="117" y2="149" stroke="#40281a" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="122" y1="151" x2="121" y2="147" stroke="#40281a" strokeWidth="1.1" strokeLinecap="round"/>
                <line x1="126" y1="150" x2="125" y2="146" stroke="#40281a" strokeWidth="1" strokeLinecap="round"/>
                <line x1="143" y1="153" x2="145" y2="149" stroke="#40281a" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="140" y1="151" x2="141" y2="147" stroke="#40281a" strokeWidth="1.1" strokeLinecap="round"/>
                <line x1="136" y1="150" x2="137" y2="146" stroke="#40281a" strokeWidth="1" strokeLinecap="round"/>
                <path d="M118 147 Q125 143 131 147" stroke="#6a3e20" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                <path d="M131 147 Q137 143 143 147" stroke="#6a3e20" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                <path d="M127 163 Q130 167 133 163" stroke="#d8a070" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
                <path d="M122 168 Q130 175 138 168" stroke="#b85840" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M124 169 Q130 173 136 169" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity=".65"/>
                <ellipse className="blush" cx="145" cy="165" rx="6.5" ry="4" fill="#f9a0b4" opacity=".5"/>
                <ellipse className="blush" cx="115" cy="165" rx="5.5" ry="3.5" fill="#f9a0b4" opacity=".4"/>
                <circle cx="152" cy="138" r="8.5" fill="#f080a0"/>
                <circle cx="152" cy="138" r="4" fill="#fce490"/>
                <circle cx="157" cy="132" r="5" fill="#f090b8" opacity=".75"/>
                <circle cx="157" cy="132" r="2.5" fill="#fce490" opacity=".9"/>
                <circle cx="146" cy="133" r="4" fill="#f9b0c8" opacity=".6"/>
                <line x1="107" y1="145" x2="114" y2="152" stroke="#e0a0c0" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="107" cy="144" r="3" fill="#f9d0e0"/>
              </g>

            </g>

            <g className="kiss-fx">
              <line x1="115" y1="135" x2="108" y2="118" stroke="#f96080" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="115" y1="135" x2="130" y2="122" stroke="#f96080" strokeWidth="1.8" strokeLinecap="round"/>
              <line x1="115" y1="135" x2="104" y2="125" stroke="#fba0b8" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="115" y1="135" x2="128" y2="128" stroke="#fba0b8" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="115" y1="135" x2="120" y2="116" stroke="#fba0b8" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="115" y1="135" x2="100" y2="130" stroke="#fba0b8" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M115 130C115 127 111 126 111 129C111 131 115 134 115 134C115 134 119 131 119 129C119 126 115 127 115 130Z" fill="#f96080"/>
              <path d="M106 124C106 122 103 121 103 123C103 125 106 127 106 127C106 127 109 125 109 123C109 121 106 122 106 124Z" fill="#fba0b8"/>
              <path d="M126 124C126 122 123 121 123 123C123 125 126 127 126 127C126 127 129 125 129 123C129 121 126 122 126 124Z" fill="#fba0b8"/>
              <path d="M100 133L101.5 128L103 133L107.5 133L104 136L105.5 141L101.5 138L97.5 141L99 136L95.5 133Z" fill="#fce490" opacity=".9" transform="scale(.65) translate(55,72)"/>
              <path d="M125 120L126.5 116L128 120L132 120L129 122.5L130 126L126.5 124L123 126L124 122.5L121 120Z" fill="#fce490" opacity=".8" transform="scale(.58) translate(96,88)"/>
              <text x="115" y="112" textAnchor="middle" fontSize="14" fill="#f96080" fontFamily="serif" opacity=".9">💋</text>
            </g>

            <g className="rh1"><path d="M106 152C106 149 102 147 102 150C102 153 106 156 106 156C106 156 110 153 110 150C110 147 106 149 106 152Z" fill="#f96080" opacity=".9"/></g>
            <g className="rh2"><path d="M118 148C118 145 114 144 114 147C114 150 118 153 118 153C118 153 122 150 122 147C122 144 118 145 118 148Z" fill="#fba0b8" opacity=".85"/></g>
            <g className="rh3"><path d="M130 152C130 149 126 148 126 151C126 154 130 157 130 157C130 157 134 154 134 151C134 148 130 149 130 152Z" fill="#f96080" opacity=".8"/></g>

            <g className="a1 hb" style={{animationDelay:"0s"}}><path d="M70 110C70 106 65 104 65 108C65 111 70 115 70 115C70 115 75 111 75 108C75 104 70 106 70 110Z" fill="#f97090" opacity=".75"/></g>
            <g className="a2" style={{animationDelay:".6s"}}><path d="M166 102C166 99 162 97 162 100C162 103 166 106 166 106C166 106 170 103 170 100C170 97 166 99 166 102Z" fill="#e87090" opacity=".65"/></g>
            <g className="a3 hb" style={{animationDelay:"1.1s"}}><path d="M118 84C118 81 114 79 114 82C114 85 118 88 118 88C118 88 122 85 122 82C122 79 118 81 118 84Z" fill="#f9a0b8" opacity=".6"/></g>
            <g className="a4" style={{animationDelay:".3s"}}><path d="M150 72C150 70 147 69 147 71C147 73 150 75 150 75C150 75 153 73 153 71C153 69 150 70 150 72Z" fill="#fbb0c8" opacity=".5"/></g>
            <g className="a1" style={{animationDelay:"1.5s"}}><path d="M82 94C82 92 79 91 79 93C79 95 82 97 82 97C82 97 85 95 85 93C85 91 82 92 82 94Z" fill="#f9c0d0" opacity=".45"/></g>

            <g className="tw"><path d="M58 120L59.5 115L61 120L66 120L62 123L63.5 128L59.5 125L55.5 128L57 123L53 120Z" fill="#fce490" opacity=".7"/></g>
            <g className="tw2"><path d="M176 106L177.5 102L179 106L183 106L180 108.5L181.5 112L177.5 110L173.5 112L175 108.5L172 106Z" fill="#fce490" opacity=".6"/></g>
            <g className="tw" style={{animationDelay:".8s"}}><path d="M42 148L43 145L44 148L47 148L45 150L46 153L43 151L40 153L41 150L39 148Z" fill="#fce490" opacity=".5"/></g>
          </svg>
        </div>

        <div className="dc-right">
          <div className="dc-logo">
            <svg width="18" height="18" viewBox="0 0 20 20">
              <path d="M10 17S2 11.5 2 6.5A4 4 0 0 1 10 4.7 4 4 0 0 1 18 6.5C18 11.5 10 17 10 17z" fill="none" stroke="#d4869a" strokeWidth="1.5"/>
            </svg>
            amour
          </div>
          <p className="dc-hint">Psst… a secret</p>
          <h1 className="dc-tap-label">Tap to reveal</h1>
          <div className="dc-card" onClick={nextQuote}>
            <div className={`dc-quote${fading ? " fade" : ""}`}>
              "{quotes[quoteIndex]}"
            </div>
            <button
              className="dc-btn"
              onClick={(e) => { e.stopPropagation(); nextQuote(); }}
            >
              Another one ♥
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}