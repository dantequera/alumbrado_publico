// public/assets/js/app.js - SOLO para el buscador de GitHub
const APIURL = 'https://api.github.com/users/'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const profilesGrid = document.getElementById('profiles-grid')

// Función principal de búsqueda
async function searchUsers() {
    const searchValue = search.value.trim()
    
    if (!searchValue) {
        showError('Por favor ingresa al menos un nombre de usuario')
        return
    }
    
    profilesGrid.innerHTML = ''
    
    const usernames = searchValue.split(',')
        .map(username => username.trim())
        .filter(username => username !== '')
        .slice(0, 4)
    
    if (usernames.length === 0) {
        showError('Por favor ingresa nombres de usuario válidos')
        return
    }
    
    showLoading(usernames.length)
    
    try {
        const userPromises = usernames.map(username => getUser(username))
        const results = await Promise.allSettled(userPromises)
        processResults(results)
    } catch (error) {
        showError('Error al realizar la búsqueda')
    }
}

// Resto del código del buscador GitHub (sin autenticación)
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)
        const repos = await getRepos(username)
        return { user: data, repos, error: null }
    } catch(err) {
        return { user: null, repos: [], error: err }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created&per_page=5')
        return data
    } catch(err) {
        return []
    }
}

function processResults(results) {
    profilesGrid.innerHTML = ''
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            const { user, repos, error } = result.value
            
            if (error) {
                createErrorCard(`Usuario no encontrado`, `El usuario en la posición ${index + 1} no existe`)
            } else {
                createUserCard(user, repos)
            }
        } else {
            createErrorCard(`Error en usuario ${index + 1}`, 'Problema al realizar la búsqueda')
        }
    })
}

function createUserCard(user, repos) {
    const cardHTML = `
        <div class="card">
            <div class="card-content">
                <div class="card-header">
                    <img src="${user.avatar_url}" alt="${user.name || user.login}" class="avatar">
                    <div class="user-info">
                        <h2>${user.name || user.login}</h2>
                        <h3>@${user.login}</h3>
                        ${user.bio ? `<p>${user.bio}</p>` : '<p>No hay biografía disponible</p>'}
                    </div>
                </div>
                
                <div class="user-stats">
                    <div class="stat">
                        <span class="stat-number">${user.followers}</span>
                        <span class="stat-label">Seguidores</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${user.following}</span>
                        <span class="stat-label">Siguiendo</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${user.public_repos}</span>
                        <span class="stat-label">Repositorios</span>
                    </div>
                </div>
                
                ${repos.length > 0 ? `
                <div class="repos-container">
                    <h4 class="repos-title">Repositorios recientes:</h4>
                    <div class="repos-list">
                        ${repos.slice(0, 3).map(repo => `
                            <a href="${repo.html_url}" target="_blank" class="repo" title="${repo.description || 'Sin descripción'}">
                                ${repo.name.length > 20 ? repo.name.substring(0, 20) + '...' : repo.name}
                            </a>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <a href="${user.html_url}" target="_blank" class="profile-link">
                    Ver perfil completo en GitHub
                </a>
            </div>
        </div>
    `
    
    profilesGrid.innerHTML += cardHTML
}

function createErrorCard(title, message) {
    const errorHTML = `
        <div class="card error">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `
    profilesGrid.innerHTML += errorHTML
}

function showError(message) {
    profilesGrid.innerHTML = `
        <div class="card error" style="grid-column: 1 / -1;">
            <h3>Error</h3>
            <p>${message}</p>
        </div>
    `
}

function showLoading(count) {
    profilesGrid.innerHTML = ''
    for (let i = 0; i < count; i++) {
        profilesGrid.innerHTML += `
            <div class="card loading">
                <div class="card-content">Cargando usuario ${i + 1}...</div>
            </div>
        `
    }
}

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchUsers()
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    searchUsers()
})

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        searchUsers()
    }
})