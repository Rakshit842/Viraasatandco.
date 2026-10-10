// Viraasat & Co. emblem: a terracotta parent figure and a sage child figure
// whose bodies meet in a "V". Transparent background, scales to any size.
//
// tone="light" -> brand colours for cream backgrounds
// tone="dark"  -> lighter tints for the charcoal footer
// tone="cream" -> single cream colour, for use on coloured book covers
export default function Logo({ size = 40, tone = 'light', className = '', title = 'Viraasat & Co. logo' }) {
  const palette = {
    light: ['#9E6747', '#5E644E'],
    dark: ['#D9A582', '#8E9578'],
    cream: ['#F7F4EB', '#F7F4EB'],
  }
  const [terra, sage] = palette[tone] || palette.light

  return (
    <svg
      viewBox="36 26 232 268"
      height={size}
      width={(size * 232) / 268}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={className}
    >
      {/* parent: head + sweeping body */}
      <circle cx="108" cy="57" r="26" fill={terra} />
      <path
        fill={terra}
        d="M42 128 C54 100 88 90 114 96 C146 104 156 150 161 200 C165 236 168 262 173 287 C152 266 138 234 124 202 C108 168 76 140 42 128 Z"
      />
      {/* child: head + two-part leaf body */}
      <circle cx="222" cy="100" r="19" fill={sage} />
      <path
        fill={sage}
        d="M173 287 C158 238 168 180 207 147 C227 133 247 135 263 141 C226 158 192 212 178 280 Z"
      />
      <path
        fill={sage}
        d="M263 145 C240 158 208 200 194 248 C188 266 183 278 179 288 C190 226 222 176 263 145 Z"
      />
    </svg>
  )
}
