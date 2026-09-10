'use client';

import React, { useState } from 'react';

export function HeroLanding() {
  const [selectedFilm, setSelectedFilm] = useState<'kling' | 'runway' | 'sora' | 'luma'>('kling');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '2.39:1' | '9:16'>('2.39:1');
  const [isPlaying, setIsPlaying] = useState(true);

  const REELS = {
    kling: {
      title: 'Hyper-Realistic Physics & Cinematic Fluidity',
      engine: 'Kling 1.5 HD Pro',
      resolution: '4K Ultra-HD (3840x2160)',
      fps: '60 FPS Native',
      grade: 'ACEScg / Arri Alexa Mini LF Profile',
      tag: 'FEATURED PREMIERE',
      prompt: 'Anamorphic 65mm camera tracking shot across neon cyberpunk cityscape in torrential rain, volumetric reflections, photorealistic mist'
    },
    runway: {
      title: 'Temporal Consistency & Camera Motion Brush',
      engine: 'Runway Gen-3 Alpha Turbo',
      resolution: '4K DCI (4096x2160)',
      fps: '48 FPS High-Frame-Rate',
      grade: 'Kodak Vision3 5219 Emulation',
      tag: 'DIRECTOR CUT',
      prompt: 'Dramatic slow dolly-in into an antique astronaut helmet reflecting a dying supernova, cinematic rim lighting, 35mm film grain'
    },
    sora: {
      title: 'World Physics Simulation & Complex Multi-Character',
      engine: 'OpenAI Sora Studio Release',
      resolution: '4K HDR10+ Dolby Vision',
      fps: '60 FPS Seamless',
      grade: 'Panavision Primo 70 Optics',
      tag: 'OFFICIAL SELECTION',
      prompt: 'Aerial drone fpv diving down cascading bioluminescent waterfalls inside a gargantuan subterranean cavern, volumetric sun shafts'
    },
    luma: {
      title: 'Zero-Latency Real-Time Keyframe Interpolation',
      engine: 'Luma Dream Machine 2.0',
      resolution: '4K UHD Cinema DNG',
      fps: '120 FPS High Speed',
      grade: 'Technicolor 3-Strip Digital Master',
      tag: 'TECHNICAL AWARD',
      prompt: 'Macro shot of microscopic mechanical clockwork gears ticking in sync, titanium gears with oil iridescence and shallow depth of field'
    }
  };

  const active = REELS[selectedFilm];

  return (
    <section className="cinema-hero">
      <div className="container cinema-hero-container">
        {/* Top Badges */}
        <div className="cinema-badge-row">
          <span className="cinema-badge">
            <span className="cinema-badge-red-dot" />
            CINEMATIC AI SHOWCASE &amp; FILM DIRECTORY
          </span>
          <span className="cinema-meta-pill">
            CURATED: DIRECT GENERATIVE VIDEO &amp; 3D PIPELINES
          </span>
        </div>

        {/* Title */}
        <h1 className="cinema-title">
          Where Generative AI Meets <span className="cinema-amber-glow">Cinematic Vision</span>
        </h1>

        <p className="cinema-sub">
          The curated film directory and production index for high-fidelity generative video engines, 3D Gaussian splatting, and neural VFX workflows.
        </p>

        {/* Interactive Screening Room / Player */}
        <div className="cinema-screening-room">
          {/* Film Selectors */}
          <div className="cinema-film-selectors">
            <button 
              type="button"
              className={`cinema-selector-btn ${selectedFilm === 'kling' ? 'active' : ''}`}
              onClick={() => setSelectedFilm('kling')}
            >
              ▶ Kling 1.5 HD
            </button>
            <button 
              type="button"
              className={`cinema-selector-btn ${selectedFilm === 'runway' ? 'active' : ''}`}
              onClick={() => setSelectedFilm('runway')}
            >
              ▶ Runway Gen-3
            </button>
            <button 
              type="button"
              className={`cinema-selector-btn ${selectedFilm === 'sora' ? 'active' : ''}`}
              onClick={() => setSelectedFilm('sora')}
            >
              ▶ Sora Studio
            </button>
            <button 
              type="button"
              className={`cinema-selector-btn ${selectedFilm === 'luma' ? 'active' : ''}`}
              onClick={() => setSelectedFilm('luma')}
            >
              ▶ Luma Dream
            </button>
          </div>

          {/* Screening Monitor */}
          <div className={`cinema-monitor aspect-${aspectRatio.replace(':', '-')}`}>
            <div className="cinema-monitor-overlay">
              <div className="monitor-top-bar">
                <span className="rec-indicator">
                  <span className="rec-dot" /> REC [00:04:18:22]
                </span>
                <span className="active-engine-badge">{active.engine}</span>
                <span className="format-badge">{active.resolution}</span>
              </div>

              <div className="monitor-center-content">
                <span className="reel-tag">{active.tag}</span>
                <h3 className="reel-title">{active.title}</h3>
                <p className="reel-prompt">“{active.prompt}”</p>
              </div>

              <div className="monitor-bottom-bar">
                <div className="timecode-wrap">
                  <span className="tc-label">LUT / GRADE:</span>
                  <span className="tc-val">{active.grade}</span>
                </div>

                <div className="aspect-controls">
                  <span className="aspect-label">FRAMING:</span>
                  <button 
                    type="button"
                    className={`aspect-btn ${aspectRatio === '2.39:1' ? 'active' : ''}`}
                    onClick={() => setAspectRatio('2.39:1')}
                  >
                    2.39:1
                  </button>
                  <button 
                    type="button"
                    className={`aspect-btn ${aspectRatio === '16:9' ? 'active' : ''}`}
                    onClick={() => setAspectRatio('16:9')}
                  >
                    16:9
                  </button>
                  <button 
                    type="button"
                    className={`aspect-btn ${aspectRatio === '9:16' ? 'active' : ''}`}
                    onClick={() => setAspectRatio('9:16')}
                  >
                    9:16
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Monitor Footer Controls */}
          <div className="cinema-monitor-footer">
            <div className="cinema-fps-indicator">
              <span className="cinema-lens-icon">◎</span>
              <span>{active.fps} · NEURAL MOTION VECTOR PASSED</span>
            </div>
            <a href="#directory" className="cinema-explore-btn">
              Browse All Film AI Engines &rarr;
            </a>
          </div>
        </div>

        {/* Global Cinema Search */}
        <div className="cinema-search-wrap">
          <div className="cinema-search-box">
            <svg className="cinema-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input 
              type="text" 
              placeholder="Search generative video models, neural VFX, Gaussian splats..." 
              className="cinema-search-input" 
            />
            <button type="button" className="cinema-search-btn">Search Repertoire</button>
          </div>
        </div>
      </div>
    </section>
  );
}
