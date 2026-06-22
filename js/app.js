
const API_URL = 'https://restcountries.com/v3.1/all';

const countriesGrid = document.getElementById('countries-grid');
const loadingElement = document.getElementById('loading');
const searchInput = document.getElementById('search-input');
const regionFilter = document.getElementById('region-filter');

let allCountriesData = [];

async function fetchAllCountries() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const countries = await response.json();
        
        allCountriesData = countries;
        loadingElement.style.display = 'none';
        renderCountries(allCountriesData);
        
    } catch (error) {
        console.error('Erro:', error);
        loadingElement.textContent = 'Erro ao conectar com a API. Tente recarregar a página.';
        loadingElement.style.color = '#e74c3c';
    }
}

function renderCountries(countries) {
    countriesGrid.innerHTML = ''; 
    
    if (countries.length === 0) {
        countriesGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">Nenhum país encontrado.</p>';
        return;
    }
    
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');
        
        const capital = country.capital ? country.capital[0] : 'N/A';
        const population = new Intl.NumberFormat('pt-BR').format(country.population);
        
        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}" class="flag-img">
            <div class="country-info">
                <h3>${country.name.common}</h3>
                <p><strong>População:</strong> ${population}</p>
                <p><strong>Região:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${capital}</p>
            </div>
        `;
        
        countriesGrid.appendChild(countryCard);
    });
}

function handleFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const regionValue = regionFilter.value.toLowerCase();

    const filteredCountries = allCountriesData.filter(country => {
        const countryName = country.name.common.toLowerCase();
        const countryRegion = country.region.toLowerCase();

        const matchesSearch = countryName.includes(searchTerm);
        const matchesRegion = regionValue === '' || countryRegion === regionValue;

        return matchesSearch && matchesRegion;
    });

    renderCountries(filteredCountries);
}

searchInput.addEventListener('input', handleFilters);
regionFilter.addEventListener('change', handleFilters);

fetchAllCountries();