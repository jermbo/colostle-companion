// V2 - Story (tabbed: timeline / map / journal) + new screens

const StoryTabs = ({ tab = 'timeline' }) => (
  <div style={{display:'flex', padding:'4px 14px 0', gap: 4, borderBottom:'1.5px solid var(--line)', flexShrink:0, background:'var(--paper-warm)'}}>
    {[
      {id:'timeline', l:'Timeline', g:'≣'},
      {id:'map', l:'Map', g:'⌖'},
      {id:'journal', l:'Journal', g:'✎'},
    ].map(t => (
      <div key={t.id} style={{
        padding:'8px 12px', display:'flex', gap: 5, alignItems:'center',
        fontFamily:'Caveat,cursive', fontSize: 16, fontWeight: 700,
        borderBottom: tab === t.id ? '2.5px solid var(--accent)' : '2.5px solid transparent',
        color: tab === t.id ? 'var(--accent)' : 'var(--ink-soft)',
      }}>
        <span style={{fontSize: 14}}>{t.g}</span>{t.l}
      </div>
    ))}
  </div>
);

const StoryTimelineV2 = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Story · Iron Vale" left="‹" right="↗" sub="47 beats · 4 sessions"/>
    <StoryTabs tab="timeline"/>
    <div style={{display:'flex', gap: 5, padding:'8px 14px', borderBottom:'1px dashed var(--ink-faint)', flexShrink:0, overflowX:'auto'}}>
      <span className="wf-tag wf-tag-accent">all</span>
      <span className="wf-tag wf-tag-explore">♦ explore</span>
      <span className="wf-tag wf-tag-combat">♣ combat</span>
      <span className="wf-tag">★ key</span>
      <span className="wf-tag">🎙 voice</span>
    </div>
    <div className="wf-scroll" style={{overflowY:'auto', padding:'12px 14px'}}>
      <div style={{display:'flex', alignItems:'center', gap: 8, marginBottom: 8}}>
        <div style={{flex:1, height: 1.5, background:'var(--ink)'}}/>
        <span className="wf-label" style={{fontSize: 11}}>PHASE 2 · GLOAMING</span>
        <div style={{flex:1, height: 1.5, background:'var(--ink)'}}/>
      </div>
      <div style={{position:'relative', paddingLeft: 22}}>
        <div style={{position:'absolute', left: 8, top: 6, bottom: 4, width: 1.5,
          backgroundImage:'linear-gradient(to bottom, var(--ink) 50%, transparent 50%)',
          backgroundSize:'1.5px 6px'}}/>
        {[
          {c:'Q♥', tag:'explore', tagCls:'wf-tag-explore', t:'The Queen of Hearts', body:'A figure of warmth. She offers passage — for a name we don\'t want to give.', star:true, time:'now'},
          {c:'4♥', tag:'explore', tagCls:'wf-tag-explore', t:'A quiet glade', body:'Vela found a copper coin half-buried in moss.', time:'12m'},
          {c:'9♣', tag:'combat', tagCls:'wf-tag-combat', t:'Wandering Rook', body:'Drove it off. Kestra wounded.', star:true, time:'25m'},
          {c:'J♦', tag:'explore', tagCls:'wf-tag-explore', t:'Ruined statue', body:'Sealed letter, unread.', time:'40m'},
        ].map((b, i) => (
          <div key={i} style={{position:'relative', marginBottom: 12}}>
            <div style={{position:'absolute', left: -22, top: 4, width: 16, height: 22,
                background:'var(--paper)', border:'1.2px solid var(--line)', borderRadius: 3,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize: 9, fontFamily:'Caveat,cursive', fontWeight:700}}>{b.c}</div>
            <div style={{display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap'}}>
              <span className={`wf-tag ${b.tagCls}`}>{b.tag}</span>
              <span className="wf-h2">{b.t}</span>
              {b.star && <span style={{color:'var(--rust)'}}>★</span>}
              <span className="wf-meta" style={{marginLeft:'auto'}}>{b.time}</span>
            </div>
            <div className="wf-body" style={{marginTop: 3, color:'var(--ink-soft)', fontSize: 12}}>{b.body}</div>
          </div>
        ))}
      </div>
      <div style={{display:'flex', alignItems:'center', gap: 8, margin:'4px 0 8px'}}>
        <div style={{flex:1, height: 1.5, background:'var(--ink)'}}/>
        <span className="wf-label" style={{fontSize: 11}}>PHASE 1 · LEAVING</span>
        <div style={{flex:1, height: 1.5, background:'var(--ink)'}}/>
      </div>
      <div className="wf-meta" style={{paddingLeft: 22}}>12 beats · tap to expand ›</div>
    </div>
    <BottomNav active="story"/>
  </div>
);

const StoryMapV2 = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Story · Iron Vale" left="‹" right="↗" sub="6 places visited"/>
    <StoryTabs tab="map"/>
    <div className="wf-scroll" style={{position:'relative', overflow:'hidden', background:'var(--paper-warm)'}}>
      <div style={{position:'absolute', inset: 0,
        backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><circle cx='20' cy='20' r='0.5' fill='%231f1a17' opacity='0.3'/></svg>")`,
        backgroundSize: '20px 20px'}}/>
      <svg style={{position:'absolute', inset: 0, width:'100%', height:'100%', pointerEvents:'none'}}>
        <path d="M 50 70 Q 100 50 140 100 Q 180 150 220 130 Q 250 110 280 195"
              stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" strokeLinecap="round"/>
        <path d="M 220 130 Q 200 195 160 230" stroke="var(--ink-soft)"
              strokeWidth="1.2" fill="none" strokeDasharray="3 3"/>
      </svg>
      {[
        {x:40, y:60, n:'The Reach', sub:'home', icon:'⌂', visited:true},
        {x:130, y:90, n:'Glade', sub:'4♥', icon:'❀', visited:true},
        {x:210, y:120, n:'Statue', sub:'J♦', icon:'♟', visited:true},
        {x:270, y:190, n:'Gloaming', sub:'now', icon:'★', visited:true, current:true},
        {x:150, y:225, n:'?', sub:'rumor', icon:'?', visited:false},
      ].map((n, i) => (
        <div key={i} style={{
          position:'absolute', left: n.x - 18, top: n.y - 18, width: 36, height: 36,
          background: n.current ? 'var(--accent)' : 'var(--paper)',
          color: n.current ? 'var(--paper)' : 'var(--ink)',
          border: `${n.current ? 2 : 1.5}px solid var(--line)`,
          borderRadius:'50% 45% 50% 45%',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'Caveat,cursive', fontSize: 18, fontWeight:700,
          opacity: n.visited ? 1 : 0.5,
          boxShadow: n.current ? '0 0 0 4px rgba(58,106,74,0.2)' : 'none',
        }}>
          {n.icon}
          <div style={{position:'absolute', top:'105%', left:'50%', transform:'translateX(-50%)',
              whiteSpace:'nowrap', fontSize: 11, color:'var(--ink)', fontWeight: n.current ? 700 : 400}}>
            {n.n}
            <div className="wf-meta" style={{fontSize: 9, textAlign:'center'}}>{n.sub}</div>
          </div>
        </div>
      ))}
      <div className="wf-box-double" style={{position:'absolute', bottom: 12, left: 12, right: 12, padding: 10, background:'var(--paper)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
          <div className="wf-h2">The Gloaming</div>
          <span className="wf-tag wf-tag-accent">current</span>
        </div>
        <div className="wf-meta" style={{marginBottom: 4}}>phase 2 · 4 beats</div>
        <div className="wf-body" style={{fontStyle:'italic', color:'var(--ink-soft)', fontSize: 12}}>
          "...where the Rook lingered."
        </div>
      </div>
    </div>
    <BottomNav active="story"/>
  </div>
);

const StoryJournalV2 = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Story · Iron Vale" left="‹" right="✎" sub="Vela's hand · entry 14"/>
    <StoryTabs tab="journal"/>
    <div className="wf-scroll" style={{overflowY:'auto', padding:'14px 16px'}}>
      <div style={{textAlign:'center', marginBottom: 14}}>
        <div className="wf-label">// 28th day, evening</div>
        <div className="wf-title" style={{fontSize: 24}}>Phase II · The Gloaming</div>
        <div style={{margin:'6px auto 0', width: 80, height: 6}} className="wf-divider"/>
      </div>
      <div style={{position:'relative', paddingRight: 60, marginBottom: 14}}>
        <div className="wf-body" style={{lineHeight: 1.7}}>
          <span style={{fontFamily:'Caveat,cursive', fontSize: 22, fontWeight:700, float:'left', lineHeight: 1, marginRight: 4, marginTop: 2}}>T</span>
          he glade was quiet, almost too much so. Kestra knelt by the moss
          and pulled out a copper coin — half-buried, still warm somehow.
        </div>
        <div className="wf-meta" style={{position:'absolute', right: 0, top: 4, width: 56,
          fontFamily:'Caveat,cursive', fontSize: 11, color:'var(--explore)',
          borderLeft:'1px dashed var(--explore)', paddingLeft: 6}}>
          ♦ 4♥<br/>+1 coin
        </div>
      </div>
      <div style={{position:'relative', paddingRight: 60, marginBottom: 14}}>
        <div className="wf-body" style={{lineHeight: 1.7}}>
          Then the Rook came, scarred but proud. We tried words first; they
          were not enough. Kestra was hurt — not badly — and the thing
          loped back into the trees.
        </div>
        <div className="wf-meta" style={{position:'absolute', right: 0, top: 4, width: 56,
          fontFamily:'Caveat,cursive', fontSize: 11, color:'var(--combat)',
          borderLeft:'1px dashed var(--combat)', paddingLeft: 6}}>
          ♣ 9♣<br/>combat 1/3<br/>−2 HP Kes
        </div>
      </div>
      <div style={{position:'relative', paddingRight: 60, marginBottom: 14}}>
        <div className="wf-body" style={{lineHeight: 1.7}}>
          And now this Queen, smiling. Kestra trusts her. I do not.
        </div>
        <div className="wf-meta" style={{position:'absolute', right: 0, top: 4, width: 56,
          fontFamily:'Caveat,cursive', fontSize: 11, color:'var(--explore)',
          borderLeft:'1px dashed var(--explore)', paddingLeft: 6}}>
          ♦ Q♥<br/>NPC met
        </div>
      </div>
      <div style={{position:'relative', paddingRight: 60}}>
        <div className="wf-body" style={{lineHeight: 1.7, color:'var(--ink-soft)', fontStyle:'italic'}}>
          [next beat — flip a card]
        </div>
        <div style={{position:'absolute', right: 0, top: 4, width: 56, textAlign:'center'}}>
          <CardBack w={36} h={52}/>
        </div>
      </div>
      <div style={{margin: '20px auto 0', width: 60, height: 6}} className="wf-divider"/>
      <div className="wf-meta" style={{textAlign:'center', marginTop: 6}}>← prev page · next page →</div>
    </div>
    <BottomNav active="story"/>
  </div>
);

// NEW: New campaign setup wizard
const NewCampaign = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="New Campaign" left="✕" right="" sub="step 2 of 4 · the world"/>
    <div style={{padding:'8px 14px', borderBottom:'1px dashed var(--ink-soft)', flexShrink:0, background:'var(--paper-warm)'}}>
      <Progress filled={2} total={4}/>
    </div>
    <div className="wf-scroll" style={{overflowY:'auto', padding:'14px', position:'relative'}}>
      <div style={{fontFamily:'Caveat,cursive', fontSize: 26, fontWeight:700, lineHeight:1.05, marginBottom: 4}}>
        Where does this story begin?
      </div>
      <div className="wf-body" style={{color:'var(--ink-soft)', marginBottom: 14}}>
        Pick a starting prompt or write your own. You can edit anything later.
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// campaign name</div>
      <div className="wf-box" style={{padding:'8px 10px', marginBottom: 14, background:'var(--paper)'}}>
        <span style={{fontFamily:'Caveat,cursive', fontSize: 18, fontWeight: 700}}>The Iron Vale</span>
        <span className="wf-meta" style={{marginLeft: 6}}>tap to edit</span>
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// opening prompt</div>
      <div style={{display:'flex', flexDirection:'column', gap: 8, marginBottom: 14}}>
        {[
          {l:'A · The Wandering', d:'You leave a small home for reasons unspoken.'},
          {l:'B · The Last Bishop', d:'A holy figure dies in your arms. They give you a task.', sel: true},
          {l:'C · Custom', d:'Write your own opening.', custom: true},
        ].map((o, i) => (
          <div key={i} className={o.sel ? 'wf-box-double' : 'wf-box'} style={{
            padding: 10, background: o.sel ? 'var(--paper-warm)' : 'var(--paper)',
            display:'flex', gap: 10, alignItems:'center',
          }}>
            <div style={{
              width: 18, height: 18, borderRadius:'50%', border:'1.5px solid var(--line)',
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink: 0,
              background: o.sel ? 'var(--accent)' : 'transparent',
            }}>
              {o.sel && <div style={{width: 8, height: 8, borderRadius:'50%', background:'var(--paper)'}}/>}
            </div>
            <div style={{flex: 1, minWidth: 0}}>
              <div className="wf-h2" style={{fontSize: 15}}>{o.l}</div>
              <div className="wf-meta" style={{fontStyle: o.custom ? 'normal' : 'italic'}}>{o.d}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// rules</div>
      <div style={{display:'flex', flexDirection:'column', gap: 6}}>
        {[
          {l:'Phase length', v:'12 flips (default)'},
          {l:'Combat', v:'manual flip'},
          {l:'Deck', v:'standard 52 + jokers'},
        ].map((r, i) => (
          <div key={i} className="wf-box" style={{padding:'7px 10px', display:'flex', justifyContent:'space-between'}}>
            <span className="wf-meta">{r.l}</span>
            <span style={{fontSize: 13, fontWeight: 600}}>{r.v}  ›</span>
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap: 8, marginTop: 18}}>
        <button className="wf-btn" style={{flex: 1}}>‹ Back</button>
        <button className="wf-btn wf-btn-primary" style={{flex: 2}}>Next: Characters ›</button>
      </div>
    </div>
  </div>
);

// NEW: End-of-session summary
const SessionEnd = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Session 4 · ended" left="✕" right="↗" sub="Iron Vale · phase 2"/>
    <div className="wf-scroll" style={{overflowY:'auto', padding:'14px', position:'relative'}}>
      <div style={{textAlign:'center', marginBottom: 14}}>
        <div className="wf-label">// well done, traveller</div>
        <div className="wf-title" style={{fontSize: 28, marginTop: 4}}>The Gloaming closes</div>
        <div className="wf-meta" style={{marginTop: 4}}>4 beats · 47 minutes · 1 wound</div>
      </div>

      <div className="wf-divider" style={{margin: '0 0 14px'}}/>

      <div className="wf-label" style={{marginBottom: 6}}>// what happened</div>
      <div className="wf-box" style={{padding: 10, marginBottom: 14, background:'var(--paper-warm)'}}>
        <div style={{display:'flex', flexDirection:'column', gap: 6}}>
          {[
            {c:'4♥', t:'Found copper coin'},
            {c:'9♣', t:'Fought the Rook · won'},
            {c:'J♦', t:'Found sealed letter'},
            {c:'Q♥', t:'Met Queen of Hearts'},
          ].map((b, i) => (
            <div key={i} style={{display:'flex', gap: 8, alignItems:'center'}}>
              <Card w={24} h={34} label={b.c[0]} suit={b.c.slice(1)}/>
              <span style={{fontSize: 13}}>{b.t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginBottom: 14}}>
        <div className="wf-box" style={{padding:'8px 10px'}}>
          <div className="wf-label">items gained</div>
          <div style={{fontFamily:'Caveat,cursive', fontSize: 22, fontWeight: 700}}>+2</div>
        </div>
        <div className="wf-box" style={{padding:'8px 10px'}}>
          <div className="wf-label">cards used</div>
          <div style={{fontFamily:'Caveat,cursive', fontSize: 22, fontWeight: 700}}>4 / 9</div>
        </div>
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// reflection (optional)</div>
      <div className="wf-box-dashed" style={{padding: 10, marginBottom: 14}}>
        <Handwriting lines={3} lastWidth="50%"/>
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// next session, you'll resume...</div>
      <div className="wf-box" style={{padding: 10, marginBottom: 16, fontStyle:'italic', background:'var(--paper-warm)'}}>
        <span className="wf-body">"...the Queen waiting, hand outstretched."</span>
      </div>

      <div style={{display:'flex', gap: 8}}>
        <button className="wf-btn" style={{flex: 1}}>↗ Export</button>
        <button className="wf-btn wf-btn-primary" style={{flex: 2}}>Save &amp; close</button>
      </div>
    </div>
  </div>
);

// NEW: Companion (Rook) detail
const CompanionDetail = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="The Old Rook" left="‹" right="✎" sub="Vela's companion · stone"/>
    <div className="wf-scroll" style={{overflowY:'auto', padding:'14px', position:'relative'}}>
      <div style={{display:'flex', gap: 12, marginBottom: 14}}>
        <Img w={84} h={104} label="rook"/>
        <div style={{flex: 1}}>
          <span className="wf-tag wf-tag-accent">COMPANION</span>
          <div className="wf-title" style={{marginTop: 6, lineHeight: 1.05}}>The Old Rook</div>
          <div className="wf-body" style={{fontStyle:'italic', color:'var(--ink-soft)', fontSize: 12, marginTop: 2}}>
            "Loyal in a way only stone can be."
          </div>
          <div style={{display:'flex', gap: 5, marginTop: 6, flexWrap:'wrap'}}>
            <span className="wf-tag">stone</span>
            <span className="wf-tag">heavy</span>
            <span className="wf-tag">2♣ origin</span>
          </div>
        </div>
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// rook stats</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginBottom: 14}}>
        {[
          {k:'Endurance', v:'9/9', f:9, t:9, color:'var(--combat)'},
          {k:'Loyalty', v:'4/5', f:4, t:5, color:'var(--accent)'},
          {k:'Speed', v:'2/5', f:2, t:5, color:'var(--ink-soft)'},
          {k:'Carry', v:'4/8', f:4, t:8, color:'var(--explore)'},
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

      <div className="wf-label" style={{marginBottom: 6}}>// abilities</div>
      <div style={{display:'flex', flexDirection:'column', gap: 6, marginBottom: 14}}>
        {[
          {n:'Shelter', d:'+2 to all party rolls when camped inside.'},
          {n:'Slow March', d:'Cannot flee combat — must stand or fall.'},
          {n:'Bonded', d:'Knows where Vela is, always.'},
        ].map((a, i) => (
          <div key={i} className="wf-box" style={{padding: 8}}>
            <div className="wf-h2" style={{fontSize: 14}}>{a.n}</div>
            <div className="wf-meta">{a.d}</div>
          </div>
        ))}
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// rook's pack (4 of 8)</div>
      <div style={{display:'flex', gap: 5, flexWrap:'wrap'}}>
        <span className="wf-tag">tents</span>
        <span className="wf-tag">rope</span>
        <span className="wf-tag">dried food</span>
        <span className="wf-tag">map</span>
        <span className="wf-tag" style={{borderStyle:'dashed'}}>+ stash</span>
      </div>
    </div>
    <BottomNav active="party"/>
  </div>
);

Object.assign(window, { StoryTimelineV2, StoryMapV2, StoryJournalV2, NewCampaign, SessionEnd, CompanionDetail });
