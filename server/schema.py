from marshmallow import Schema, fields

class LungCancerInputSchema(Schema):
    Air_Pollution = fields.Integer(required=True, data_key="Air Pollution")
    Alcohol_use = fields.Integer(required=True, data_key="Alcohol use")
    Dust_Allergy = fields.Integer(required=True, data_key="Dust Allergy")
    OccuPational_Hazards = fields.Integer(required=True, data_key="OccuPational Hazards")
    Genetic_Risk = fields.Integer(required=True, data_key="Genetic Risk")
    chronic_Lung_Disease = fields.Integer(required=True, data_key="chronic Lung Disease")
    Balanced_Diet = fields.Integer(required=True, data_key="Balanced Diet")
    Obesity = fields.Integer(required=True)
    Smoking = fields.Integer(required=True)
    Passive_Smoker = fields.Integer(required=True)
    Chest_Pain = fields.Integer(required=True)
    Coughing_of_Blood = fields.Integer(required=True, data_key="Coughing of Blood")
    Fatigue = fields.Integer(required=True)
    Shortness_of_Breath = fields.Integer(required=True)
    Frequent_Cold = fields.Integer(required=True)
