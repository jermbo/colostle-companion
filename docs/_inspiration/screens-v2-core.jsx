// V2 - tightened versions of the picks + new screens

// HOME (refined option A) - bookshelf, but cleaner hierarchy
const HomeV2 = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="My Campaigns" left="≡" right="+" sub="3 active · 1 archived"/>
    <div className="wf-scroll" style={{overflowY: 'auto'}}>
      {/* Currently playing - hero */}
      <div style={{padding: '14px 14px 0'}}>
        <div className="wf-label" style={{marginBottom: 6}}>// last played 2d ago</div>
        <div className="wf-box-double" style={{padding: 12, marginBottom: 14, background: 'var(--paper-warm)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
            <div className="wf-title">The Iron Vale</div>
            <span className="wf-tag wf-tag-accent">resume ›</span>
          </div>
          <div className="wf-meta" style={{marginTop: 2}}>Session 4 · Phase 2 of 5 · "The Gloaming"</div>
          <div className="wf-body" style={{marginTop: 8, fontStyle:'italic', color:'var(--ink-soft)'}}>
            "...the Rook lingered at the edge of the chasm, waiting."
          </div>
          <div style={{display:'flex', gap: 10, marginTop: 10, alignItems:'center'}}>
            <Progress filled={2} total={5}/>
            <span className="wf-meta">phase progress</span>
          </div>
          <div style={{display:'flex', gap: 6, marginTop: 8}}>
            <span className="wf-tag wf-tag-explore">♦ 4/6</span>
            <span className="wf-tag wf-tag-combat">♣ 1/3</span>
            <span className="wf-tag">38 cards</span>
          </div>
        </div>
      </div>

      {/* Bookshelf - all campaigns */}
      <div style={{padding: '0 14px 4px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 8}}>
          <span className="wf-label">// the shelf</span>
          <span className="wf-meta">tap a spine</span>
        </div>
      </div>
      <div style={{
        display: 'flex', gap: 10, alignItems: 'flex-end',
        padding: '14px 16px 8px',
        margin: '0 14px',
        borderBottom: '4px solid var(--line)',
        position: 'relative',
        background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(0,0,0,0.04) 100%)',
      }}>
        {[
          { t: 'The Iron Vale', h: 158, spine: '#3a5a8a', current: true },
          { t: 'Salt & Stone', h: 138, spine: '#8a4a2a' },
          { t: 'Glasswood', h: 168, spine: '#3a6a4a' },
          { t: 'Ashfall', h: 124, spine: '#5a4a6a', archived: true },
        ].map((b, i) => (
          <div key={i} style={{
            width: 38, height: b.h, background: b.spine,
            border: '1.5px solid var(--line)',
            borderRadius: '3px 3px 0 0',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            paddingTop: 12, position: 'relative',
            opacity: b.archived ? 0.5 : 1,
            boxShadow: b.current ? '0 -3px 0 var(--accent)' : 'none',
          }}>
            <div style={{
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              fontFamily: 'Caveat, cursive', fontSize: 15, fontWeight: 700,
              color: '#f4efe6', letterSpacing: '0.02em',
            }}>{b.t}</div>
            <div style={{
              position:'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
              width: 22, height: 1.2, background: '#f4efe6', opacity: 0.7
            }}/>
          </div>
        ))}
        <div style={{
          width: 38, height: 100, border: '1.5px dashed var(--ink-soft)',
          borderRadius: '3px 3px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Caveat, cursive', fontSize: 26, color: 'var(--ink-faint)',
        }}>+</div>
      </div>

      {/* Recent activity */}
      <div style={{padding: '14px'}}>
        <div className="wf-label" style={{marginBottom: 6}}>// recent activity</div>
        {[
          { t:'Iron Vale · S4 phase 2', m:'flipped 9♣, fought a Rook', when:'2d' },
          { t:'Salt & Stone · S2', m:'completed phase 1', when:'5d' },
          { t:'Iron Vale · S3 phase 1', m:'session ended', when:'9d' },
        ].map((r, i) => (
          <div key={i} style={{
            display:'flex', justifyContent:'space-between', padding:'6px 0',
            borderBottom: i < 2 ? '1px dashed var(--ink-faint)' : 'none',
          }}>
            <div style={{minWidth: 0, flex: 1}}>
              <div style={{fontSize: 12, fontWeight: 600}}>{r.t}</div>
              <div className="wf-meta" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{r.m}</div>
            </div>
            <span className="wf-meta" style={{flexShrink: 0, marginLeft: 8}}>{r.when} ago</span>
          </div>
        ))}
      </div>
    </div>
    <BottomNav active="home"/>
  </div>
);

// SESSION (refined option C) - tabbed deck/journal/map, with bigger card stage
const SessionV2 = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Iron Vale · S4" left="‹" right="⋯" sub="phase 2 · the gloaming"/>

    {/* Combined counter strip + tabs */}
    <div style={{
      borderBottom: '1.5px solid var(--line)', flexShrink:0, background:'var(--paper-warm)',
    }}>
      <div style={{display:'flex', gap: 8, padding:'8px 14px 0'}}>
        <div style={{flex: 1, display:'flex', alignItems:'center', gap: 6}}>
          <span className="wf-label" style={{color:'var(--explore)'}}>♦ EXPLORE</span>
          <Progress filled={4} total={6} color="var(--explore)"/>
          <span style={{fontFamily:'Caveat,cursive', fontWeight:700, fontSize:14}}>4/6</span>
        </div>
        <div style={{flex: 1, display:'flex', alignItems:'center', gap: 6}}>
          <span className="wf-label" style={{color:'var(--combat)'}}>♣ COMBAT</span>
          <Progress filled={1} total={3} color="var(--combat)"/>
          <span style={{fontFamily:'Caveat,cursive', fontWeight:700, fontSize:14}}>1/3</span>
        </div>
      </div>
      <div style={{display:'flex', padding:'4px 14px 0', gap: 4}}>
        {['Deck', 'Beats', 'Notes'].map((t, i) => (
          <div key={t} style={{
            padding: '8px 14px',
            fontFamily: 'Caveat, cursive', fontSize: 17, fontWeight: 700,
            borderBottom: i === 0 ? '2.5px solid var(--accent)' : '2.5px solid transparent',
            color: i === 0 ? 'var(--accent)' : 'var(--ink-soft)',
          }}>{t}</div>
        ))}
      </div>
    </div>

    <div className="wf-scroll" style={{padding:'18px 14px 12px', overflowY:'auto', position:'relative'}}>
      {/* Big tactile deck stage */}
      <div style={{position:'relative', height: 200, marginBottom: 14}}>
        {/* deck stack on left */}
        <div style={{position:'absolute', top: 24, left: 4}}>
          <CardBack w={88} h={130} style={{position:'absolute', left: -3, top: -3, transform:'rotate(-3deg)'}}/>
          <CardBack w={88} h={130} style={{position:'absolute', left: 0, top: 0, transform:'rotate(2deg)'}}/>
          <CardBack w={88} h={130} style={{position:'absolute', left: 2, top: 1}}/>
          <div className="wf-meta" style={{position:'absolute', top: 138, left: 0, width: 88, textAlign:'center'}}>38 left · tap to flip</div>
        </div>
        {/* flipped card on right */}
        <div style={{position:'absolute', top: 14, right: 4}}>
          <Card w={102} h={150} label="Q" suit="♥"/>
          <div className="wf-meta" style={{textAlign:'center', marginTop: 4}}>last flip</div>
        </div>
        {/* arrow */}
        <svg style={{position:'absolute', inset: 0, width:'100%', height:'100%', pointerEvents:'none'}}>
          <path d="M 110 90 Q 145 70 175 90" stroke="var(--ink-soft)" strokeWidth="1.5"
                fill="none" strokeDasharray="3 3" strokeLinecap="round"
                markerEnd="url(#a-end)"/>
          <defs>
            <marker id="a-end" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--ink-soft)"/>
            </marker>
          </defs>
        </svg>
      </div>

      {/* Prompt block */}
      <div className="wf-box-double" style={{padding: 12, marginBottom: 12, background: 'var(--paper-warm)'}}>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom: 4}}>
          <span className="wf-tag wf-tag-explore">♦ EXPLORE · NPC</span>
          <span className="wf-meta">Q ♥ · drilldown ↗</span>
        </div>
        <div className="wf-h2">The Queen of Hearts</div>
        <div className="wf-body" style={{marginTop: 4, fontStyle:'italic', color:'var(--ink-soft)'}}>
          "A figure of warmth in a cold land. They offer help — but at what cost?"
        </div>
      </div>

      {/* Journal capture */}
      <div className="wf-box-dashed" style={{padding: 10, marginBottom: 10}}>
        <div className="wf-label" style={{marginBottom: 4}}>// what happened?</div>
        <Handwriting lines={2} lastWidth="55%"/>
      </div>

      {/* Action row */}
      <div style={{display:'flex', gap: 6}}>
        <button className="wf-btn wf-btn-primary" style={{flex: 2}}>FLIP NEXT</button>
        <button className="wf-btn" style={{flex: 1, fontSize: 13}}>♣ force combat</button>
        <button className="wf-btn wf-btn-sm" style={{padding: '6px 10px'}}>🎙</button>
      </div>
    </div>
    <BottomNav active="play"/>
  </div>
);

// PARTY (refined option A) - cleaner sheet
const PartyV2 = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Party" left="‹" right="+" sub="Iron Vale · 2 chars + 1 companion"/>

    {/* Character switcher row */}
    <div style={{
      display:'flex', gap: 8, padding:'10px 14px', overflowX:'auto',
      borderBottom: '1px dashed var(--ink-soft)', flexShrink: 0, background:'var(--paper-warm)',
    }}>
      {[
        { n: 'Vela', s: '♚', active: true },
        { n: 'Kestra', s: '♝' },
        { n: 'Old Rook', s: '♜', comp: true },
      ].map((c, i) => (
        <div key={i} style={{
          flexShrink: 0, padding: '5px 10px', display:'flex', gap: 6, alignItems:'center',
          border: c.active ? '1.5px solid var(--accent)' : '1px solid var(--ink-soft)',
          borderRadius: '4px 8px 5px 7px / 6px 4px 7px 5px',
          background: c.active ? 'var(--paper)' : 'transparent',
        }}>
          <Glyph ch={c.s} size={18}/>
          <span className="wf-h2" style={{fontSize: 14}}>{c.n}</span>
          {c.comp && <span className="wf-tag" style={{padding:'1px 4px', fontSize: 8}}>cmp</span>}
        </div>
      ))}
      <div style={{flexShrink: 0, padding: '5px 10px', border: '1px dashed var(--ink-soft)',
        borderRadius: '4px 8px 5px 7px / 6px 4px 7px 5px', fontSize: 14, fontFamily:'Caveat,cursive'}}>+</div>
    </div>

    <div className="wf-scroll" style={{overflowY:'auto', padding: '14px', position:'relative'}}>
      {/* Portrait + name */}
      <div style={{display:'flex', gap: 12, marginBottom: 14}}>
        <Img w={78} h={98} label="portrait"/>
        <div style={{flex:1, minWidth: 0}}>
          <div className="wf-label">// player character</div>
          <div className="wf-title" style={{lineHeight: 1.05}}>Vela of the Reach</div>
          <div className="wf-body" style={{color:'var(--ink-soft)', fontStyle:'italic', marginTop:2, fontSize: 12}}>
            "She walks where bishops fear to."
          </div>
          <div style={{display:'flex', gap: 5, marginTop: 6, flexWrap:'wrap'}}>
            <span className="wf-tag wf-tag-accent">Knight</span>
            <span className="wf-tag">lv.3</span>
            <span className="wf-tag">K♠ origin</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginBottom: 14}}>
        {[
          { k:'Health', v: '7/10', f: 7, t: 10, color:'var(--combat)' },
          { k:'Resolve', v: '4/5', f: 4, t: 5, color:'var(--accent)' },
          { k:'Supplies', v: '3/6', f: 3, t: 6, color:'var(--explore)' },
          { k:'Coin', v: '12', f: 4, t: 6, color:'var(--rust)' },
        ].map((s, i) => (
          <div key={i} className="wf-box" style={{padding:'6px 10px'}}>
            <div className="wf-label">{s.k}</div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:2}}>
              <span style={{fontFamily:'Caveat,cursive', fontSize: 18, fontWeight:700}}>{s.v}</span>
              <Progress filled={s.f} total={s.t} color={s.color}/>
            </div>
          </div>
        ))}
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// traits & notes</div>
      <div className="wf-box-dashed" style={{padding:10, marginBottom: 14}}>
        <div style={{display:'flex', flexWrap:'wrap', gap: 5, marginBottom: 8}}>
          <span className="wf-tag">stubborn</span>
          <span className="wf-tag">tracker</span>
          <span className="wf-tag">heir to nothing</span>
          <span className="wf-tag" style={{borderStyle:'dashed'}}>+ add</span>
        </div>
        <Handwriting lines={3} lastWidth="50%"/>
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// relationships</div>
      <div style={{display:'flex', flexDirection:'column', gap: 0, marginBottom: 14}}>
        {[
          {n:'Kestra', r:'sworn-sister', g:'♝'},
          {n:'The Queen of Hearts', r:'wary ally', g:'♛'},
          {n:'The Rook (combat)', r:'enemy · wounded', g:'♜'},
        ].map((r, i) => (
          <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center',
              padding:'8px 0', borderBottom:'1px dashed var(--ink-faint)'}}>
            <div style={{display:'flex', gap: 8, alignItems:'center'}}>
              <Glyph ch={r.g} size={20}/>
              <div>
                <div style={{fontSize: 13, fontWeight: 600}}>{r.n}</div>
                <div className="wf-meta">{r.r}</div>
              </div>
            </div>
            <span className="wf-meta">›</span>
          </div>
        ))}
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// items carried (3 of 6)</div>
      <div style={{display:'flex', gap: 6, flexWrap:'wrap', marginBottom: 14}}>
        <span className="wf-tag wf-tag-accent">🗡 Father's sword</span>
        <span className="wf-tag">📜 Sealed letter</span>
        <span className="wf-tag">🪙 Copper coin</span>
        <span className="wf-tag" style={{borderStyle:'dashed'}}>see all ›</span>
      </div>
    </div>
    <BottomNav active="party"/>
  </div>
);

Object.assign(window, { HomeV2, SessionV2, PartyV2 });
