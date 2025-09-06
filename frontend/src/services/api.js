const API_BASE_URL = 'http://localhost:8080';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const authAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (response.ok) {
      const token = response.headers.get('Authorization');
      if (token) {
        localStorage.setItem('authToken', token.replace('Bearer ', ''));
      }
    }
    
    return response;
  },

  register: async (userData) => {
    return apiCall('/user/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },
};

export const tournamentAPI = {
  getAllTournaments: () => apiCall('/tournaments/all'),
  getTournamentById: (id) => apiCall(`/tournaments/${id}`),
  createTournament: (tournament) => apiCall('/tournaments/add', {
    method: 'POST',
    body: JSON.stringify(tournament),
  }),
  deleteTournament: (id) => apiCall(`/tournaments/${id}`, {
    method: 'DELETE',
  }),
};

export const teamAPI = {
  getAllTeams: () => apiCall('/teams/all'),
  getTeamById: (id) => apiCall(`/teams/${id}`),
  createTeam: (team, captainId) => apiCall(`/teams/captain/${captainId}`, {
    method: 'POST',
    body: JSON.stringify(team),
  }),
  deleteTeam: (id) => apiCall(`/teams/${id}`, {
    method: 'DELETE',
  }),
};

export const matchAPI = {
  getAllMatches: () => apiCall('/matches/all'),
  getMatchesByTournament: (tournamentId) => apiCall(`/matches/tournament/${tournamentId}`),
  createMatch: (match, tournamentId, team1Id, team2Id) => 
    apiCall(`/matches/tournament/${tournamentId}/team1/${team1Id}/team2/${team2Id}`, {
      method: 'POST',
      body: JSON.stringify(match),
    }),
  updateMatchResult: (id, result) => apiCall(`/matches/${id}/result/${result}`, {
    method: 'PUT',
  }),
  deleteMatch: (id) => apiCall(`/matches/${id}`, {
    method: 'DELETE',
  }),
};

export const userAPI = {
  getUserByUsername: (username) => apiCall(`/user/${username}`),
  deleteUser: (username) => apiCall(`/user/${username}`, {
    method: 'DELETE',
  }),
};

export default {
  authAPI,
  tournamentAPI,
  teamAPI,
  matchAPI,
  userAPI,
};