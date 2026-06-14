import { useState } from 'react';
import { Button, EmptyState, Icon, Modal, ModalField, PageIntro, inputStyle, useToast } from '../../components/ui';
import { useStore } from '../../lib/store';
import { DAYS, type MockSession } from '../../lib/mock';
import { avatarColor, theme } from '../../theme';

const STATUS_META: Record<MockSession['status'], { color: string; bg: string; border: string }> = {
  upcoming: { color: theme.blue, bg: 'rgba(129,140,248,0.1)', border: 'rgba(129,140,248,0.25)' },
  live: { color: theme.green, bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  completed: { color: theme.textFaint, bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.2)' },
  cancelled: { color: theme.red, bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' },
};

const FILTERS = ['all', 'upcoming', 'live', 'completed', 'cancelled'] as const;

export function SessionsView() {
  const toast = useToast();
  const { sessions, setSessions, members } = useStore();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [day, setDay] = useState('Saturday');
  const [time, setTime] = useState('18:00');
  const [notes, setNotes] = useState('');
  const [err, setErr] = useState('');

  function reset() {
    setTitle('');
    setHost('');
    setDay('Saturday');
    setTime('18:00');
    setNotes('');
    setErr('');
    setEditId(null);
  }

  function openEdit(s: MockSession) {
    setTitle(s.title);
    setHost(s.host);
    setDay(s.day);
    setTime(s.time);
    setNotes(s.notes ?? '');
    setEditId(s.id);
    setErr('');
    setShowForm(true);
  }

  function save() {
    if (!title.trim()) return setErr('Session title is required.');
    if (!host) return setErr('Please select a host.');
    if (editId) {
      setSessions((p) => p.map((s) => (s.id === editId ? { ...s, title: title.trim(), host, day, time, notes } : s)));
      toast('Session updated!');
    } else {
      setSessions((p) => [...p, { id: Date.now(), title: title.trim(), host, day, time, notes, status: 'upcoming' }]);
      toast('Session scheduled!');
    }
    setShowForm(false);
    reset();
  }

  function update(id: number, status: MockSession['status'], msg: string, type: 'success' | 'error' = 'success') {
    setSessions((p) => p.map((s) => (s.id === id ? { ...s, status } : s)));
    toast(msg, type);
  }

  const filtered = filter === 'all' ? sessions : sessions.filter((s) => s.status === filter);

  return (
    <div>
      <PageIntro
        title="Sessions"
        subtitle={`${sessions.filter((s) => s.status === 'upcoming').length} upcoming · ${sessions.filter((s) => s.status === 'live').length} live`}
        action={
          <Button
            onClick={() => {
              reset();
              setShowForm(true);
            }}
          >
            <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
            Schedule Session
          </Button>
        }
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 14px',
              borderRadius: 20,
              border: `1px solid ${filter === f ? theme.accentBorder : theme.border}`,
              background: filter === f ? theme.accentSoft : 'transparent',
              color: filter === f ? theme.accent : theme.textFaint,
              fontSize: 12,
              fontWeight: filter === f ? 600 : 400,
              cursor: 'pointer',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No sessions found" hint="Schedule one using the button above" />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
          {filtered.map((s) => {
            const sm = STATUS_META[s.status];
            return (
              <div
                key={s.id}
                style={{
                  background: theme.bgCard,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 14,
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{s.title}</div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: sm.color,
                      background: sm.bg,
                      border: `1px solid ${sm.border}`,
                      padding: '2px 10px',
                      borderRadius: 20,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.status === 'live' ? '● LIVE' : s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 7,
                      background: avatarColor(s.host),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {s.host.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: theme.textFaint }}>Host</div>
                    <div style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{s.host}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: 13, color: theme.text }}>{s.day}</div>
                    <div style={{ fontSize: 12, color: theme.textFaint }}>{s.time}</div>
                  </div>
                </div>

                {s.notes && (
                  <div
                    style={{
                      fontSize: 12,
                      color: theme.textFaint,
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 6,
                      padding: '6px 8px',
                      fontStyle: 'italic',
                    }}
                  >
                    "{s.notes}"
                  </div>
                )}

                {s.status === 'upcoming' && (
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    <button
                      onClick={() => update(s.id, 'live', 'Session is now LIVE!')}
                      style={{ flex: 1, padding: 7, borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.08)', color: theme.green, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                    >
                      Go Live
                    </button>
                    <button
                      onClick={() => openEdit(s)}
                      style={{ flex: 1, padding: 7, borderRadius: 8, border: `1px solid ${theme.borderStrong}`, background: 'transparent', color: theme.textMuted, cursor: 'pointer', fontSize: 12 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => update(s.id, 'cancelled', 'Session cancelled.', 'error')}
                      style={{ padding: '7px 10px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.07)', color: theme.red, cursor: 'pointer', fontSize: 12 }}
                    >
                      ✕
                    </button>
                  </div>
                )}
                {s.status === 'live' && (
                  <button
                    onClick={() => update(s.id, 'completed', 'Session completed!')}
                    style={{ padding: 7, borderRadius: 8, border: '1px solid rgba(100,116,139,0.3)', background: 'rgba(100,116,139,0.08)', color: theme.textMuted, cursor: 'pointer', fontSize: 12, fontWeight: 600, marginTop: 4 }}
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showForm && (
        <Modal
          title={editId ? 'Edit Session' : 'Schedule Session'}
          subtitle="Fill in the details below"
          onClose={() => {
            setShowForm(false);
            reset();
          }}
          width={460}
        >
          <ModalField label="Session Title" required>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErr('');
              }}
              placeholder="e.g. Combat Training"
              style={inputStyle}
            />
          </ModalField>
          <ModalField label="Host" required>
            <select
              value={host}
              onChange={(e) => {
                setHost(e.target.value);
                setErr('');
              }}
              style={{ ...inputStyle, color: host ? '#fff' : theme.textFaint, colorScheme: 'dark' }}
            >
              <option value="" disabled>
                Select a host…
              </option>
              {members
                .filter((m) => m.status !== 'terminated')
                .map((m) => (
                  <option key={m.id} value={m.username} style={{ background: theme.bgElevated }}>
                    {m.username} — {m.rank}
                  </option>
                ))}
            </select>
          </ModalField>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <ModalField label="Day" required>
                <select value={day} onChange={(e) => setDay(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }}>
                  {DAYS.map((d) => (
                    <option key={d} value={d} style={{ background: theme.bgElevated }}>
                      {d}
                    </option>
                  ))}
                </select>
              </ModalField>
            </div>
            <div style={{ flex: 1 }}>
              <ModalField label="Time" required>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ ...inputStyle, colorScheme: 'dark' }} />
              </ModalField>
            </div>
          </div>
          <ModalField label="Notes">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any extra info for attendees…" rows={3} style={{ ...inputStyle, resize: 'none' }} />
          </ModalField>
          {err && <div style={{ fontSize: 12, color: theme.red, marginBottom: 12 }}>{err}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="ghost"
              full
              onClick={() => {
                setShowForm(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button full onClick={save}>
              {editId ? 'Save Changes' : 'Schedule'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
