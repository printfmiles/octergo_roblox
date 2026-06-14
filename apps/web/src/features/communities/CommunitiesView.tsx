import { useState } from 'react';
import { API_ROUTES } from '@octergo/shared';
import type { CommunityCreateResponse, CommunitySummary } from '@octergo/shared';
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
import { api, ApiError } from '../../lib/api';
import { useCommunity } from '../../lib/community-context';

function statusColor(status: CommunitySummary['verificationStatus']) {
  if (status === 'VERIFIED') return theme.green;
  if (status === 'PENDING_APPROVAL') return theme.amber;
  if (status === 'REJECTED') return theme.red;
  return theme.blue;
}

function CommunityCard({
  c,
  color,
  onSelect,
  onVerify,
  verifying,
}: {
  c: CommunitySummary;
  color: string;
  onSelect: () => void;
  onVerify: () => void;
  verifying: boolean;
}) {
  const verified = c.verificationStatus === 'VERIFIED';

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
            background: `${color}22`,
            border: `1px solid ${color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 800,
            color,
            flexShrink: 0,
          }}
        >
          {initials(c.name)}
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>{c.name}</div>
          <div style={{ fontSize: 12, color: theme.textDim, marginTop: 1 }}>
            {c.description || `Group ${c.robloxGroupId}`}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, color: theme.textDimmer, letterSpacing: '0.06em', marginBottom: 2 }}>MEMBERS</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{c.memberCount.toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: theme.textDimmer, letterSpacing: '0.06em', marginBottom: 2 }}>STATUS</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: statusColor(c.verificationStatus) }}>
              {c.verificationStatus.replace('_', ' ')}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {!verified && (
            <button
              onClick={onVerify}
              disabled={verifying}
              style={{
                padding: '5px 12px',
                borderRadius: 7,
                border: `1px solid ${theme.amber}44`,
                background: `${theme.amber}11`,
                color: theme.amber,
                fontSize: 11,
                fontWeight: 600,
                cursor: verifying ? 'wait' : 'pointer',
              }}
            >
              {verifying ? 'Checking…' : 'Verify'}
            </button>
          )}
          <button
            onClick={onSelect}
            style={{
              padding: '5px 12px',
              borderRadius: 7,
              border: `1px solid ${color}33`,
              background: `${color}11`,
              color,
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Manage
          </button>
        </div>
      </div>
      {!verified && c.verificationCode && (
        <div style={{ fontSize: 11, color: theme.textFaint, lineHeight: 1.5 }}>
          Add <strong style={{ color: theme.accent }}>{c.verificationCode}</strong> to your Roblox group description, then click Verify.
        </div>
      )}
    </div>
  );
}

export function CommunitiesView() {
  const toast = useToast();
  const { communities, activeCommunityId, setActiveCommunityId, loading, refresh } = useCommunity();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [groupId, setGroupId] = useState('');
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [lastHint, setLastHint] = useState('');

  const filtered = communities.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

  async function addCommunity() {
    if (!name.trim()) return setErr('Community name is required.');
    if (!groupId.trim()) return setErr('Roblox Group ID is required.');
    setSubmitting(true);
    setErr('');
    try {
      const result = await api.post<CommunityCreateResponse>(API_ROUTES.COMMUNITIES, {
        name: name.trim(),
        robloxGroupId: groupId.trim(),
        description: desc.trim() || undefined,
      });
      setLastHint(result.verificationHint);
      setShowModal(false);
      setName('');
      setDesc('');
      setGroupId('');
      await refresh();
      setActiveCommunityId(result.id);
      toast(result.verificationStatus === 'VERIFIED' ? 'Community linked and verified!' : 'Community created — complete verification');
    } catch (e) {
      setErr(e instanceof ApiError ? e.message : 'Failed to create community');
    } finally {
      setSubmitting(false);
    }
  }

  async function verifyCommunity(id: string) {
    setVerifyingId(id);
    try {
      const result = await api.post<{ verified: boolean; message: string }>(
        `${API_ROUTES.COMMUNITIES}/${id}/verify`,
        {},
      );
      await refresh();
      toast(result.message, result.verified ? 'success' : 'info');
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Verification failed', 'error');
    } finally {
      setVerifyingId(null);
    }
  }

  async function requestApproval(id: string) {
    try {
      const result = await api.post<{ message: string }>(
        `${API_ROUTES.COMMUNITIES}/${id}/request-approval`,
        {},
      );
      await refresh();
      toast(result.message, 'info');
    } catch (e) {
      toast(e instanceof ApiError ? e.message : 'Request failed', 'error');
    }
  }

  return (
    <div>
      <PageIntro
        title="Communities"
        subtitle="Link your Roblox groups to Octergo"
        action={
          <Button onClick={() => setShowModal(true)}>
            <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
            Add Community
          </Button>
        }
      />

      {lastHint && (
        <div
          style={{
            marginBottom: 16,
            padding: '10px 14px',
            borderRadius: 10,
            background: 'rgba(129,140,248,0.08)',
            border: '1px solid rgba(129,140,248,0.2)',
            fontSize: 13,
            color: theme.textMuted,
          }}
        >
          {lastHint}
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search communities…" />
      </div>

      <SectionTitle title="My Communities" count={filtered.length} />
      {loading ? (
        <p style={{ color: theme.textFaint, fontSize: 13 }}>Loading communities…</p>
      ) : filtered.length === 0 ? (
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
          {filtered.map((c, i) => (
            <CommunityCard
              key={c.id}
              c={c}
              color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
              onSelect={() => {
                setActiveCommunityId(c.id);
                toast(`Active community: ${c.name}`, 'info');
              }}
              onVerify={() => verifyCommunity(c.id)}
              verifying={verifyingId === c.id}
            />
          ))}
        </div>
      )}

      {filtered.some((c) => c.verificationStatus === 'PENDING') && (
        <p style={{ marginTop: 16, fontSize: 12, color: theme.textFaint }}>
          Can't verify automatically?{' '}
          <button
            onClick={() => {
              const pending = filtered.find((c) => c.verificationStatus === 'PENDING');
              if (pending) requestApproval(pending.id);
            }}
            style={{ color: theme.accent, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12 }}
          >
            Request manual approval
          </button>
        </p>
      )}

      {activeCommunityId && (
        <p style={{ marginTop: 12, fontSize: 11, color: theme.textDimmer }}>
          Active community ID: <code>{activeCommunityId}</code>
        </p>
      )}

      {showModal && (
        <Modal title="Add Community" subtitle="Connect a Roblox group to Octergo" onClose={() => setShowModal(false)}>
          <ModalField label="Community Name" required>
            <input value={name} onChange={(e) => { setName(e.target.value); setErr(''); }} placeholder="e.g. Nova Roleplay" style={inputStyle} />
          </ModalField>
          <ModalField label="Roblox Group ID" required hint={<>Found in your group URL: roblox.com/groups/<span style={{ color: theme.accent }}>12345678</span></>}>
            <input value={groupId} onChange={(e) => { setGroupId(e.target.value); setErr(''); }} placeholder="e.g. 12345678" style={inputStyle} />
          </ModalField>
          <ModalField label="Description">
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Brief description…" rows={3} style={{ ...inputStyle, resize: 'none' }} />
          </ModalField>
          {err && <div style={{ fontSize: 12, color: theme.red, marginBottom: 12 }}>{err}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" full onClick={() => setShowModal(false)}>Cancel</Button>
            <Button full onClick={addCommunity} disabled={submitting}>{submitting ? 'Creating…' : 'Add Community'}</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
