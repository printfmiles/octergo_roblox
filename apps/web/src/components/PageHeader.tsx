interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header style={{ marginBottom: '2rem' }}>
      <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>{title}</h1>
      {subtitle && (
        <p style={{ margin: '0.5rem 0 0', color: '#64748b', fontSize: 14 }}>{subtitle}</p>
      )}
    </header>
  );
}
