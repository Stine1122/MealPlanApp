using Google.GenAI.Types;

namespace MyApp.RSchema;

public static class RecipeSchema
{
    public static Schema Value => new Schema
    {
        Type = "object",
        Properties = new Dictionary<string, Schema>
        {
            ["message"] = new Schema { Type = "string" },

            ["recipes"] = new Schema
            {
                Type = "array",
                Items = new Schema
                {
                    Type = "object",
                    Properties = new Dictionary<string, Schema>
                    {
                        ["day"] = new Schema { Type = "string" },

                        ["recipe_name"] = new Schema { Type = "string" },

                        ["allergies"] = new Schema 
                        { 
                            Type = "array",
                            Items = new Schema
                            {
                                Type = "string"
                            }
                        },

                        ["servings"] = new Schema { Type = "integer" },

                        ["prep_time_minutes"] = new Schema { Type = "integer" },

                        ["cooking_time_minutes"] = new Schema { Type = "integer" },

                        ["total_time_minutes"] = new Schema { Type = "integer" },

                        ["ingredients"] = new Schema
                        {
                            Type = "array",
                            Items = new Schema
                            {
                                Type = "object",
                                Properties = new Dictionary<string, Schema>
                                {
                                    ["name"] = new Schema { Type = "string" },
                                    ["quantity"] = new Schema { Type = "string" }
                                },
                                Required = new List<string> { "name", "quantity" }
                            }
                        },

                        ["instructions"] = new Schema
                        {
                            Type = "array",
                            Items = new Schema
                            {
                                Type = "string"
                            }
                        },

                        ["shoppinglist"] = new Schema
                        {
                            Type = "array",
                            Items = new Schema
                            {
                                Type = "object",
                                Properties = new Dictionary<string, Schema>
                                {
                                    ["name"] = new Schema { Type = "string" },
                                    ["quantity"] = new Schema { Type = "string" }
                                },
                                Required = new List<string> { "name", "quantity" }
                            }
                        }
                    },
                    Required = new List<string>
                    {
                        "day",
                        "recipe_name",
                        "servings",
                        "ingredients",
                        "instructions",
                        "shoppinglist"
                    }
                }
            }
        }
    };
}