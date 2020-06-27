import {
  atom,
  selectorFamily
} from 'recoil';
import { getCurrentTheme } from '../components/Theme'

export const agentsState = atom({
  key: 'agentsState',
  default: getSavedAgents(),
});

export const uiState = atom({
  key: 'uiState',
  default: {
    theme: getCurrentTheme()
  }
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
  return savedAgents || []
}

export function setSavedAgents(agents) {
  localStorage.setItem('agents', JSON.stringify(agents))
}
