import {
  atom,
  selectorFamily
} from 'recoil';

export const agentsState = atom({
  key: 'agentsState',
  default: getSavedAgents(),
});

export const getAgent = selectorFamily({
  key: 'selectedAgent',
  get: (agentID) => ({get}) => {
    const agents = get(agentsState);
    return agents.find(agent => agent.id === agentID);
  },
});

// Localstorage

export function getSavedAgents() {
  const savedAgents = JSON.parse(localStorage.agents || null);
  return savedAgents || [{
    id: '123',
    name: 'Gill\'s VM',
    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aHJlc2g6YWdlbnQiLCJjb21wYW55IjoidGhyZXNoIiwiZXhwIjoxMDAwMDAwMDAwMH0.by-P7_YTCqt0d6gL0Xexlmhr1PgyXhE5PRicroWaKyYTYT0yMJnfxvVxwOYQr5QhL89YQHKUS2-XDswNPuglAQ',
    url: 'https://tsearch.xyz/threshtest'
  }]
}

export function setSavedAgents(agents) {
  localStorage.setItem('agents', JSON.stringify(agents))
}
