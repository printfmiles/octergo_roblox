interface LogoProps {
  size?: number;
}

export function Logo({ size = 28 }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="16" fill="#ffffff" />
      <polygon points="18,8 82,8 50,42" fill="#08080d" />
      <polygon points="18,92 82,92 50,58" fill="#08080d" />
      <polygon points="8,18 8,82 42,50" fill="#08080d" />
      <polygon points="92,18 92,82 58,50" fill="#08080d" />
    </svg>
  );
}
