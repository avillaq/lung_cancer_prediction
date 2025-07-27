import pathlib
from flask import Flask, request, jsonify, render_template
from pycaret.classification import load_model, predict_model
from schema import LungCancerInputSchema
from marshmallow import ValidationError
import pandas as pd

app = Flask(__name__)

dir_actual = pathlib.Path(__file__).parent.absolute()
path_modelo = dir_actual / 'data' / 'modelo_lung_cancer'

# carga el modelo previamente entrenado
modelo = load_model(path_modelo)

validacion_schema = LungCancerInputSchema()

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/formulario', methods=['GET'])
def formulario():
    return render_template('form.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    if not isinstance(data, list):
        return jsonify({'error': 'El payload debe ser una lista de registros'}), 400
    
    datos_validos = []
    for item in data:
        try:
            validados = validacion_schema.load(item)
            datos_validos.append({k.replace("_", " "): v for k, v in validados.items()})
        except ValidationError as err:
            return jsonify({'error': err.messages}), 400

    nuevo_data = pd.DataFrame(datos_validos)
    
    # Predicción
    predicciones_df = predict_model(modelo, data=nuevo_data)
    return jsonify(predicciones_df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)