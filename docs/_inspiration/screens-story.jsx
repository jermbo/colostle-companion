// Story timeline / journal - 3 variants

// A: Linear scroll of beats grouped by phase
const StoryA = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Story" left="‹" right="↗" sub="Iron Vale · 47 beats"/>

    {/* Filter chips */}
    <div style={{display:'flex', gap: 6, padding:'8px 14px', borderBottom:'1px dashed var(--ink-soft)', flexShrink: 0, background:'var(--paper-warm)', overflowX:'auto'}}>
      <span className="wf-tag wf-tag-accent">all</span>
      <span className="wf-tag wf-tag-explore">♦ explore</span>
      <span className="wf-tag wf-tag-combat">♣ combat</span>
      <span className="wf-tag">★ key beats</span>
      <span className="wf-tag">🎙 voice</span>
    </div>

    <div className="wf-scroll" style={{overflowY:'auto', padding:'12px 14px', position:'relative'}}>
      {/* Phase header */}
      <div style={{
        display:'flex', alignItems:'center', gap: 8, marginBottom: 8,
      }}>
        <div style={{flex: 1, height: 1.5, background: 'var(--ink)'}}/>
        <span className="wf-label" style={{fontSize: 11}}>PHASE 2 · THE GLOAMING</span>
        <div style={{flex: 1, height: 1.5, background: 'var(--ink)'}}/>
      </div>

      {/* Timeline beats */}
      <div style={{position:'relative', paddingLeft: 22}}>
        <div style={{position:'absolute', left: 8, top: 6, bottom: 20, width: 1.5, background:'var(--ink)', borderStyle:'dashed'}}/>

        {[
          { c:'4 ♥', tag:'explore', tagCls:'wf-tag-explore', t:'A quiet glade', body:'small things scurry. Vela found a copper coin half-buried in moss.', star: false, time:'just now' },
          { c:'9 ♣', tag:'combat', tagCls:'wf-tag-combat', t:'Wandering Rook', body:'Parley failed. We drove it off but Kestra was wounded.', star: true, time:'12m ago' },
          { c:'J ♦', tag:'explore', tagCls:'wf-tag-explore', t:'Ruined statue', body:'a chess piece, bishop. Inside: a letter we can\'t yet read.', star: false, time:'30m ago' },
        ].map((b, i) => (
          <div key={i} style={{position:'relative', marginBottom: 14}}>
            <div style={{
              position:'absolute', left: -22, top: 4,
              width: 16, height: 22,
              background:'var(--paper)',
              border:'1.2px solid var(--line)',
              borderRadius: 3,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: 9, fontFamily:'Caveat,cursive', fontWeight:700,
            }}>{b.c}</div>
            <div style={{display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap'}}>
              <span className={`wf-tag ${b.tagCls}`}>{b.tag}</span>
              <span className="wf-h2">{b.t}</span>
              {b.star && <span style={{color:'var(--rust)'}}>★</span>}
              <span className="wf-meta" style={{marginLeft:'auto'}}>{b.time}</span>
            </div>
            <div className="wf-body" style={{marginTop: 4, color:'var(--ink-soft)'}}>{b.body}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex', alignItems:'center', gap: 8, margin:'4px 0 10px'}}>
        <div style={{flex: 1, height: 1.5, background: 'var(--ink)'}}/>
        <span className="wf-label" style={{fontSize: 11}}>PHASE 1 · THE LEAVING</span>
        <div style={{flex: 1, height: 1.5, background: 'var(--ink)'}}/>
      </div>
      <div style={{paddingLeft: 22, opacity: 0.7}}>
        <div className="wf-meta">12 beats · tap to expand</div>
      </div>

      <Anno style={{top: 12, right: 4, transform:'rotate(4deg)', maxWidth: 80, textAlign:'right'}}>
        filter by<br/>type or<br/>star ↗
      </Anno>
      <Anno style={{top: 220, left: 70, transform:'rotate(-4deg)', maxWidth: 70}}>
        ↑ card<br/>shows where<br/>this came from
      </Anno>
    </div>
    <BottomNav active="story"/>
  </div>
);

// B: Map view - locations as nodes
const StoryB = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Map of Travels" left="‹" right="⊕" sub="6 places visited"/>
    <div className="wf-scroll" style={{position:'relative', overflow:'hidden', background:'var(--paper-warm)'}}>
      {/* Map area */}
      <div style={{
        position:'absolute', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='0.5' fill='%231f1a17' opacity='0.3'/></svg>")`,
        backgroundSize: '20px 20px',
      }}/>

      {/* connecting paths */}
      <svg style={{position:'absolute', inset: 0, width:'100%', height:'100%', pointerEvents:'none'}}>
        <path d="M 50 80 Q 100 60 140 110 Q 180 160 220 140 Q 250 120 280 200" stroke="var(--ink)"
              strokeWidth="1.5" fill="none" strokeDasharray="4 4" strokeLinecap="round"/>
        <path d="M 220 140 Q 200 200 160 240" stroke="var(--ink-soft)"
              strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
      </svg>

      {/* nodes */}
      {[
        { x: 40, y: 70, n:'The Reach', sub:'home', icon:'⌂', visited: true },
        { x: 130, y: 100, n:'Glade', sub:'4♥', icon:'❀', visited: true },
        { x: 210, y: 130, n:'Statue', sub:'J♦', icon:'♟', visited: true },
        { x: 270, y: 195, n:'Gloaming', sub:'current', icon:'★', visited: true, current: true },
        { x: 150, y: 235, n:'?', sub:'rumor', icon:'?', visited: false },
      ].map((n, i) => (
        <div key={i} style={{
          position:'absolute', left: n.x - 18, top: n.y - 18,
          width: 36, height: 36,
          background: n.current ? 'var(--accent)' : 'var(--paper)',
          color: n.current ? 'var(--paper)' : 'var(--ink)',
          border: `${n.current ? 2 : 1.5}px solid var(--line)`,
          borderRadius: '50% 45% 50% 45%',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Caveat,cursive', fontSize: 18, fontWeight:700,
          opacity: n.visited ? 1 : 0.5,
          boxShadow: n.current ? '0 0 0 4px rgba(43,74,122,0.2)' : 'none',
        }}>
          {n.icon}
          <div style={{
            position:'absolute', top:'105%', left:'50%', transform:'translateX(-50%)',
            whiteSpace:'nowrap', fontSize: 11, color:'var(--ink)', fontWeight: n.current ? 700 : 400,
          }}>
            {n.n}
            <div className="wf-meta" style={{fontSize: 9, textAlign:'center'}}>{n.sub}</div>
          </div>
        </div>
      ))}

      {/* Bottom card preview of selected */}
      <div className="wf-box-double" style={{
        position:'absolute', bottom: 12, left: 12, right: 12,
        padding: 10, background:'var(--paper)',
      }}>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <div className="wf-h2">The Gloaming</div>
          <span className="wf-tag wf-tag-accent">current</span>
        </div>
        <div className="wf-meta" style={{marginBottom: 4}}>phase 2 · 3 beats here</div>
        <div className="wf-body" style={{fontStyle:'italic', color:'var(--ink-soft)'}}>
          "...where the Rook lingered."
        </div>
      </div>

      <Anno style={{top: 6, left: 6, transform:'rotate(-3deg)', maxWidth: 90}}>
        nodes auto-<br/>placed by<br/>journey order ↘
      </Anno>
      <Anno style={{top: 130, right: 4, transform:'rotate(5deg)', maxWidth: 70, textAlign:'right'}}>
        rumor<br/>node from<br/>NPC ↙
      </Anno>
    </div>
    <BottomNav active="story"/>
  </div>
);

// C: Open journal book layout
const StoryC = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Vela's Journal" left="‹" right="✎" sub="entry 14 of 47"/>

    <div className="wf-scroll" style={{overflowY:'auto', padding:'14px 16px', position:'relative'}}>
      {/* Page header */}
      <div style={{textAlign:'center', marginBottom: 14}}>
        <div className="wf-label">// 28th day, evening</div>
        <div className="wf-title" style={{fontSize: 26}}>Phase II · The Gloaming</div>
        <div style={{margin:'6px auto 0', width: 80, height: 6}} className="wf-divider"/>
      </div>

      {/* Indented prose with margin notes */}
      <div style={{position:'relative', paddingRight: 60}}>
        <div className="wf-body" style={{lineHeight: 1.7}}>
          <span className="wf-hand" style={{fontSize: 22, fontWeight:700, float:'left', lineHeight: 1, marginRight: 4, marginTop: 2}}>T</span>
          he glade was quiet, almost too much so. Kestra knelt by the moss
          and pulled out a copper coin — half-buried, still warm somehow.
        </div>
        <div className="wf-meta" style={{
          position:'absolute', right: 0, top: 4, width: 56,
          fontFamily:'Caveat,cursive', fontSize: 12, color:'var(--rust)',
          borderLeft:'1px dashed var(--rust)', paddingLeft: 6,
        }}>
          ♦ 4♥<br/>+1 coin<br/>(item)
        </div>
      </div>

      <div style={{height: 14}}/>

      <div style={{position:'relative', paddingRight: 60}}>
        <div className="wf-body" style={{lineHeight: 1.7}}>
          Then the Rook came, scarred but proud. We tried words first; they
          were not enough. Kestra was hurt — not badly — and the thing
          loped back into the trees.
        </div>
        <div className="wf-meta" style={{
          position:'absolute', right: 0, top: 4, width: 56,
          fontFamily:'Caveat,cursive', fontSize: 12, color:'var(--combat)',
          borderLeft:'1px dashed var(--combat)', paddingLeft: 6,
        }}>
          ♣ 9♣<br/>combat 1/3<br/>−2 HP Kes
        </div>
      </div>

      <div style={{height: 14}}/>

      <div style={{position:'relative', paddingRight: 60}}>
        <div className="wf-body" style={{lineHeight: 1.7, color:'var(--ink-soft)', fontStyle:'italic'}}>
          [next beat — flip a card]
        </div>
        <div style={{
          position:'absolute', right: 0, top: 4, width: 56,
          textAlign: 'center',
        }}>
          <CardBack w={36} h={52}/>
        </div>
      </div>

      <div style={{margin: '20px auto 0', width: 60, height: 6}} className="wf-divider"/>
      <div className="wf-meta" style={{textAlign:'center', marginTop: 6}}>← prev page · next page →</div>

      <Anno style={{top: 100, left: -2, transform:'rotate(-3deg)', maxWidth: 70}}>
        prose w/<br/>auto-margin<br/>game notes ↘
      </Anno>
    </div>
    <BottomNav active="story"/>
  </div>
);

Object.assign(window, { StoryA, StoryB, StoryC });
