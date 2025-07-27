document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#prediccion-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        showLoading();
        hideError();
        
        const formData = {
            'Air_Pollution': parseInt(document.querySelector('#air_pollution').value),
            'Alcohol_use': parseInt(document.querySelector('#alcohol_use').value),
            'Dust_Allergy': parseInt(document.querySelector('#dust_allergy').value),
            'OccuPational_Hazards': parseInt(document.querySelector('#occupational_hazards').value),
            'Genetic_Risk': parseInt(document.querySelector('#genetic_risk').value),
            'chronic_Lung_Disease': parseInt(document.querySelector('#chronic_lung_disease').value),
            'Balanced_Diet': parseInt(document.querySelector('#balanced_diet').value),
            'Obesity': parseInt(document.querySelector('#obesity').value),
            'Smoking': parseInt(document.querySelector('#smoking').value),
            'Passive_Smoker': parseInt(document.querySelector('#passive_smoker').value),
            'Chest_Pain': parseInt(document.querySelector('#chest_pain').value),
            'Coughing_of_Blood': parseInt(document.querySelector('#coughing_blood').value),
            'Fatigue': parseInt(document.querySelector('#fatigue').value),
            'Shortness_of_Breath': parseInt(document.querySelector('#shortness_breath').value),
            'Frequent_Cold': parseInt(document.querySelector('#frequent_cold').value)
        };

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([formData])
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            
            if (result.error) {
                throw new Error(result.error);
            }

            displayResults(result[0], formData);
            
        } catch (error) {
            showError('Error al realizar la predicción: ' + error.message);
        } finally {
            hideLoading();
        }
    });
});

function showLoading() {
    document.querySelector('#loading').classList.remove('hidden');
    const submitBtn = document.querySelector('#submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Analizando...';
}

function hideLoading() {
    document.querySelector('#loading').classList.add('hidden');
    const submitBtn = document.querySelector('#submit-btn');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Analizar Riesgo';
}

function showError(message) {
    const errorDiv = document.querySelector('#error-message');
    errorDiv.querySelector('div div').textContent = message;
    errorDiv.classList.remove('hidden');
    errorDiv.scrollIntoView({ behavior: 'smooth' });
}

function hideError() {
    document.querySelector('#error-message').classList.add('hidden');
}

function getRiskLabel(predictionLabel) {
    const riskLabels = {
        0: 'Riesgo Bajo',
        1: 'Riesgo Medio', 
        2: 'Riesgo Alto'
    };
    return riskLabels[predictionLabel] || `Nivel ${predictionLabel}`;
}

function getRiskColor(predictionLabel) {
    const riskColors = {
        0: 'text-green-600',
        1: 'text-yellow-600',
        2: 'text-red-600'
    };
    return riskColors[predictionLabel] || 'text-gray-700';
}

function displayResults(prediction, formData) {
    // Ocultar formulario y mostrar resultados
    document.querySelector('section:has(#prediccion-form)').classList.add('hidden');
    document.querySelector('#results-section').classList.remove('hidden');
    
    // Mostrar resultado
    const predictionElement = document.querySelector('#prediction-result');
    const riskLabel = getRiskLabel(prediction.prediction_label);
    const riskColorClass = getRiskColor(prediction.prediction_label);
    
    predictionElement.textContent = riskLabel;
    predictionElement.className = `text-5xl font-bold uppercase tracking-wide mb-6 ${riskColorClass}`;
    
    // Mostrar confianza
    if (prediction.prediction_score !== undefined) {
        document.querySelector('#confidence-value').textContent = (prediction.prediction_score * 100).toFixed(1);
    }

    // Mostrar datos de entrada
    const inputDataDiv = document.querySelector('#input-data');
    const labels = {
        'Air_Pollution': 'Contaminación del Aire',
        'Alcohol_use': 'Consumo de Alcohol',
        'Dust_Allergy': 'Alergia al Polvo',
        'OccuPational_Hazards': 'Riesgos Ocupacionales',
        'Genetic_Risk': 'Riesgo Genético',
        'chronic_Lung_Disease': 'Enfermedad Pulmonar Crónica',
        'Balanced_Diet': 'Dieta Balanceada',
        'Obesity': 'Obesidad',
        'Smoking': 'Tabaquismo',
        'Passive_Smoker': 'Fumador Pasivo',
        'Chest_Pain': 'Dolor en el Pecho',
        'Coughing_of_Blood': 'Tos con Sangre',
        'Fatigue': 'Fatiga',
        'Shortness_of_Breath': 'Dificultad para Respirar',
        'Frequent_Cold': 'Resfriados Frecuentes'
    };
    
    inputDataDiv.innerHTML = '';
    for (const [key, value] of Object.entries(formData)) {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${labels[key]}:</strong> ${value}`;
        inputDataDiv.appendChild(div);
    }
    
    document.querySelector('#results-section').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    // Mostrar formulario y ocultar resultados
    document.querySelector('section:has(#prediccion-form)').classList.remove('hidden');
    document.querySelector('#results-section').classList.add('hidden');
    
    document.querySelector('#prediccion-form').reset();
    hideError();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}