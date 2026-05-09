// Home / Campaign list - 3 variants

// A: Bookshelf metaphor - campaigns as book spines
const HomeA = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="My Campaigns" left="≡" right="+" sub="3 in progress · 1 archived"/>
    <div className="wf-scroll" style={{overflowY: 'auto', padding: '14px 14px 0'}}>
      <div className="wf-label" style={{marginBottom: 10}}>// Active campaigns</div>

      {/* Bookshelf row */}
      <div style={{
        display: 'flex', gap: 8, alignItems: 'flex-end',
        padding: '14px 8px 10px', marginBottom: 6,
        borderBottom: '3px solid var(--line)',
        position: 'relative',
      }}>
        {[
          { t: 'The Iron Vale', h: 150, c: 'var(--accent)', spine: '#3a5a8a' },
          { t: 'Salt & Stone', h: 132, c: 'var(--rust)', spine: '#8a4a2a' },
          { t: 'Glasswood', h: 165, c: 'var(--explore)', spine: '#3a6a4a' },
        ].map((b, i) => (
          <div key={i} style={{
            width: 38, height: b.h, background: b.spine,
            border: '1.5px solid var(--line)',
            borderRadius: '3px 3px 0 0',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 10, position: 'relative',
          }}>
            <div style={{
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              fontFamily: 'Caveat, cursive', fontSize: 16, fontWeight: 700,
              color: '#f4efe6', letterSpacing: '0.02em',
            }}>{b.t}</div>
            <div style={{
              position:'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
              width: 24, height: 1.5, background: '#f4efe6'
            }}/>
          </div>
        ))}
        <div style={{
          width: 38, height: 100, border: '1.5px dashed var(--ink-soft)',
          borderRadius: '3px 3px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Caveat, cursive', fontSize: 28, color: 'var(--ink-faint)',
        }}>+</div>
      </div>
      <div className="wf-meta" style={{textAlign:'center', marginBottom: 12}}>
        ── tap a spine to open ──
      </div>

      {/* Currently reading card */}
      <div className="wf-box-double" style={{padding: 12, marginBottom: 14, background: 'var(--paper-warm)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <div className="wf-label">// Currently playing</div>
          <span className="wf-tag wf-tag-accent">resume</span>
        </div>
        <div className="wf-title" style={{marginTop: 4}}>The Iron Vale</div>
        <div className="wf-meta" style={{marginBottom: 6}}>Session 4 · Phase 2 of 5 · ch.III "The Gloaming"</div>
        <Handwriting lines={2} lastWidth="80%"/>
        <div style={{display:'flex', gap: 8, marginTop: 10, alignItems:'center'}}>
          <Progress filled={2} total={5} />
          <span className="wf-meta">·  4 of 12 flips used</span>
        </div>
        <div style={{display:'flex', gap: 8, marginTop: 10}}>
          <button className="wf-btn wf-btn-primary" style={{flex: 1}}>↻ Resume</button>
          <button className="wf-btn wf-btn-sm">⋯</button>
        </div>
      </div>

      <div className="wf-divider"/>
      <div className="wf-label" style={{margin: '12px 0 8px'}}>// Quick actions</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginBottom: 16}}>
        <button className="wf-btn wf-btn-sm" style={{padding:'10px'}}>+ New campaign</button>
        <button className="wf-btn wf-btn-sm" style={{padding:'10px'}}>📖 Card prompts</button>
      </div>

      <Anno style={{top: 60, right: 18, transform:'rotate(-4deg)', maxWidth: 100, textAlign:'right'}}>
        spines = active<br/>campaigns ↘
      </Anno>
      <Anno style={{top: 240, left: 8, transform:'rotate(2deg)', maxWidth: 80}}>
        ← always show<br/>last session
      </Anno>
    </div>
    <BottomNav active="home"/>
  </div>
);

// B: Card-stack metaphor - each campaign is a stack of cards
const HomeB = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Campaigns" left="⚙" right="+" sub="tap a stack to enter"/>
    <div className="wf-scroll" style={{overflowY: 'auto', padding: '14px 14px 0', display:'flex', flexDirection:'column', gap: 14}}>

      {[
        { t: 'The Iron Vale', meta: 'Sess. 4 · 2 chars · started Apr 12', flips: '8/12', status: 'active', main: true },
        { t: 'Salt & Stone', meta: 'Sess. 2 · 1 char · started Mar 03', flips: '3/12', status: 'active' },
        { t: 'Glasswood', meta: 'Sess. 7 · paused 12d ago', flips: '0/12', status: 'paused' },
      ].map((c, i) => (
        <div key={i} className="wf-box" style={{padding: 12, background: c.main ? 'var(--paper-warm)' : 'var(--paper)'}}>
          <div style={{display:'flex', gap: 12}}>
            {/* mini card stack */}
            <div style={{position:'relative', width: 60, height: 88, flexShrink: 0}}>
              <CardBack w={50} h={76} style={{position:'absolute', left: 8, top: 8, transform:'rotate(4deg)', opacity: 0.6}}/>
              <CardBack w={50} h={76} style={{position:'absolute', left: 4, top: 4, transform:'rotate(-2deg)', opacity: 0.85}}/>
              <CardBack w={50} h={76} style={{position:'absolute', left: 0, top: 0}}/>
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <div className="wf-title">{c.t}</div>
              <div className="wf-meta" style={{marginBottom: 6}}>{c.meta}</div>
              <div style={{display:'flex', gap: 6, flexWrap:'wrap'}}>
                <span className="wf-tag wf-tag-explore">♦ explore {c.flips.split('/')[0]}</span>
                <span className="wf-tag wf-tag-combat">♣ combat 2</span>
                {c.status === 'paused' && <span className="wf-tag">paused</span>}
              </div>
              <div style={{display:'flex', gap: 6, marginTop: 8}}>
                <button className={`wf-btn wf-btn-sm ${c.main ? 'wf-btn-primary':''}`} style={{flex:1}}>
                  {c.main ? '↻ Resume' : 'Open'}
                </button>
                <button className="wf-btn wf-btn-sm">⋯</button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="wf-btn wf-box-dashed" style={{padding: '20px', boxShadow:'none', background:'transparent'}}>
        <span style={{fontSize: 22}}>+</span>  Begin a new campaign
      </button>

      <Anno style={{top: 110, right: 6, transform:'rotate(6deg)', maxWidth: 90}}>
        ↑ stack height = <br/>session count
      </Anno>
    </div>
    <BottomNav active="home"/>
  </div>
);

// C: Map/journal metaphor - campaigns laid out like journal entries
const HomeC = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <div style={{
      padding: '14px 16px 10px',
      borderBottom: '1.5px solid var(--line)',
      flexShrink: 0,
      background: 'var(--paper-warm)',
      position: 'relative',
    }}>
      <div className="wf-label">// The Colostle Companion</div>
      <div style={{fontFamily:'Caveat, cursive', fontSize: 32, fontWeight: 700, lineHeight: 1, marginTop: 4}}>
        Hello, traveller.
      </div>
      <div className="wf-meta" style={{marginTop: 4}}>You've been wandering for 28 days.</div>
    </div>

    <div className="wf-scroll" style={{overflowY: 'auto', padding: '12px 16px'}}>
      {/* Active session - prominent */}
      <div style={{
        position: 'relative', padding: '14px 14px 14px 18px', marginBottom: 14,
        background: 'var(--paper-warm)',
        borderLeft: '4px solid var(--accent)',
        borderRadius: '0 6px 7px 0',
      }}>
        <div className="wf-label">// last seen Apr 28</div>
        <div className="wf-title" style={{marginTop: 2}}>The Iron Vale</div>
        <div className="wf-body" style={{marginTop: 4, fontStyle: 'italic'}}>
          "...the Rook lingered at the edge of the chasm, waiting."
        </div>
        <div style={{display:'flex', gap: 10, marginTop: 10, alignItems:'center'}}>
          <button className="wf-btn wf-btn-primary wf-btn-sm">Continue ›</button>
          <span className="wf-meta">phase 2 of 5</span>
        </div>
      </div>

      <div className="wf-label" style={{marginBottom: 8}}>// Other journeys</div>
      {[
        { t: 'Salt & Stone', date: 'Mar 03', meta: '2 sessions · 1 char' },
        { t: 'Glasswood', date: 'Feb 18', meta: '7 sessions · paused' },
      ].map((c, i) => (
        <div key={i} style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding: '10px 4px',
          borderBottom: '1px dashed var(--ink-soft)',
        }}>
          <div>
            <div className="wf-h2">{c.t}</div>
            <div className="wf-meta">{c.meta}</div>
          </div>
          <div className="wf-meta">{c.date}  ›</div>
        </div>
      ))}

      <div className="wf-divider" style={{margin:'18px 0 12px'}}/>

      <div className="wf-label" style={{marginBottom: 8}}>// Quick start</div>
      <div style={{display:'flex', gap: 8, flexWrap:'wrap'}}>
        <button className="wf-btn wf-btn-sm">+ New campaign</button>
        <button className="wf-btn wf-btn-sm">↗ Import</button>
        <button className="wf-btn wf-btn-sm">📖 Prompts</button>
      </div>

      <Anno style={{top: 100, right: 8, transform: 'rotate(-3deg)', maxWidth: 90, textAlign:'right'}}>
        opens last quote ↗<br/>as a hook
      </Anno>
    </div>
    <BottomNav active="home"/>
  </div>
);

Object.assign(window, { HomeA, HomeB, HomeC });
