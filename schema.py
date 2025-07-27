from marshmallow import Schema, fields, validate

# Obesity: valores entre 1.0 y 7.0
# Coughing of Blood: valores entre 1.0 y 9.0
# Alcohol use: valores entre 1.0 y 8.0
# Dust Allergy: valores entre 1.0 y 8.0
# Balanced Diet: valores entre 1.0 y 7.0
# Genetic Risk: valores entre 1.0 y 7.0
# Passive Smoker: valores entre 1.0 y 8.0
# Occupational Hazards: valores entre 1.0 y 8.0
# Chest Pain: valores entre 1.0 y 9.0
# Air Pollution: valores entre 1.0 y 8.0
# Fatigue: valores entre 1.0 y 9.0
# Chronic Lung Disease: valores entre 1.0 y 7.0
# Smoking: valores entre 1.0 y 8.0
# Shortness of Breath: valores entre 1.0 y 9.0
# Frequent Cold: valores entre 1.0 y 7.0
# Level (riesgo de cáncer): valores entre 0.0 y 2.0

class LungCancerInputSchema(Schema):
    Air_Pollution = fields.Integer(required=True, validate=validate.Range(min=1, max=8))
    Alcohol_use = fields.Integer(required=True, validate=validate.Range(min=1, max=8))
    Dust_Allergy = fields.Integer(required=True, validate=validate.Range(min=1, max=8))
    OccuPational_Hazards = fields.Integer(required=True, validate=validate.Range(min=1, max=8))
    Genetic_Risk = fields.Integer(required=True, validate=validate.Range(min=1, max=7))
    chronic_Lung_Disease = fields.Integer(required=True, validate=validate.Range(min=1, max=7))
    Balanced_Diet = fields.Integer(required=True, validate=validate.Range(min=1, max=7))
    Obesity = fields.Integer(required=True, validate=validate.Range(min=1, max=7))
    Smoking = fields.Integer(required=True, validate=validate.Range(min=1, max=8))
    Passive_Smoker = fields.Integer(required=True, validate=validate.Range(min=1, max=8))
    Chest_Pain = fields.Integer(required=True, validate=validate.Range(min=1, max=9))
    Coughing_of_Blood = fields.Integer(required=True, validate=validate.Range(min=1, max=9))
    Fatigue = fields.Integer(required=True, validate=validate.Range(min=1, max=9))
    Shortness_of_Breath = fields.Integer(required=True, validate=validate.Range(min=1, max=9))
    Frequent_Cold = fields.Integer(required=True, validate=validate.Range(min=1, max=7))