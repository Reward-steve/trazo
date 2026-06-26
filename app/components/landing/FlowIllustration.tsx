export default function FlowIllustration() {
  return (
    <svg
      width="100%"
      viewBox="0 0 680 680"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Customer journey: Tap Link, Browse Store, Place Order, Order in WhatsApp"
    >
      <style>{`
        @keyframes flowdash { to { stroke-dashoffset: -32; } }
        @keyframes halo { 0%,100%{opacity:.18} 50%{opacity:.35} }
        .a1 { animation: flowdash 1.6s linear infinite 0s; }
        .a2 { animation: flowdash 1.6s linear infinite 0.4s; }
        .a3 { animation: flowdash 1.6s linear infinite 0.8s; }
        .a4 { animation: flowdash 1.6s linear infinite 1.2s; }
        .h1 { animation: halo 3s ease-in-out infinite 0s; }
        .h2 { animation: halo 3s ease-in-out infinite 0.75s; }
        .h3 { animation: halo 3s ease-in-out infinite 1.5s; }
        .h4 { animation: halo 3s ease-in-out infinite 2.25s; }
        @media (prefers-reduced-motion: reduce) {
          .a1,.a2,.a3,.a4,.h1,.h2,.h3,.h4 { animation: none !important; }
        }
      `}</style>

      <defs>
        <radialGradient id="hxfill" cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#0e2a1a" />
          <stop offset="100%" stopColor="#040d07" />
        </radialGradient>
        <radialGradient id="nhalo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22C55E" stopOpacity=".3" />
          <stop offset="70%" stopColor="#22C55E" stopOpacity=".08" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </radialGradient>
        <filter
          id="bloom"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="18" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter
          id="hexglow"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="8" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter
          id="iglow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter
          id="bglow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="5" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <marker
          id="arrtip"
          viewBox="0 0 14 14"
          refX="10"
          refY="7"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            d="M2 2L11 7L2 12"
            fill="none"
            stroke="#22C55E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Ring guide */}
      <circle
        cx="340"
        cy="340"
        r="185"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.6"
        opacity="0.08"
        strokeDasharray="3 6"
      />

      {/* Halos */}
      <circle cx="340" cy="155" r="80" fill="url(#nhalo)" className="h1" />
      <circle cx="525" cy="340" r="80" fill="url(#nhalo)" className="h2" />
      <circle cx="340" cy="525" r="80" fill="url(#nhalo)" className="h3" />
      <circle cx="155" cy="340" r="80" fill="url(#nhalo)" className="h4" />

      {/* Arrow ghost tracks */}
      <path
        d="M 454 194 A 185 185 0 0 1 486 226"
        fill="none"
        stroke="#22C55E"
        strokeWidth="1"
        opacity="0.12"
        strokeDasharray="4 4"
      />
      <path
        d="M 486 454 A 185 185 0 0 1 454 486"
        fill="none"
        stroke="#22C55E"
        strokeWidth="1"
        opacity="0.12"
        strokeDasharray="4 4"
      />
      <path
        d="M 226 486 A 185 185 0 0 1 194 454"
        fill="none"
        stroke="#22C55E"
        strokeWidth="1"
        opacity="0.12"
        strokeDasharray="4 4"
      />
      <path
        d="M 194 226 A 185 185 0 0 1 226 194"
        fill="none"
        stroke="#22C55E"
        strokeWidth="1"
        opacity="0.12"
        strokeDasharray="4 4"
      />

      {/* Animated arrows */}
      <path
        d="M 454 194 A 185 185 0 0 1 486 226"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2.5"
        opacity="0.9"
        strokeDasharray="10 6"
        strokeLinecap="round"
        className="a1"
        markerEnd="url(#arrtip)"
      />
      <path
        d="M 486 454 A 185 185 0 0 1 454 486"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2.5"
        opacity="0.9"
        strokeDasharray="10 6"
        strokeLinecap="round"
        className="a2"
        markerEnd="url(#arrtip)"
      />
      <path
        d="M 226 486 A 185 185 0 0 1 194 454"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2.5"
        opacity="0.9"
        strokeDasharray="10 6"
        strokeLinecap="round"
        className="a3"
        markerEnd="url(#arrtip)"
      />
      <path
        d="M 194 226 A 185 185 0 0 1 226 194"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2.5"
        opacity="0.9"
        strokeDasharray="10 6"
        strokeLinecap="round"
        className="a4"
        markerEnd="url(#arrtip)"
      />

      {/* Centre */}
      <circle cx="340" cy="340" r="5" fill="#22C55E" opacity="0.2" />
      <circle
        cx="340"
        cy="340"
        r="12"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.6"
        opacity="0.1"
      />
      <circle
        cx="340"
        cy="340"
        r="22"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.4"
        opacity="0.06"
      />

      {/* ── NODE 1 — TAP LINK (top, 340,155) ── */}
      <polygon
        points="340,97 390,126 390,184 340,213 290,184 290,126"
        fill="#22C55E"
        opacity="0.22"
        filter="url(#bloom)"
      />
      <polygon
        points="340,97 390,126 390,184 340,213 290,184 290,126"
        fill="#22C55E"
        opacity="0.18"
        filter="url(#hexglow)"
      />
      <polygon
        points="340,97 390,126 390,184 340,213 290,184 290,126"
        fill="url(#hxfill)"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <polygon
        points="340,103 384,129 384,181 340,207 296,181 296,129"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.6"
        opacity="0.25"
      />
      <polygon
        points="340,115 374,136 374,174 340,201 306,174 306,136"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.35"
        opacity="0.1"
      />
      <g filter="url(#iglow)">
        <rect
          x="323"
          y="122"
          width="22"
          height="36"
          rx="3.5"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.6"
        />
        <rect
          x="326"
          y="125.5"
          width="16"
          height="25"
          rx="2"
          fill="#22C55E"
          opacity="0.1"
        />
        <rect
          x="327.5"
          y="127"
          width="11"
          height="2"
          rx="1"
          fill="#22C55E"
          opacity="0.6"
        />
        <rect
          x="327.5"
          y="131"
          width="13"
          height="1.4"
          rx="0.7"
          fill="#22C55E"
          opacity="0.3"
        />
        <rect
          x="327.5"
          y="134"
          width="10"
          height="1.4"
          rx="0.7"
          fill="#22C55E"
          opacity="0.3"
        />
        <rect
          x="327.5"
          y="137"
          width="8"
          height="1.4"
          rx="0.7"
          fill="#22C55E"
          opacity="0.25"
        />
        <rect
          x="331"
          y="143"
          width="6"
          height="1.5"
          rx="0.75"
          fill="#22C55E"
          opacity="0.35"
        />
        <path
          d="M349 133 Q353 129 357 133 L357 141 L354.5 141"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="357"
          cy="131"
          r="2.8"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.5"
        />
        <circle
          cx="357"
          cy="131"
          r="5"
          fill="none"
          stroke="#22C55E"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <circle
          cx="357"
          cy="131"
          r="7.5"
          fill="none"
          stroke="#22C55E"
          strokeWidth="0.5"
          opacity="0.2"
        />
      </g>
      <circle
        cx="397"
        cy="93"
        r="14"
        fill="#22C55E"
        opacity="0.45"
        filter="url(#bglow)"
      />
      <circle
        cx="397"
        cy="93"
        r="14"
        fill="#040d07"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="397"
        y="97.5"
        textAnchor="middle"
        fontFamily="'Inter','Segoe UI',sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="#22C55E"
      >
        1
      </text>

      {/* ── NODE 2 — BROWSE STORE (right, 525,340) ── */}
      <polygon
        points="525,282 575,311 575,369 525,398 475,369 475,311"
        fill="#22C55E"
        opacity="0.22"
        filter="url(#bloom)"
      />
      <polygon
        points="525,282 575,311 575,369 525,398 475,369 475,311"
        fill="#22C55E"
        opacity="0.18"
        filter="url(#hexglow)"
      />
      <polygon
        points="525,282 575,311 575,369 525,398 475,369 475,311"
        fill="url(#hxfill)"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <polygon
        points="525,288 569,314 569,366 525,392 481,366 481,314"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.6"
        opacity="0.25"
      />
      <polygon
        points="525,300 559,318 559,362 525,386 491,362 491,318"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.35"
        opacity="0.1"
      />
      <g filter="url(#iglow)">
        <rect
          x="509"
          y="309"
          width="22"
          height="36"
          rx="3.5"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.6"
        />
        <rect
          x="512"
          y="312.5"
          width="16"
          height="25"
          rx="2"
          fill="#22C55E"
          opacity="0.08"
        />
        <path d="M512 319 Q520 314 528 319" fill="#22C55E" opacity="0.25" />
        <path
          d="M512 319 Q520 314 528 319"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.4"
        />
        <line
          x1="515"
          y1="314.8"
          x2="514"
          y2="319"
          stroke="#22C55E"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="520"
          y1="313.5"
          x2="520"
          y2="319"
          stroke="#22C55E"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="525"
          y1="314.8"
          x2="526"
          y2="319"
          stroke="#22C55E"
          strokeWidth="1"
          opacity="0.5"
        />
        <rect
          x="513"
          y="321"
          width="6"
          height="6"
          rx="1"
          fill="#22C55E"
          opacity="0.5"
        />
        <rect
          x="521"
          y="321"
          width="6"
          height="6"
          rx="1"
          fill="#22C55E"
          opacity="0.3"
        />
        <rect
          x="513"
          y="329"
          width="6"
          height="6"
          rx="1"
          fill="#22C55E"
          opacity="0.3"
        />
        <rect
          x="521"
          y="329"
          width="6"
          height="6"
          rx="1"
          fill="#22C55E"
          opacity="0.5"
        />
        <rect
          x="517"
          y="338"
          width="6"
          height="1.5"
          rx="0.75"
          fill="#22C55E"
          opacity="0.35"
        />
      </g>
      <circle
        cx="582"
        cy="278"
        r="14"
        fill="#22C55E"
        opacity="0.45"
        filter="url(#bglow)"
      />
      <circle
        cx="582"
        cy="278"
        r="14"
        fill="#040d07"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="582"
        y="282.5"
        textAnchor="middle"
        fontFamily="'Inter','Segoe UI',sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="#22C55E"
      >
        2
      </text>

      {/* ── NODE 3 — PLACE ORDER (bottom, 340,525) ── */}
      <polygon
        points="340,467 390,496 390,554 340,583 290,554 290,496"
        fill="#22C55E"
        opacity="0.22"
        filter="url(#bloom)"
      />
      <polygon
        points="340,467 390,496 390,554 340,583 290,554 290,496"
        fill="#22C55E"
        opacity="0.18"
        filter="url(#hexglow)"
      />
      <polygon
        points="340,467 390,496 390,554 340,583 290,554 290,496"
        fill="url(#hxfill)"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <polygon
        points="340,473 384,499 384,551 340,577 296,551 296,499"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.6"
        opacity="0.25"
      />
      <polygon
        points="340,485 374,503 374,547 340,571 306,547 306,503"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.35"
        opacity="0.1"
      />
      <g filter="url(#iglow)">
        <path
          d="M320 502 L322.5 502 L327 520 L350 520 L353 509 H327"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="330"
          cy="524"
          r="3"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.4"
        />
        <circle
          cx="346"
          cy="524"
          r="3"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.4"
        />
        <rect
          x="330"
          y="507"
          width="13"
          height="10"
          rx="1.8"
          fill="#22C55E"
          opacity="0.18"
          stroke="#22C55E"
          strokeWidth="1.1"
        />
        <line
          x1="336.5"
          y1="507"
          x2="336.5"
          y2="517"
          stroke="#22C55E"
          strokeWidth="0.9"
          opacity="0.45"
        />
        <circle
          cx="352"
          cy="502"
          r="7.5"
          fill="#040d07"
          stroke="#22C55E"
          strokeWidth="1.4"
        />
        <path
          d="M349 502 L351.5 504.5 L356 499.5"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle
        cx="397"
        cy="463"
        r="14"
        fill="#22C55E"
        opacity="0.45"
        filter="url(#bglow)"
      />
      <circle
        cx="397"
        cy="463"
        r="14"
        fill="#040d07"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="397"
        y="467.5"
        textAnchor="middle"
        fontFamily="'Inter','Segoe UI',sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="#22C55E"
      >
        3
      </text>

      {/* ── NODE 4 — ORDER IN WHATSAPP (left, 155,340) ── */}
      <polygon
        points="155,282 205,311 205,369 155,398 105,369 105,311"
        fill="#22C55E"
        opacity="0.22"
        filter="url(#bloom)"
      />
      <polygon
        points="155,282 205,311 205,369 155,398 105,369 105,311"
        fill="#22C55E"
        opacity="0.18"
        filter="url(#hexglow)"
      />
      <polygon
        points="155,282 205,311 205,369 155,398 105,369 105,311"
        fill="url(#hxfill)"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <polygon
        points="155,288 199,314 199,366 155,392 111,366 111,314"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.6"
        opacity="0.25"
      />
      <polygon
        points="155,300 189,318 189,362 155,386 121,362 121,318"
        fill="none"
        stroke="#22C55E"
        strokeWidth="0.35"
        opacity="0.1"
      />
      <g filter="url(#iglow)">
        <path
          d="M135 316 Q135 310 141 310 L172 310 Q178 310 178 316 L178 334 Q178 340 172 340 L161 340 L157 346 L154.5 340 L141 340 Q135 340 135 334 Z"
          fill="#22C55E"
          opacity="0.12"
          stroke="#22C55E"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <rect
          x="141"
          y="315"
          width="14"
          height="12"
          rx="1.8"
          fill="#22C55E"
          opacity="0.2"
          stroke="#22C55E"
          strokeWidth="1"
        />
        <line
          x1="143"
          y1="318.5"
          x2="153"
          y2="318.5"
          stroke="#22C55E"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="143"
          y1="321.5"
          x2="153"
          y2="321.5"
          stroke="#22C55E"
          strokeWidth="1"
          opacity="0.35"
        />
        <line
          x1="143"
          y1="324.5"
          x2="149"
          y2="324.5"
          stroke="#22C55E"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle cx="174" cy="309" r="6.5" fill="#22C55E" filter="url(#bglow)" />
        <circle cx="174" cy="309" r="6.5" fill="#22C55E" />
        <text
          x="174"
          y="312"
          textAnchor="middle"
          fontFamily="'Inter','Segoe UI',sans-serif"
          fontSize="7"
          fontWeight="700"
          fill="#040d07"
        >
          1
        </text>
      </g>
      <circle
        cx="98"
        cy="278"
        r="14"
        fill="#22C55E"
        opacity="0.45"
        filter="url(#bglow)"
      />
      <circle
        cx="98"
        cy="278"
        r="14"
        fill="#040d07"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="98"
        y="282.5"
        textAnchor="middle"
        fontFamily="'Inter','Segoe UI',sans-serif"
        fontSize="12"
        fontWeight="700"
        fill="#22C55E"
      >
        4
      </text>
    </svg>
  );
}
