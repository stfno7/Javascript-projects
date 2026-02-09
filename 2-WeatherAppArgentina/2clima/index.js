     const API_KEY = '895284fb2d2c50a520ea537456963d9c'; // API Key
        
     // ciudades x provincia
        const provinciasData = {
    'Buenos Aires': [
        'Bahía Blanca',
        'Necochea',
        'Mar del Plata',
        'La Plata',
        'Tandil',
        'Olavarría'
    ],

    'Córdoba': [
        'Córdoba',
        'Villa Carlos Paz',
        'Río Cuarto',
        'Villa María',
        'Alta Gracia'
    ],

    'Santa Fe': [
        'Rosario',
        'Santa Fe',
        'Rafaela',
        'Venado Tuerto'
    ],

    'Mendoza': [
        'Mendoza',
        'San Rafael',
        'Godoy Cruz',
        'Luján de Cuyo'
    ],

    'Entre Ríos': [
        'Paraná',
        'Concordia',
        'Gualeguaychú',
        'Concepción del Uruguay'
    ],

    'Tucumán': [
        'San Miguel de Tucumán',
        'Tafí Viejo',
        'Yerba Buena'
    ],

    'Salta': [
        'Salta',
        'Cafayate',
        'Orán'
    ],

    'Jujuy': [
        'San Salvador de Jujuy',
        'Palpalá',
        'Humahuaca'
    ],

    'Misiones': [
        'Posadas',
        'Puerto Iguazú',
        'Oberá'
    ],

    'Corrientes': [
        'Corrientes',
        'Goya',
        'Paso de los Libres'
    ],

    'Chaco': [
        'Resistencia',
        'Presidencia Roque Sáenz Peña'
    ],

    'Neuquén': [
        'Neuquén',
        'San Martín de los Andes',
        'Villa La Angostura'
    ],

    'Río Negro': [
        'Viedma',
        'General Roca',
        'San Carlos de Bariloche'
    ],

    'Chubut': [
        'Comodoro Rivadavia',
        'Trelew',
        'Puerto Madryn'
    ],

    'Santa Cruz': [
        'Río Gallegos',
        'El Calafate'
    ],

    'Tierra del Fuego': [
        'Ushuaia',
        'Río Grande'
    ]
        };


        // dom
        const provinciaSelect = document.getElementById('provincia');
        const ciudadSelect = document.getElementById('ciudad');
        const weatherData = document.getElementById('weatherData');
        const loading = document.getElementById('loading');
        const errorDiv = document.getElementById('error');

        // Cargar provincias
        Object.keys(provinciasData).sort().forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia;
            option.textContent = provincia;
            provinciaSelect.appendChild(option);
        });

        // Evento para cambiar de provincia
        provinciaSelect.addEventListener('change', (e) => {
            const provincia = e.target.value;
            ciudadSelect.innerHTML = '<option value=""></option>';
            ciudadSelect.disabled = true;
            weatherData.classList.remove('show');
            
            if (provincia) {
                const ciudades = provinciasData[provincia];
                ciudades.forEach(ciudad => {
                    const option = document.createElement('option');
                    option.value = ciudad;
                    option.textContent = ciudad;
                    ciudadSelect.appendChild(option);
                });
                ciudadSelect.disabled = false;
            }
        });

        // Evento para cambiar de ciudad
        ciudadSelect.addEventListener('change', async (e) => {
            const ciudad = e.target.value;
            if (ciudad) {
                await obtenerClima(ciudad);
            } else {
                weatherData.classList.remove('show');
            }
        });

        async function obtenerClima(ciudad) {
            loading.classList.add('show');
            errorDiv.classList.remove('show');
            weatherData.classList.remove('show');

            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},AR&appid=${API_KEY}&units=metric&lang=es`; // API
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('No se pudo obtener el clima');
                }

                const data = await response.json();
                mostrarClima(data);
            } catch (error) {
                errorDiv.textContent = 'Error al obtener datos del clima. Por favor, intente nuevamente.';
                errorDiv.classList.add('show');
            } finally {
                loading.classList.remove('show');
            }
        }

        // Mostrar el clima
        function mostrarClima(data) {
            document.getElementById('cityName').textContent = data.name;
            document.getElementById('tempMain').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;

            const weatherGrid = document.getElementById('weatherGrid'); // Dinamic grid generated using Claude
            weatherGrid.innerHTML = `
                <div class="weather-item">
                    <div class="weather-item-label">Sensación Térmica</div>
                    <div class="weather-item-value">${Math.round(data.main.feels_like)}°C</div>
                </div>
                <div class="weather-item">
                    <div class="weather-item-label">Humedad</div>
                    <div class="weather-item-value">${data.main.humidity}%</div>
                </div>
                <div class="weather-item">
                    <div class="weather-item-label">Presión</div>
                    <div class="weather-item-value">${data.main.pressure} hPa</div>
                </div>
                <div class="weather-item">
                    <div class="weather-item-label">Viento</div>
                    <div class="weather-item-value">${Math.round(data.wind.speed * 3.6)} km/h</div>
                </div>
                <div class="weather-item">
                    <div class="weather-item-label">Visibilidad</div>
                    <div class="weather-item-value">${(data.visibility / 1000).toFixed(1)} km</div>
                </div>
                <div class="weather-item">
                    <div class="weather-item-label">Nubosidad</div>
                    <div class="weather-item-value">${data.clouds.all}%</div>
                </div>
            `;

            weatherData.classList.add('show');
        }