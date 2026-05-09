// Active session / flip view - 3 variants
// This is the primary screen: where you flip cards, get prompts, journal

// A: Centered card stage - card is hero, prompt below, journal slides up
const SessionA = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Iron Vale" left="‹" right="⋯" sub="Phase 2 · The Gloaming"/>

    {/* Flip counters */}
    <div style={{
      display:'flex', gap: 10, padding: '10px 14px',
      borderBottom: '1px dashed var(--ink-soft)', flexShrink: 0,
    }}>
      <div className="wf-box" style={{flex:1, padding: '6px 10px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div className="wf-label">EXPLORE</div>
          <div style={{fontFamily:'Caveat, cursive', fontSize: 20, fontWeight: 700, lineHeight:1}}>4 / 6</div>
        </div>
        <Progress filled={4} total={6} w={60} color="var(--explore)"/>
      </div>
      <div className="wf-box" style={{flex:1, padding: '6px 10px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div>
          <div className="wf-label">COMBAT</div>
          <div style={{fontFamily:'Caveat, cursive', fontSize: 20, fontWeight: 700, lineHeight:1}}>1 / 3</div>
        </div>
        <Progress filled={1} total={3} w={60} color="var(--combat)"/>
      </div>
    </div>

    <div className="wf-scroll" style={{display:'flex', flexDirection:'column', alignItems:'center', padding:'16px 14px 12px', position:'relative', overflowY:'auto'}}>

      {/* Stage: deck on left, flipped card center */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: 14, marginBottom: 14, position:'relative'}}>
        <div style={{textAlign:'center'}}>
          <CardBack w={56} h={82}/>
          <div className="wf-meta" style={{marginTop: 4, fontSize: 9}}>deck · 38 left</div>
        </div>
        <div style={{fontSize: 18, color:'var(--ink-soft)'}}>→</div>
        <div style={{textAlign:'center'}}>
          <Card w={100} h={148} label="9" suit="♣"/>
          <div className="wf-meta" style={{marginTop: 4, fontSize: 9}}>last flipped</div>
        </div>
      </div>

      {/* Prompt block */}
      <div className="wf-box-double" style={{padding: 12, width: '100%', marginBottom: 10, background: 'var(--paper-warm)'}}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <span className="wf-tag wf-tag-combat">♣ COMBAT</span>
          <span className="wf-meta">9 of clubs</span>
        </div>
        <div className="wf-h2" style={{marginTop: 6}}>A wandering Rook, scarred but proud</div>
        <div className="wf-body" style={{marginTop: 4, color:'var(--ink-soft)', fontStyle:'italic'}}>
          It blocks the path. Will you fight, parley, or flee?
        </div>
      </div>

      {/* Action buttons */}
      <div style={{display:'flex', gap: 8, width:'100%', marginBottom: 12}}>
        <button className="wf-btn" style={{flex:1}}>↻ Re-flip</button>
        <button className="wf-btn wf-btn-primary" style={{flex:1}}>✎ Journal</button>
      </div>

      {/* Quick journal */}
      <div className="wf-box-dashed" style={{padding: 10, width:'100%'}}>
        <div className="wf-label" style={{marginBottom: 4}}>// quick beat</div>
        <Handwriting lines={2} lastWidth="55%"/>
        <div style={{display:'flex', justifyContent:'space-between', marginTop: 8}}>
          <button className="wf-btn wf-btn-sm" style={{boxShadow:'none', border:'1px solid var(--ink-soft)'}}>🎙 voice</button>
          <span className="wf-meta">tap to expand →</span>
        </div>
      </div>

      <Anno style={{top: 12, right: 10, transform:'rotate(-3deg)', maxWidth: 80, textAlign:'right'}}>
        flip count<br/>per type ↗
      </Anno>
      <Anno style={{top: 165, left: 4, transform:'rotate(-4deg)', maxWidth: 70}}>
        ← deck always<br/>visible
      </Anno>
    </div>
    <BottomNav active="play"/>
  </div>
);

// B: Two-pane scrolling - flips stack vertically as you go (timeline-as-you-play)
const SessionB = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Iron Vale · S4" left="‹" right="⋯"/>

    {/* Sticky flip control */}
    <div style={{
      padding: '10px 14px',
      borderBottom: '1.5px solid var(--line)',
      flexShrink: 0,
      background: 'var(--paper-warm)',
      display:'flex', gap: 10, alignItems:'center',
    }}>
      <CardBack w={42} h={62}/>
      <div style={{flex:1}}>
        <div className="wf-label">phase 2 · gloaming</div>
        <div style={{display:'flex', gap: 6, marginTop: 4, alignItems:'center'}}>
          <span className="wf-tag wf-tag-explore">♦ 4/6</span>
          <span className="wf-tag wf-tag-combat">♣ 1/3</span>
          <span className="wf-meta">· 38 cards left</span>
        </div>
      </div>
      <button className="wf-btn wf-btn-primary" style={{padding:'8px 12px'}}>FLIP</button>
    </div>

    <div className="wf-scroll" style={{overflowY:'auto', padding:'12px 14px', position:'relative'}}>
      <div className="wf-label" style={{marginBottom: 6}}>// phase 2 · 3 flips so far</div>

      {/* Each flip as a timeline entry */}
      {[
        { tag:'explore', tagCls:'wf-tag-explore', card:'4 ♥', title:'A quiet glade', body:'small things scurry', time:'2m ago', open: true },
        { tag:'explore', tagCls:'wf-tag-explore', card:'J ♦', title:'Ruined statue', body:'something glints inside', time:'18m ago' },
        { tag:'combat', tagCls:'wf-tag-combat', card:'7 ♣', title:'Wolf-shape', body:'driven off easily', time:'25m ago' },
      ].map((e, i) => (
        <div key={i} style={{
          display:'flex', gap: 10, marginBottom: 10,
          paddingBottom: 10,
          borderBottom: i < 2 ? '1px dashed var(--ink-faint)' : 'none',
        }}>
          <div style={{position:'relative', flexShrink: 0}}>
            <Card w={42} h={60} label={e.card.split(' ')[0]} suit={e.card.split(' ')[1]}/>
          </div>
          <div style={{flex: 1, minWidth: 0}}>
            <div style={{display:'flex', gap: 6, alignItems:'center'}}>
              <span className={`wf-tag ${e.tagCls}`}>{e.tag}</span>
              <span className="wf-meta">{e.time}</span>
            </div>
            <div className="wf-h2" style={{marginTop: 4}}>{e.title}</div>
            {e.open ? (
              <div style={{marginTop: 6}}>
                <Handwriting lines={3} lastWidth="40%"/>
                <div style={{display:'flex', gap: 6, marginTop: 6}}>
                  <button className="wf-btn wf-btn-sm">+ item</button>
                  <button className="wf-btn wf-btn-sm">+ NPC</button>
                  <button className="wf-btn wf-btn-sm">🎙</button>
                </div>
              </div>
            ) : (
              <div className="wf-meta" style={{marginTop: 2}}>{e.body}  ›</div>
            )}
          </div>
        </div>
      ))}

      <div className="wf-box-dashed" style={{padding: 14, marginTop: 4, textAlign:'center'}}>
        <div className="wf-meta">↑ flip a card to add the next beat</div>
      </div>

      <Anno style={{top: 120, right: 4, transform:'rotate(4deg)', maxWidth: 80, textAlign:'right'}}>
        each flip<br/>becomes a<br/>timeline row ↘
      </Anno>
      <Anno style={{top: 240, left: -2, transform:'rotate(-3deg)', maxWidth: 70}}>
        latest is<br/>open by<br/>default ←
      </Anno>
    </div>
    <BottomNav active="play"/>
  </div>
);

// C: Tactile two-mode - swipe between deck and journal panes
const SessionC = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Iron Vale" left="‹" right="⋯"/>

    {/* Tab switch */}
    <div style={{
      display:'flex', padding:'0 14px', gap: 4,
      borderBottom: '1.5px solid var(--line)', flexShrink: 0,
      background: 'var(--paper-warm)',
    }}>
      {['Deck', 'Journal', 'Map'].map((t, i) => (
        <div key={t} style={{
          padding: '10px 14px',
          fontFamily: 'Caveat, cursive', fontSize: 18, fontWeight: 700,
          borderBottom: i === 0 ? '2.5px solid var(--accent)' : '2.5px solid transparent',
          color: i === 0 ? 'var(--accent)' : 'var(--ink-soft)',
        }}>{t}</div>
      ))}
      <div style={{flex: 1, textAlign:'right', alignSelf:'center'}}>
        <span className="wf-tag wf-tag-explore">♦ 4/6</span>
      </div>
    </div>

    <div className="wf-scroll" style={{padding:'18px 14px', overflowY:'auto', position:'relative'}}>

      {/* Big tactile deck stage */}
      <div style={{position:'relative', height: 220, marginBottom: 12}}>
        {/* deck stack */}
        <div style={{position:'absolute', top: 30, left:'30%', transform:'translateX(-50%)'}}>
          <CardBack w={92} h={134} style={{position:'absolute', left: -3, top: -3, transform:'rotate(-3deg)'}}/>
          <CardBack w={92} h={134} style={{position:'absolute', left: 0, top: 0, transform:'rotate(2deg)'}}/>
          <CardBack w={92} h={134} style={{position:'absolute', left: 2, top: 1}}/>
        </div>
        {/* flipped card */}
        <div style={{position:'absolute', top: 20, right:'5%'}}>
          <Card w={102} h={150} label="Q" suit="♥"/>
        </div>
        {/* arrow */}
        <svg style={{position:'absolute', inset: 0, width:'100%', height:'100%', pointerEvents:'none'}}>
          <path d="M 130 95 Q 160 70 195 95" stroke="var(--ink-soft)" strokeWidth="1.5"
                fill="none" strokeDasharray="3 3" strokeLinecap="round"
                markerEnd="url(#a-end)"/>
          <defs>
            <marker id="a-end" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="var(--ink-soft)"/>
            </marker>
          </defs>
        </svg>
      </div>

      <div style={{textAlign:'center', marginBottom: 10}}>
        <div className="wf-label">// last flip</div>
        <div className="wf-title" style={{margin:'2px 0'}}>The Queen of Hearts</div>
        <span className="wf-tag wf-tag-explore">♦ EXPLORE · NPC</span>
      </div>

      <div className="wf-box" style={{padding: 12, marginBottom: 12, background:'var(--paper-warm)'}}>
        <div className="wf-body" style={{fontStyle:'italic'}}>
          "A figure of warmth in a cold land. They offer help — but at what cost?"
        </div>
        <div className="wf-meta" style={{marginTop: 8}}>tap prompt for sub-tables ↗</div>
      </div>

      <div style={{display:'flex', gap: 8, marginBottom: 10}}>
        <button className="wf-btn wf-btn-primary" style={{flex:2}}>FLIP NEXT</button>
        <button className="wf-btn" style={{flex:1}}>♣ combat</button>
      </div>

      <div className="wf-box-dashed" style={{padding:'8px 10px', textAlign:'center'}}>
        <span className="wf-meta">swipe → for journal · ← for map</span>
      </div>

      <Anno style={{top: 30, right: 8, transform:'rotate(8deg)', maxWidth: 70, textAlign:'right'}}>
        big tactile<br/>card flip ↘
      </Anno>
      <Anno style={{top: 280, left: -2, transform:'rotate(-3deg)', maxWidth: 80}}>
        force-flip<br/>combat<br/>manually ←
      </Anno>
    </div>
    <BottomNav active="play"/>
  </div>
);

Object.assign(window, { SessionA, SessionB, SessionC });
