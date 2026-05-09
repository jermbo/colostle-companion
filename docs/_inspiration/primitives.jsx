// Shared wireframe primitives

const Anno = ({ children, style }) => (
  <div className="wf-anno" style={style}>{children}</div>
);

// Hand-drawn arrow
const Arrow = ({ from, to, curve = 30, color = 'var(--rust)' }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  // perpendicular offset for curve
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const px = -dy / len * curve;
  const py = dx / len * curve;
  const cx = mx + px;
  const cy = my + py;
  return (
    <svg style={{position:'absolute', inset: 0, width:'100%', height:'100%', pointerEvents:'none', zIndex: 4}}>
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill={color}/>
        </marker>
      </defs>
      <path d={`M${from.x},${from.y} Q${cx},${cy} ${to.x},${to.y}`}
            fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round"
            markerEnd="url(#arrowhead)"
            strokeDasharray="0"/>
    </svg>
  );
};

// Sketchy card placeholder
const Card = ({ w = 60, h = 88, label, suit, dim = false, style = {} }) => (
  <div className="wf-card" style={{ width: w, height: h, opacity: dim ? 0.5 : 1, ...style }}>
    {label && <div style={{fontSize: 14, fontWeight: 700, color: 'var(--ink)'}}>{label}</div>}
    {suit && <div style={{fontSize: 18, color: 'var(--ink)', marginTop: 2}}>{suit}</div>}
  </div>
);

const CardBack = ({ w = 60, h = 88, style = {} }) => (
  <div style={{
    width: w, height: h,
    background: 'var(--accent)',
    border: '1.5px solid var(--line)',
    borderRadius: '6px 8px 7px 9px / 8px 6px 9px 7px',
    position: 'relative',
    backgroundImage: `repeating-linear-gradient(45deg, var(--accent), var(--accent) 4px, var(--accent-soft) 4px, var(--accent-soft) 8px)`,
    ...style
  }}>
    <div style={{
      position:'absolute', inset: 5, border: '1px dashed rgba(244,239,230,0.6)',
      borderRadius: 4
    }}/>
  </div>
);

// Image placeholder
const Img = ({ w, h, label = 'image', style = {} }) => (
  <div className="wf-img" style={{ width: w, height: h, ...style }}>{label}</div>
);

// Squiggly handwriting line for journal entries
const HandwritingLine = ({ width = '100%', dense = false }) => (
  <svg width={width} height={dense ? 6 : 9} viewBox="0 0 200 9" preserveAspectRatio="none"
       style={{display: 'block', opacity: 0.55}}>
    <path d="M0,5 Q4,2 8,5 T16,5 T24,5 T32,5 T40,5 T48,5 T56,5 T64,5 T72,5 T80,5 T88,5 T96,5 T104,5 T112,5 T120,5 T128,5 T136,5 T144,5 T152,5 T160,5 T168,5 T176,5 T184,5 T192,5 T200,5"
          fill="none" stroke="var(--ink-soft)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// Block of fake handwriting
const Handwriting = ({ lines = 3, lastWidth = '60%', gap = 8 }) => (
  <div style={{display:'flex', flexDirection:'column', gap}}>
    {Array.from({length: lines}).map((_, i) => (
      <HandwritingLine key={i} width={i === lines - 1 ? lastWidth : '100%'} />
    ))}
  </div>
);

// Tiny icon glyphs (drawn with chars + circles, very low-fi)
const Glyph = ({ ch, size = 16 }) => (
  <span style={{
    display:'inline-flex', alignItems:'center', justifyContent:'center',
    width: size, height: size,
    border: '1.2px solid currentColor', borderRadius: '50% 40% 55% 45% / 45% 55% 40% 60%',
    fontSize: size * 0.55, fontFamily: 'Caveat, cursive', fontWeight: 600
  }}>{ch}</span>
);

// Sketchy progress bar (filled segments)
const Progress = ({ filled, total, w = 80, color = 'var(--ink)' }) => (
  <div style={{display:'flex', gap: 2}}>
    {Array.from({length: total}).map((_, i) => (
      <div key={i} style={{
        flex: 1,
        height: 6,
        border: '1px solid var(--line)',
        background: i < filled ? color : 'transparent',
        borderRadius: '2px 3px 2px 3px / 3px 2px 3px 2px',
      }}/>
    ))}
  </div>
);

// Mobile status bar
const StatusBar = () => (
  <div className="wf-status">
    <span>9:41</span>
    <span>· · ·</span>
    <span>◐ ▮▮▮</span>
  </div>
);

// Bottom nav
const BottomNav = ({ active = 'play' }) => {
  const items = [
    { id: 'home', label: 'Home', g: '⌂' },
    { id: 'play', label: 'Play', g: '◆' },
    { id: 'party', label: 'Party', g: '♛' },
    { id: 'story', label: 'Story', g: '✎' },
    { id: 'cards', label: 'Cards', g: '♠' },
  ];
  return (
    <div className="wf-bottomnav">
      {items.map(it => (
        <div key={it.id} className={`wf-navitem ${active === it.id ? 'active' : ''}`}>
          <div className="wf-navicon">{it.g}</div>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
};

// Top header bar
const TopBar = ({ title, left, right, sub }) => (
  <div style={{
    padding: '10px 14px 8px',
    borderBottom: '1.5px solid var(--line)',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    flexShrink: 0,
    background: 'var(--paper-warm)',
  }}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <div style={{minWidth: 28, fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700}}>{left}</div>
      <div className="wf-title" style={{flex: 1, textAlign: 'center'}}>{title}</div>
      <div style={{minWidth: 28, textAlign: 'right', fontFamily: 'Caveat, cursive', fontSize: 18, fontWeight: 600}}>{right}</div>
    </div>
    {sub && <div className="wf-meta" style={{textAlign: 'center'}}>{sub}</div>}
  </div>
);

Object.assign(window, { Anno, Arrow, Card, CardBack, Img, HandwritingLine, Handwriting, Glyph, Progress, StatusBar, BottomNav, TopBar });
