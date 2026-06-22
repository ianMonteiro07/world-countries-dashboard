
const API_BASE_URL = 'https://restcountries.com/v3.1';
const countriesGrid = document.getElementById('countries-grid');
const loadingElement = document.getElementById('loading');


async function fetchAllCountries() {
    try {
        const response = await fetch(`${API_BASE_URL}/all?fields=name,flags,population,region,capital,cca3`);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const countries = await response.ok ? await response.json() : [];
        
        loadingElement.style.display = 'none';
        renderCountries(countries);
        
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        loadingElement.textContent = 'Erro ao carregar os dados. Tente novamente mais tarde.';
    }
}


function renderCountries(countries) {
    countriesGrid.innerHTML = ''; // Limpa o grid anterior
    
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        const populationFormatted = new Intl.NumberFormat('pt-BR').format(country.population);
        
        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" class="flag-img">
            <div class="country-info">
                <h3>${country.name.common}</h3>
                <p><strong>População:</strong> ${populationFormatted}</p>
                <p><strong>Região:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            </div>
        `;
        
        countriesGrid.appendChild(countryCard);
    });
}

fetchAllCountries();