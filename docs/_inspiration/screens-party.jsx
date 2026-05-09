// Character / Party screens - 2 variants

// A: Single-character full sheet with party switcher chip-row
const PartyA = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Party" left="‹" right="+" sub="Iron Vale · 2 characters"/>

    {/* Character switcher row */}
    <div style={{
      display:'flex', gap: 8, padding:'10px 14px', overflowX:'auto',
      borderBottom: '1px dashed var(--ink-soft)', flexShrink: 0, background:'var(--paper-warm)',
    }}>
      {[
        { n: 'Vela', s: '♚', active: true },
        { n: 'Kestra', s: '♝', active: false },
        { n: 'Rook-companion', s: '♜', active: false, comp: true },
      ].map((c, i) => (
        <div key={i} style={{
          flexShrink: 0, padding: '6px 10px', display:'flex', gap: 6, alignItems:'center',
          border: c.active ? '1.5px solid var(--accent)' : '1px solid var(--ink-soft)',
          borderRadius: '4px 8px 5px 7px / 6px 4px 7px 5px',
          background: c.active ? 'var(--paper)' : 'transparent',
        }}>
          <Glyph ch={c.s} size={20}/>
          <span className="wf-h2" style={{fontSize: 15}}>{c.n}</span>
          {c.comp && <span className="wf-tag" style={{padding:'1px 5px'}}>cmp</span>}
        </div>
      ))}
    </div>

    <div className="wf-scroll" style={{overflowY:'auto', padding: '12px 14px', position:'relative'}}>
      {/* Portrait + name + tagline */}
      <div style={{display:'flex', gap: 12, marginBottom: 14}}>
        <Img w={80} h={100} label="portrait"/>
        <div style={{flex:1}}>
          <div className="wf-label">// player character</div>
          <div className="wf-title">Vela of the Reach</div>
          <div className="wf-body" style={{color:'var(--ink-soft)', fontStyle:'italic', marginTop:2}}>
            "She walks where bishops fear to."
          </div>
          <div style={{display:'flex', gap: 6, marginTop: 6, flexWrap:'wrap'}}>
            <span className="wf-tag wf-tag-accent">Knight class</span>
            <span className="wf-tag">lv.3</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="wf-label" style={{marginBottom: 6}}>// stats</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginBottom: 12}}>
        {[
          { k:'Health', v: '7/10', f: 7, t: 10 },
          { k:'Resolve', v: '4/5', f: 4, t: 5 },
          { k:'Supplies', v: '3', f: 3, t: 6 },
          { k:'Coin', v: '12', f: 4, t: 6 },
        ].map((s, i) => (
          <div key={i} className="wf-box" style={{padding:'6px 10px'}}>
            <div className="wf-label">{s.k}</div>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:2}}>
              <span style={{fontFamily:'Caveat,cursive', fontSize: 18, fontWeight:700}}>{s.v}</span>
              <Progress filled={s.f} total={s.t}/>
            </div>
          </div>
        ))}
      </div>

      {/* Notes / traits */}
      <div className="wf-label" style={{marginBottom: 6}}>// traits & notes</div>
      <div className="wf-box-dashed" style={{padding:10, marginBottom: 12}}>
        <div style={{display:'flex', flexWrap:'wrap', gap: 6, marginBottom: 8}}>
          <span className="wf-tag">stubborn</span>
          <span className="wf-tag">tracker</span>
          <span className="wf-tag">heir to nothing</span>
          <span className="wf-tag" style={{borderStyle:'dashed'}}>+ add</span>
        </div>
        <Handwriting lines={3} lastWidth="50%"/>
      </div>

      {/* Relationships */}
      <div className="wf-label" style={{marginBottom: 6}}>// relationships</div>
      <div style={{display:'flex', flexDirection:'column', gap: 6}}>
        {[{n:'Kestra', r:'sworn-sister'}, {n:'The Queen of Hearts', r:'wary ally'}].map((r, i) => (
          <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px dashed var(--ink-faint)'}}>
            <span className="wf-h2" style={{fontSize: 14}}>{r.n}</span>
            <span className="wf-meta">{r.r}  ›</span>
          </div>
        ))}
      </div>

      <Anno style={{top: 8, left: 8, transform:'rotate(-3deg)', maxWidth: 90}}>
        chip row =<br/>quick switch<br/>between PCs ↓
      </Anno>
    </div>
    <BottomNav active="party"/>
  </div>
);

// B: Card-table layout - all party members at once like a table of cards
const PartyB = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="The Party" left="‹" right="+" sub="3 souls · 1 companion"/>
    <div className="wf-scroll" style={{overflowY:'auto', padding: '14px', position:'relative', display:'flex', flexDirection:'column', gap: 12}}>

      {[
        { n:'Vela', cls:'Knight', q:'"She walks where bishops fear."', hp:7, hpm:10, kind:'pc', main: true, traits:['stubborn','tracker'] },
        { n:'Kestra', cls:'Bishop', q:'"What a scholar can\'t read, isn\'t worth knowing."', hp:5, hpm:8, kind:'pc', traits:['quiet','keen-eyed'] },
        { n:'The Old Rook', cls:'Companion', q:'"Loyal in a way only stone can be."', hp:9, hpm:9, kind:'comp', traits:['heavy','steadfast'] },
      ].map((c, i) => (
        <div key={i} className="wf-box" style={{
          padding: 10, display:'flex', gap: 10,
          background: c.main ? 'var(--paper-warm)' : 'var(--paper)',
        }}>
          <Img w={62} h={78} label={c.n}/>
          <div style={{flex:1, minWidth:0}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
              <div className="wf-h2" style={{fontSize:18}}>{c.n}</div>
              <span className="wf-tag wf-tag-accent">{c.cls}</span>
            </div>
            <div className="wf-body" style={{color:'var(--ink-soft)', fontStyle:'italic', fontSize: 12, marginTop: 2}}>{c.q}</div>
            <div style={{display:'flex', alignItems:'center', gap: 8, marginTop: 6}}>
              <span className="wf-meta">HP {c.hp}/{c.hpm}</span>
              <Progress filled={c.hp} total={c.hpm}/>
            </div>
            <div style={{display:'flex', flexWrap:'wrap', gap: 4, marginTop: 6}}>
              {c.traits.map(t => <span key={t} className="wf-tag">{t}</span>)}
            </div>
          </div>
        </div>
      ))}

      <button className="wf-btn wf-box-dashed" style={{padding:14, boxShadow:'none', background:'transparent', textAlign:'center'}}>
        + add character or companion
      </button>

      <Anno style={{top: 10, right: 6, transform:'rotate(4deg)', maxWidth: 80, textAlign:'right'}}>
        all PCs at<br/>once, no<br/>switching ↘
      </Anno>
    </div>
    <BottomNav active="party"/>
  </div>
);

Object.assign(window, { PartyA, PartyB });
