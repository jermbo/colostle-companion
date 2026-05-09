// Inventory & Card reference

// Inventory A: List with categories
const InventoryA = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Inventory" left="‹" right="+" sub="14 items · 3 of 6 slots"/>

    {/* Capacity */}
    <div style={{padding:'10px 14px', borderBottom:'1px dashed var(--ink-soft)', flexShrink:0, background:'var(--paper-warm)'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span className="wf-label">// carry capacity</span>
        <span className="wf-meta">3 of 6 slots</span>
      </div>
      <div style={{display:'flex', gap: 4, marginTop: 6}}>
        {Array.from({length: 6}).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 22,
            border: '1.2px solid var(--line)',
            borderRadius: '3px 5px 4px 6px / 5px 3px 6px 4px',
            background: i < 3 ? 'var(--paper)' : 'transparent',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize: 11, fontFamily:'Caveat,cursive',
          }}>
            {i < 3 ? ['🗡','📜','🪙'][i] : ''}
          </div>
        ))}
      </div>
    </div>

    {/* Filter */}
    <div style={{display:'flex', gap: 4, padding:'8px 14px', borderBottom:'1px dashed var(--ink-faint)', flexShrink: 0}}>
      <span className="wf-tag wf-tag-accent">all (14)</span>
      <span className="wf-tag">weapons</span>
      <span className="wf-tag">tools</span>
      <span className="wf-tag">treasure</span>
      <span className="wf-tag">notes</span>
    </div>

    <div className="wf-scroll" style={{overflowY:'auto', padding:'12px 14px', position:'relative'}}>

      {[
        { cat: 'CARRIED', items: [
          { n:'Father\'s sword', d:'long-blade · keepsake', card:'K♠', tag:'weapon', equip: true },
          { n:'Letter from the statue', d:'unread, sealed in wax', card:'J♦', tag:'lore' },
          { n:'Copper coin', d:'half-buried in moss', card:'4♥', tag:'treasure' },
        ]},
        { cat: 'STASHED · The Reach', items: [
          { n:'Bishop\'s spectacles', d:'Kestra found these in chap.II', card:'7♦', tag:'tool' },
          { n:'Black feather', d:'still warm', card:'2♣', tag:'lore' },
        ]},
      ].map((g, gi) => (
        <div key={gi} style={{marginBottom: 14}}>
          <div className="wf-label" style={{marginBottom: 6}}>{g.cat}</div>
          {g.items.map((it, i) => (
            <div key={i} className="wf-box" style={{
              padding: '8px 10px', marginBottom: 6, display:'flex', gap: 10, alignItems:'center',
              background: it.equip ? 'var(--paper-warm)' : 'var(--paper)',
            }}>
              <Card w={28} h={40} label={it.card.split('')[0]} suit={it.card.slice(1)}/>
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{display:'flex', alignItems:'center', gap: 6}}>
                  <span className="wf-h2" style={{fontSize: 15}}>{it.n}</span>
                  {it.equip && <span className="wf-tag wf-tag-accent" style={{padding:'1px 5px'}}>eq</span>}
                </div>
                <div className="wf-meta">{it.d}</div>
              </div>
              <span className="wf-tag">{it.tag}</span>
            </div>
          ))}
        </div>
      ))}

      <Anno style={{top: 12, right: 4, transform:'rotate(4deg)', maxWidth: 80, textAlign:'right'}}>
        slot count<br/>= per char ↘
      </Anno>
      <Anno style={{top: 180, left: -2, transform:'rotate(-3deg)', maxWidth: 70}}>
        card =<br/>where<br/>obtained ↘
      </Anno>
    </div>
    <BottomNav active="party"/>
  </div>
);

// Inventory B: Visual slot grid (D&D style)
const InventoryB = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Vela's Pack" left="‹" right="⋯" sub="3 carried · 5 stashed"/>

    <div className="wf-scroll" style={{overflowY:'auto', padding:'14px', position:'relative'}}>
      <div className="wf-label" style={{marginBottom: 6}}>// equipped</div>
      <div style={{display:'flex', gap: 8, marginBottom: 14}}>
        <div className="wf-box" style={{flex:1, padding: 8, textAlign:'center', background:'var(--paper-warm)'}}>
          <Img w="100%" h={50} label="weapon"/>
          <div className="wf-h2" style={{fontSize: 13, marginTop: 4}}>Father's sword</div>
          <div className="wf-meta">long-blade</div>
        </div>
        <div className="wf-box" style={{flex:1, padding: 8, textAlign:'center'}}>
          <Img w="100%" h={50} label="armor"/>
          <div className="wf-h2" style={{fontSize: 13, marginTop: 4}}>Plain greaves</div>
          <div className="wf-meta">light</div>
        </div>
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// pack · 6 slots</div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 6, marginBottom: 14}}>
        {[
          { fill: true, l:'letter', from:'J♦' },
          { fill: true, l:'coin', from:'4♥' },
          { fill: true, l:'rope', from:'inv' },
          { fill: false }, { fill: false }, { fill: false },
        ].map((s, i) => (
          <div key={i} className={s.fill ? 'wf-box' : 'wf-box-dashed'} style={{
            aspectRatio: '1 / 1.1', padding: 6,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            opacity: s.fill ? 1 : 0.5,
          }}>
            {s.fill ? (
              <>
                <div style={{fontSize: 22}}>{['📜','🪙','〰'][i]}</div>
                <div className="wf-meta" style={{fontSize: 10, textAlign:'center'}}>{s.l}</div>
                <div className="wf-meta" style={{fontSize: 9, color:'var(--rust)'}}>{s.from}</div>
              </>
            ) : (
              <div className="wf-meta" style={{fontSize: 18}}>+</div>
            )}
          </div>
        ))}
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// stashed at the reach (5)</div>
      <div className="wf-box-dashed" style={{padding: 8, display:'flex', gap: 6, flexWrap:'wrap'}}>
        {['spectacles','feather','map fragment','bishop\'s ring','dried flowers'].map(s => (
          <span key={s} className="wf-tag">{s}</span>
        ))}
      </div>

      <Anno style={{top: 50, right: 4, transform:'rotate(5deg)', maxWidth: 80, textAlign:'right'}}>
        equipped slots<br/>distinct from<br/>pack ↘
      </Anno>
      <Anno style={{top: 180, left: 50, transform:'rotate(-4deg)', maxWidth: 70}}>
        ↑ source<br/>card stays<br/>visible
      </Anno>
    </div>
    <BottomNav active="party"/>
  </div>
);

// Card prompt reference - 2 variants

// CardsA: Suit-grouped grid for browse
const CardsA = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="Card Prompts" left="‹" right="🔍" sub="reference · all 52 + jokers"/>

    <div style={{display:'flex', gap: 4, padding:'8px 14px', borderBottom:'1px dashed var(--ink-soft)', flexShrink:0, background:'var(--paper-warm)'}}>
      <span className="wf-tag wf-tag-accent">explore</span>
      <span className="wf-tag">combat</span>
      <span className="wf-tag">events</span>
      <span className="wf-tag">NPCs</span>
    </div>

    <div className="wf-scroll" style={{overflowY:'auto', padding:'12px 14px', position:'relative'}}>
      {['♠ spades','♥ hearts','♦ diamonds','♣ clubs'].map((suit, si) => (
        <div key={suit} style={{marginBottom: 14}}>
          <div style={{display:'flex', alignItems:'center', gap: 6, marginBottom: 6}}>
            <span className="wf-title" style={{fontSize: 18}}>{suit}</span>
            <div style={{flex: 1, height: 1, background:'var(--ink-soft)'}}/>
            <span className="wf-meta">structures</span>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap: 4}}>
            {['A','2','3','4','5','6','7','8','9','10','J','Q','K'].map(v => (
              <div key={v} className="wf-card" style={{
                aspectRatio: '0.7 / 1',
                fontSize: 13, fontWeight: 700,
              }}>{v}</div>
            ))}
          </div>
        </div>
      ))}

      <Anno style={{top: 6, right: 4, transform:'rotate(4deg)', maxWidth: 90, textAlign:'right'}}>
        each suit =<br/>category in book ↓
      </Anno>
    </div>
    <BottomNav active="cards"/>
  </div>
);

// CardsB: Detail page when one card is opened
const CardsB = () => (
  <div className="wf-phone wf-paper-tex">
    <StatusBar/>
    <TopBar title="9 of Clubs" left="‹" right="↗" sub="combat · creature"/>

    <div className="wf-scroll" style={{overflowY:'auto', padding:'14px', position:'relative'}}>
      <div style={{display:'flex', gap: 14, marginBottom: 14, alignItems:'flex-start'}}>
        <Card w={88} h={130} label="9" suit="♣"/>
        <div style={{flex: 1}}>
          <span className="wf-tag wf-tag-combat">♣ COMBAT</span>
          <div className="wf-title" style={{marginTop: 6}}>Wandering creature</div>
          <div className="wf-meta">tier 2 · medium difficulty</div>
        </div>
      </div>

      <div className="wf-box" style={{padding: 10, marginBottom: 12, background:'var(--paper-warm)'}}>
        <div className="wf-label">// prompt</div>
        <div className="wf-body" style={{marginTop: 4, fontStyle:'italic'}}>
          "A wandering Rook, scarred but proud. It blocks the path. Will you fight, parley, or flee?"
        </div>
      </div>

      <div className="wf-label" style={{marginBottom: 6}}>// sub-table · creature type (re-flip)</div>
      <div className="wf-box" style={{padding: 0, marginBottom: 12, overflow:'hidden'}}>
        {[
          { r:'♠', t:'Knight-shape · armored, swift' },
          { r:'♥', t:'Bishop-shape · cunning, magical' },
          { r:'♦', t:'Pawn-swarm · many, weak' },
          { r:'♣', t:'Rook-shape · heavy, slow' },
        ].map((row, i) => (
          <div key={i} style={{
            display:'flex', gap: 10, padding:'8px 10px',
            borderBottom: i < 3 ? '1px dashed var(--ink-faint)' : 'none',
            background: row.r === '♣' ? 'rgba(43,74,122,0.08)' : 'transparent',
          }}>
            <span style={{fontFamily:'Caveat,cursive', fontWeight: 700, width: 18}}>{row.r}</span>
            <span className="wf-body">{row.t}</span>
          </div>
        ))}
      </div>

      <div style={{display:'flex', gap: 8}}>
        <button className="wf-btn" style={{flex:1}}>♻ re-flip sub</button>
        <button className="wf-btn wf-btn-primary" style={{flex:1}}>+ to story</button>
      </div>

      <Anno style={{top: 200, right: 4, transform:'rotate(4deg)', maxWidth: 80, textAlign:'right'}}>
        last flip<br/>highlighted ↙
      </Anno>
      <Anno style={{top: 16, left: 80, transform:'rotate(-5deg)', maxWidth: 70}}>
        ↗ sub-tables<br/>nest into one<br/>tap-flow
      </Anno>
    </div>
    <BottomNav active="cards"/>
  </div>
);

Object.assign(window, { InventoryA, InventoryB, CardsA, CardsB });
