import { useState } from 'react';
import {
  Button,
  EmptyState,
  Icon,
  Modal,
  ModalField,
  PageIntro,
  SearchInput,
  SectionTitle,
  inputStyle,
  useToast,
} from '../../components/ui';
import { AVATAR_COLORS, initials, theme } from '../../theme';
import { MOCK_COMMUNITIES, type MockCommunity } from '../../lib/mock';

function CommunityCard({ c, onManage }: { c: MockCommunity; onManage: () => void }) {
  return (
    <div
      style={{
        background: theme.bgCard,
        border: `1px solid ${theme.border}`,
        borderRadius: 14,
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${c.color}22`,
            border: `1px solid ${c.color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 800,
            color: c.color,
            flexShrink: 0,
          }}
        >
          {c.avatar}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>{c.name}</div>
          <div style={{ fontSize: 12, color: theme.textDim, marginTop: 1 }}>{c.description}</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: theme.textDimmer, letterSpacing: '0.06em', marginBottom: 2 }}>MEMBERS</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{c.members.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: theme.textDimmer, letterSpacing: '0.06em', marginBottom: 2 }}>YOUR ROLE</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.color }}>{c.rank}</div>
          </div>
        </div>
        <button
          onClick={onManage}
          style={{
            padding: '5px 12px',
            borderRadius: 7,
            border: `1px solid ${c.color}33`,
            background: `${c.color}11`,
            color: c.color,
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Manage
        </button>
      </div>
    </div>
  );
}

export function CommunitiesView() {
  const toast = useToast();
  const [communities, setCommunities] = useState(MOCK_COMMUNITIES);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [groupId, setGroupId] = useState('');
  const [err, setErr] = useState('');

  const mine = communities.filter((c) => c.mine && c.name.toLowerCase().includes(search.toLowerCase()));
  const others = communities.filter((c) => !c.mine && c.name.toLowerCase().includes(search.toLowerCase()));

  function addCommunity() {
    if (!name.trim()) return setErr('Community name is required.');
    if (!groupId.trim()) return setErr('Roblox Group ID is required.');
    const color = AVATAR_COLORS[communities.length % AVATAR_COLORS.length];
    setCommunities((p) => [
      ...p,
      {
        id: Date.now(),
        name: name.trim(),
        members: 0,
        rank: 'Owner',
        avatar: initials(name),
        color,
        mine: true,
        description: desc.trim() || 'No description',
        groupId: groupId.trim(),
        plan: 'STARTER',
      },
    ]);
    setShowModal(false);
    setName('');
    setDesc('');
    setGroupId('');
    setErr('');
    toast('Community added!');
  }

  return (
    <div>
      <PageIntro
        title="Communities"
        subtitle="Manage and browse your linked Roblox communities"
        action={
          <Button onClick={() => setShowModal(true)}>
            <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
            Add Community
          </Button>
        }
      />

      <div style={{ marginBottom: 28 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search communities…" />
      </div>

      <div style={{ marginBottom: 36 }}>
        <SectionTitle title="My Communities" count={mine.length} />
        {mine.length === 0 ? (
          <EmptyState
            title="No communities yet"
            action={
              <button
                onClick={() => setShowModal(true)}
                style={{ fontSize: 12, color: theme.accent, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                + Add your first community
              </button>
            }
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12 }}>
            {mine.map((c) => (
              <CommunityCard key={c.id} c={c} onManage={() => toast(`Managing ${c.name}`, 'info')} />
            ))}
          </div>
        )}
      </div>

      <div>
        <SectionTitle title="Discoverable Communities" count={others.length} />
        {others.length === 0 ? (
          <EmptyState title="No communities found" />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 12 }}>
            {others.map((c) => (
              <CommunityCard key={c.id} c={c} onManage={() => toast(`Requesting access to ${c.name}`, 'info')} />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <Modal title="Add Community" subtitle="Connect a Roblox group to Octergo" onClose={() => setShowModal(false)}>
          <ModalField label="Community Name" required>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErr('');
              }}
              placeholder="e.g. Nova Roleplay"
              style={inputStyle}
            />
          </ModalField>
          <ModalField
            label="Roblox Group ID"
            required
            hint={
              <>
                Found in your group URL: roblox.com/groups/<span style={{ color: theme.accent }}>12345678</span>
              </>
            }
          >
            <input
              value={groupId}
              onChange={(e) => {
                setGroupId(e.target.value);
                setErr('');
              }}
              placeholder="e.g. 12345678"
              style={inputStyle}
            />
          </ModalField>
          <ModalField label="Description">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Brief description of your community…"
              rows={3}
              style={{ ...inputStyle, resize: 'none' }}
            />
          </ModalField>
          {err && <div style={{ fontSize: 12, color: theme.red, marginBottom: 12 }}>{err}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" full onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button full onClick={addCommunity}>
              Add Community
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
