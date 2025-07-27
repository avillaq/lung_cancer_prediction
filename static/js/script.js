document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('prediccion-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Mostrar estado de carga y ocultar errores
        showLoading();
        hideError();
        
        // Cargar los datos del formulario
        const formData = {
            'Air_Pollution': parseInt(document.getElementById('air_pollution').value),
            'Alcohol_use': parseInt(document.getElementById('alcohol_use').value),
            'Dust_Allergy': parseInt(document.getElementById('dust_allergy').value),
            'OccuPational_Hazards': parseInt(document.getElementById('occupational_hazards').value),
            'Genetic_Risk': parseInt(document.getElementById('genetic_risk').value),
            'chronic_Lung_Disease': parseInt(document.getElementById('chronic_lung_disease').value),
            'Balanced_Diet': parseInt(document.getElementById('balanced_diet').value),
            'Obesity': parseInt(document.getElementById('obesity').value),
            'Smoking': parseInt(document.getElementById('smoking').value),
            'Passive_Smoker': parseInt(document.getElementById('passive_smoker').value),
            'Chest_Pain': parseInt(document.getElementById('chest_pain').value),
            'Coughing_of_Blood': parseInt(document.getElementById('coughing_blood').value),
            'Fatigue': parseInt(document.getElementById('fatigue').value),
            'Shortness_of_Breath': parseInt(document.getElementById('shortness_breath').value),
            'Frequent_Cold': parseInt(document.getElementById('frequent_cold').value)
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

            console.log('Prediction result:', result);
            
            if (result.error) {
                throw new Error(result.error);
            }

            // Mostrar resultados
            displayResults(result[0], formData);
            
        } catch (error) {
            showError('Error al realizar la predicción: ' + error.message);
        } finally {
            hideLoading();
        }
    });
});

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('submit-btn').disabled = true;
    document.getElementById('submit-btn').textContent = 'Procesando...';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('submit-btn').disabled = false;
    document.getElementById('submit-btn').textContent = 'Realizar Predicción';
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.scrollIntoView({ behavior: 'smooth' });
}

function hideError() {
    document.getElementById('error-message').style.display = 'none';
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
        0: '#28a745', // Verde para riesgo bajo
        1: '#ffc107', // Amarillo para riesgo medio
        2: '#dc3545'  // Rojo para riesgo alto
    };
    return riskColors[predictionLabel] || '#2c3e50';
}

function displayResults(prediction, formData) {
    // Se esconde el formulario y se muestra la sección de resultados
    document.querySelector('.card').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';
    
    // Mostrar resultados de la predicción
    const predictionElement = document.getElementById('prediction-result');
    const riskLabel = getRiskLabel(prediction.prediction_label);
    const riskColor = getRiskColor(prediction.prediction_label);
    
    predictionElement.textContent = riskLabel;
    predictionElement.style.color = riskColor;
    
    // Mostrar el puntaje de confianza si está disponible
    if (prediction.prediction_score !== undefined) {
        document.getElementById('confidence-score').style.display = 'block';
        document.getElementById('confidence-value').textContent = (prediction.prediction_score * 100).toFixed(1);
    }

    // Mostrar datos de entrada
    const inputDataDiv = document.getElementById('input-data');
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
    
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    // Mostrar el formulario y ocultar la sección de resultados
    document.querySelector('.card').style.display = 'block';
    document.getElementById('results-section').style.display = 'none';
    
    // Limpiar el formulario
    document.getElementById('prediccion-form').reset();
    
    hideError();
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}