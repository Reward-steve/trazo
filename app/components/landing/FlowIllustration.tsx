export default function FlowIllustration() {
  return (
    <svg
      width="100%"
      viewBox="0 0 680 720"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Customer journey flow: Tap Link, Browse Store, Place Order, Order in WhatsApp"
    >
      <style>{`
        @keyframes dash{to{stroke-dashoffset:-22}}
        @keyframes pulse{0%,100%{opacity:.16}50%{opacity:.3}}
        .fl1{animation:dash 1.8s linear infinite}
        .fl2{animation:dash 1.8s linear infinite .45s}
        .fl3{animation:dash 1.8s linear infinite .9s}
        .fl4{animation:dash 1.8s linear infinite 1.35s}
        .hl{animation:pulse 3.2s ease-in-out infinite}
        .hl2{animation:pulse 3.2s ease-in-out infinite .8s}
        .hl3{animation:pulse 3.2s ease-in-out infinite 1.6s}
        .hl4{animation:pulse 3.2s ease-in-out infinite 2.4s}
        @media (prefers-reduced-motion: reduce) {
          .fl1,.fl2,.fl3,.fl4,.hl,.hl2,.hl3,.hl4 { animation: none !important; }
        }
      `}</style>
      <defs>
        <radialGradient id="hx" cx="35%" cy="25%" r="75%">
          <stop offset="0%" stopColor="#0d2818" />
          <stop offset="100%" stopColor="#050f09" />
        </radialGradient>
        <radialGradient id="h1g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22C55E" stopOpacity=".26" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </radialGradient>
        <filter
          id="fg"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="9" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter
          id="fb"
          x="-120%"
          y="-120%"
          width="340%"
          height="340%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="16" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter
          id="fi"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="2" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <filter
          id="fd"
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="4" result="b" />
          <feComposite in="SourceGraphic" in2="b" operator="over" />
        </filter>
        <marker
          id="tip"
          viewBox="0 0 12 12"
          refX="9"
          refY="6"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path
            d="M2 2L10 6L2 10"
            fill="none"
            stroke="#22C55E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>

      {/* Halos */}
      <ellipse
        cx="340"
        cy="148"
        rx="76"
        ry="76"
        fill="url(#h1g)"
        className="hl"
      />
      <ellipse
        cx="530"
        cy="360"
        rx="76"
        ry="76"
        fill="url(#h1g)"
        className="hl2"
      />
      <ellipse
        cx="340"
        cy="572"
        rx="76"
        ry="76"
        fill="url(#h1g)"
        className="hl3"
      />
      <ellipse
        cx="150"
        cy="360"
        rx="76"
        ry="76"
        fill="url(#h1g)"
        className="hl4"
      />

      {/* Arrows — ghost tracks */}
      <path
        d="M 390 175 Q 500 175 503 305"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".8"
        strokeDasharray="5 4"
        opacity=".15"
      />
      <path
        d="M 503 415 Q 500 545 390 545"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".8"
        strokeDasharray="5 4"
        opacity=".15"
      />
      <path
        d="M 290 545 Q 180 545 177 415"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".8"
        strokeDasharray="5 4"
        opacity=".15"
      />
      <path
        d="M 177 305 Q 180 175 290 175"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".8"
        strokeDasharray="5 4"
        opacity=".15"
      />

      {/* Arrows — animated */}
      <path
        d="M 390 175 Q 500 175 503 305"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeDasharray="7 5"
        opacity=".75"
        className="fl1"
        markerEnd="url(#tip)"
      />
      <path
        d="M 503 415 Q 500 545 390 545"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeDasharray="7 5"
        opacity=".75"
        className="fl2"
        markerEnd="url(#tip)"
      />
      <path
        d="M 290 545 Q 180 545 177 415"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeDasharray="7 5"
        opacity=".75"
        className="fl3"
        markerEnd="url(#tip)"
      />
      <path
        d="M 177 305 Q 180 175 290 175"
        fill="none"
        stroke="#22C55E"
        strokeWidth="2"
        strokeDasharray="7 5"
        opacity=".75"
        className="fl4"
        markerEnd="url(#tip)"
      />

      {/* Centre compass */}
      <circle cx="340" cy="360" r="3.5" fill="#22C55E" opacity=".2" />
      <circle
        cx="340"
        cy="360"
        r="18"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".5"
        opacity=".1"
      />
      <circle
        cx="340"
        cy="360"
        r="30"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".4"
        opacity=".06"
      />

      {/* ── NODE 1 — TAP LINK (top, cx=340 cy=148) ── */}
      <polygon
        points="340,84 395,116 395,180 340,212 285,180 285,116"
        fill="#22C55E"
        opacity=".25"
        filter="url(#fb)"
      />
      <polygon
        points="340,84 395,116 395,180 340,212 285,180 285,116"
        fill="#22C55E"
        opacity=".2"
        filter="url(#fg)"
      />
      <polygon
        points="340,84 395,116 395,180 340,212 285,180 285,116"
        fill="url(#hx)"
        stroke="#22C55E"
        strokeWidth="1.6"
      />
      <polygon
        points="340,90 389,119 389,177 340,206 291,177 291,119"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".55"
        opacity=".28"
      />
      <polygon
        points="340,102 378,124 378,172 340,196 302,172 302,124"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".35"
        opacity=".1"
      />
      <g filter="url(#fi)">
        <rect
          x="325"
          y="120"
          width="21"
          height="34"
          rx="3.2"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.5"
        />
        <rect
          x="328"
          y="123"
          width="15"
          height="24"
          rx="1.5"
          fill="#22C55E"
          opacity=".09"
        />
        <rect
          x="329"
          y="125"
          width="10"
          height="1.8"
          rx=".9"
          fill="#22C55E"
          opacity=".55"
        />
        <rect
          x="329"
          y="128"
          width="13"
          height="1.2"
          rx=".6"
          fill="#22C55E"
          opacity=".28"
        />
        <rect
          x="329"
          y="130.5"
          width="10"
          height="1.2"
          rx=".6"
          fill="#22C55E"
          opacity=".28"
        />
        <rect
          x="329"
          y="133"
          width="7"
          height="1.2"
          rx=".6"
          fill="#22C55E"
          opacity=".28"
        />
        <circle
          cx="335.5"
          cy="147"
          r="2.2"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1"
        />
        <path
          d="M347 131 Q351 127.5 354 131 L354 138 L352 138"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="354"
          cy="129.5"
          r="2.5"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.4"
        />
        <circle
          cx="354"
          cy="129.5"
          r="4.5"
          fill="none"
          stroke="#22C55E"
          strokeWidth=".7"
          opacity=".35"
        />
        <circle
          cx="354"
          cy="129.5"
          r="6.5"
          fill="none"
          stroke="#22C55E"
          strokeWidth=".4"
          opacity=".16"
        />
      </g>
      <circle
        cx="399"
        cy="84"
        r="13"
        fill="#22C55E"
        opacity=".5"
        filter="url(#fd)"
      />
      <circle
        cx="399"
        cy="84"
        r="13"
        fill="#050f09"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="399"
        y="88.5"
        textAnchor="middle"
        fontFamily="'Inter',sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#22C55E"
      >
        1
      </text>

      {/* ── NODE 2 — BROWSE STORE (right, cx=530 cy=360) ── */}
      <polygon
        points="530,296 585,328 585,392 530,424 475,392 475,328"
        fill="#22C55E"
        opacity=".25"
        filter="url(#fb)"
      />
      <polygon
        points="530,296 585,328 585,392 530,424 475,392 475,328"
        fill="#22C55E"
        opacity=".2"
        filter="url(#fg)"
      />
      <polygon
        points="530,296 585,328 585,392 530,424 475,392 475,328"
        fill="url(#hx)"
        stroke="#22C55E"
        strokeWidth="1.6"
      />
      <polygon
        points="530,302 579,331 579,389 530,418 481,389 481,331"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".55"
        opacity=".28"
      />
      <polygon
        points="530,314 568,336 568,384 530,406 492,384 492,336"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".35"
        opacity=".1"
      />
      <g filter="url(#fi)">
        <rect
          x="515"
          y="333"
          width="21"
          height="34"
          rx="3.2"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.5"
        />
        <rect
          x="518"
          y="336"
          width="15"
          height="24"
          rx="1.5"
          fill="#22C55E"
          opacity=".08"
        />
        <path d="M518 342 Q525.5 337 533 342" fill="#22C55E" opacity=".22" />
        <path
          d="M518 342 Q525.5 337 533 342"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.3"
        />
        <line
          x1="521"
          y1="337.8"
          x2="520"
          y2="342"
          stroke="#22C55E"
          strokeWidth=".9"
          opacity=".5"
        />
        <line
          x1="525.5"
          y1="336.5"
          x2="525.5"
          y2="342"
          stroke="#22C55E"
          strokeWidth=".9"
          opacity=".5"
        />
        <line
          x1="530"
          y1="337.8"
          x2="531"
          y2="342"
          stroke="#22C55E"
          strokeWidth=".9"
          opacity=".5"
        />
        <rect
          x="519"
          y="344"
          width="5.5"
          height="5.5"
          rx=".8"
          fill="#22C55E"
          opacity=".45"
        />
        <rect
          x="525.5"
          y="344"
          width="5.5"
          height="5.5"
          rx=".8"
          fill="#22C55E"
          opacity=".28"
        />
        <rect
          x="519"
          y="351"
          width="5.5"
          height="5.5"
          rx=".8"
          fill="#22C55E"
          opacity=".28"
        />
        <rect
          x="525.5"
          y="351"
          width="5.5"
          height="5.5"
          rx=".8"
          fill="#22C55E"
          opacity=".45"
        />
        <circle
          cx="525.5"
          cy="361"
          r="2.2"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1"
        />
      </g>
      <circle
        cx="589"
        cy="296"
        r="13"
        fill="#22C55E"
        opacity=".5"
        filter="url(#fd)"
      />
      <circle
        cx="589"
        cy="296"
        r="13"
        fill="#050f09"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="589"
        y="300.5"
        textAnchor="middle"
        fontFamily="'Inter',sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#22C55E"
      >
        2
      </text>

      {/* ── NODE 3 — PLACE ORDER (bottom, cx=340 cy=572) ── */}
      <polygon
        points="340,508 395,540 395,604 340,636 285,604 285,540"
        fill="#22C55E"
        opacity=".25"
        filter="url(#fb)"
      />
      <polygon
        points="340,508 395,540 395,604 340,636 285,604 285,540"
        fill="#22C55E"
        opacity=".2"
        filter="url(#fg)"
      />
      <polygon
        points="340,508 395,540 395,604 340,636 285,604 285,540"
        fill="url(#hx)"
        stroke="#22C55E"
        strokeWidth="1.6"
      />
      <polygon
        points="340,514 389,543 389,601 340,630 291,601 291,543"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".55"
        opacity=".28"
      />
      <polygon
        points="340,526 378,548 378,596 340,620 302,596 302,548"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".35"
        opacity=".1"
      />
      <g filter="url(#fi)">
        <path
          d="M325 546 L327 546 L331 563 L353 563 L356 552 H332"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="334"
          cy="566.5"
          r="2.8"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.3"
        />
        <circle
          cx="349"
          cy="566.5"
          r="2.8"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.3"
        />
        <rect
          x="334"
          y="548"
          width="11"
          height="9.5"
          rx="1.5"
          fill="#22C55E"
          opacity=".18"
          stroke="#22C55E"
          strokeWidth="1"
        />
        <line
          x1="339.5"
          y1="548"
          x2="339.5"
          y2="557.5"
          stroke="#22C55E"
          strokeWidth=".9"
          opacity=".45"
        />
        <circle
          cx="354"
          cy="545"
          r="6.5"
          fill="#050f09"
          stroke="#22C55E"
          strokeWidth="1.2"
        />
        <path
          d="M351.5 545 L353.5 547 L357 543"
          fill="none"
          stroke="#22C55E"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <circle
        cx="399"
        cy="508"
        r="13"
        fill="#22C55E"
        opacity=".5"
        filter="url(#fd)"
      />
      <circle
        cx="399"
        cy="508"
        r="13"
        fill="#050f09"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="399"
        y="512.5"
        textAnchor="middle"
        fontFamily="'Inter',sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#22C55E"
      >
        3
      </text>

      {/* ── NODE 4 — WHATSAPP (left, cx=150 cy=360) ── */}
      <polygon
        points="150,296 205,328 205,392 150,424 95,392 95,328"
        fill="#22C55E"
        opacity=".25"
        filter="url(#fb)"
      />
      <polygon
        points="150,296 205,328 205,392 150,424 95,392 95,328"
        fill="#22C55E"
        opacity=".2"
        filter="url(#fg)"
      />
      <polygon
        points="150,296 205,328 205,392 150,424 95,392 95,328"
        fill="url(#hx)"
        stroke="#22C55E"
        strokeWidth="1.6"
      />
      <polygon
        points="150,302 199,331 199,389 150,418 101,389 101,331"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".55"
        opacity=".28"
      />
      <polygon
        points="150,314 188,336 188,384 150,406 112,384 112,336"
        fill="none"
        stroke="#22C55E"
        strokeWidth=".35"
        opacity=".1"
      />
      <g filter="url(#fi)">
        <path
          d="M132 335 Q132 329 138 329 L166 329 Q172 329 172 335 L172 352 Q172 358 166 358 L156 358 L152 364 L150 358 L138 358 Q132 358 132 352 Z"
          fill="#22C55E"
          opacity=".11"
          stroke="#22C55E"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <rect
          x="138"
          y="334"
          width="12"
          height="10"
          rx="1.5"
          fill="#22C55E"
          opacity=".2"
          stroke="#22C55E"
          strokeWidth=".9"
        />
        <line
          x1="139.5"
          y1="337"
          x2="149"
          y2="337"
          stroke="#22C55E"
          strokeWidth=".9"
          opacity=".45"
        />
        <line
          x1="139.5"
          y1="339.5"
          x2="149"
          y2="339.5"
          stroke="#22C55E"
          strokeWidth=".9"
          opacity=".3"
        />
        <line
          x1="139.5"
          y1="342"
          x2="145"
          y2="342"
          stroke="#22C55E"
          strokeWidth=".9"
          opacity=".3"
        />
        <circle
          cx="165"
          cy="333"
          r="5.5"
          fill="#22C55E"
          opacity=".9"
          filter="url(#fd)"
        />
        <circle cx="165" cy="333" r="5.5" fill="#22C55E" />
        <text
          x="165"
          y="335.8"
          textAnchor="middle"
          fontFamily="'Inter',sans-serif"
          fontSize="6"
          fontWeight="700"
          fill="#050f09"
        >
          1
        </text>
      </g>
      <circle
        cx="91"
        cy="296"
        r="13"
        fill="#22C55E"
        opacity=".5"
        filter="url(#fd)"
      />
      <circle
        cx="91"
        cy="296"
        r="13"
        fill="#050f09"
        stroke="#22C55E"
        strokeWidth="1.8"
      />
      <text
        x="91"
        y="300.5"
        textAnchor="middle"
        fontFamily="'Inter',sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#22C55E"
      >
        4
      </text>
    </svg>
  );
}
