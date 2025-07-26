from marshmallow import Schema, fields

class LungCancerInputSchema(Schema):
    Air_Pollution = fields.Integer(required=True)
    Alcohol_use = fields.Integer(required=True)
    Dust_Allergy = fields.Integer(required=True)
    OccuPational_Hazards = fields.Integer(required=True)
    Genetic_Risk = fields.Integer(required=True)
    chronic_Lung_Disease = fields.Integer(required=True)
    Balanced_Diet = fields.Integer(required=True)
    Obesity = fields.Integer(required=True)
    Smoking = fields.Integer(required=True)
    Passive_Smoker = fields.Integer(required=True)
    Chest_Pain = fields.Integer(required=True)
    Coughing_of_Blood = fields.Integer(required=True)
    Fatigue = fields.Integer(required=True)
    Shortness_of_Breath = fields.Integer(required=True)
    Frequent_Cold = fields.Integer(required=True)
